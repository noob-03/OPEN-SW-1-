import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import axios from 'axios';

function TeamPage({ sportMode }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 이건 '팀 목록' 실패용 (치명적)
  const [followedTeamIds, setFollowedTeamIds] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('K1');

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // JWT 토큰 디코딩
  const getUserIdFromToken = (rawToken) => {
    try {
        if (!rawToken) return null;
        const token = rawToken.replace(/^"|"$/g, '').trim();
        if (!token) return null;
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        const decoded = JSON.parse(jsonPayload);
        // 문자열 ID 허용
        return decoded.sub || decoded.id || decoded.userId;
    } catch (e) { return null; }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // 에러 초기화

      let currentUserId = null;

      // ---------------------------------------------------------
      // 1. 유저 ID 확인
      // ---------------------------------------------------------
      try {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) currentUserId = storedUserId.replace(/^"|"$/g, '');

          if (!currentUserId) {
              let token = localStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('Authorization');
              if (token) {
                  token = token.replace(/^"|"$/g, '');
                  currentUserId = getUserIdFromToken(token);
                  if (currentUserId) localStorage.setItem('userId', currentUserId);
              }
          }
          if (currentUserId) setUserId(currentUserId);
      } catch (e) { console.error(e); }

      // ---------------------------------------------------------
      // 2. [필수] 팀 목록 조회 (여기서 에러나면 전체 중단)
      // ---------------------------------------------------------
      try {
          const teamsResponse = await axios.get(`http://localhost:8080/api/teams`, {
              params: { sport: sportMode }
          });
          setTeams(teamsResponse.data); // 성공 시 데이터 저장
      } catch (teamErr) {
          console.error("팀 목록 로딩 실패:", teamErr);
          setError(teamErr); // 팀 목록 실패 시에만 에러 화면 표시
          setLoading(false);
          return; // 팀 목록 없으면 더 진행 안 함
      }

      // ---------------------------------------------------------
      // 3. [선택] 팔로우 목록 조회 (에러 나도 팀 목록은 유지!)
      // ---------------------------------------------------------
      if (currentUserId) {
          try {
              // [수정] 다시 정석대로 'userId'로 변경 (백엔드와 이름 일치)
              const followResponse = await axios.get(`http://localhost:8080/api/follow/my`,
                  {params: { userId: currentUserId }});
              const myTeamIds = new Set(followResponse.data.map(team => team.teamId));
              setFollowedTeamIds(myTeamIds);
          } catch (followErr) {
              console.warn("팔로우 목록 로딩 실패 (무시함):", followErr);
              // catch에서 아무것도 안 함 -> 팀 목록 화면은 살아남음!
          }
      }

      setLoading(false);
    };

    fetchData();
  }, [sportMode]);

  const handleToggleFollow = async (e, teamId) => {
    e.preventDefault();
    let targetUserId = userId;
    if (!targetUserId) {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
        if (token) targetUserId = getUserIdFromToken(token);
    }
    if (!targetUserId) {
        alert("로그인이 필요합니다.");
        return;
    }
    try {
        // [수정] 여기도 'userId'로 변경
        await axios.post(`http://localhost:8080/api/follow/${teamId}`, null, {
            params: { userId: targetUserId }
        });
        setFollowedTeamIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(teamId)) newSet.delete(teamId); else newSet.add(teamId);
            return newSet;
        });
    } catch (err) { alert("작업 실패: " + err.message); }
  };

  const filteredTeams = teams.filter(team => {
    if (sportMode === 'baseball') return team.league === 'KBO';
    if (selectedLeague === 'K1') return team.league === 'K리그1';
    if (selectedLeague === 'K2') return team.league === 'K리그2';
    return false;
  });

  if (loading) return <div className="text-center pt-5">로딩 중...</div>;
  if (error) return <div className="text-center text-danger pt-5">팀 목록을 불러오지 못했습니다.</div>;

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2">Team Information</h2>
        <p className="text-muted">응원하는 구단을 팔로우하고 소식을 받아보세요.</p>
      </div>

      {/* (리그 선택 버튼 - 기존 코드 유지) */}
      {sportMode === 'soccer' && (
        <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
                <button type="button" className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K1' ? 'text-white' : 'text-dark'}`} style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K1' ? themeColor : '#ddd'}` }} onClick={() => setSelectedLeague('K1')}>K리그 1</button>
                <button type="button" className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K2' ? 'text-white' : 'text-dark'}`} style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K2' ? themeColor : '#ddd'}` }} onClick={() => setSelectedLeague('K2')}>K리그 2</button>
            </div>
        </div>
      )}

      <div className="row g-4">
        {filteredTeams.map(team => {
            const isFollowed = followedTeamIds.has(team.teamId);
            return (
                <div key={team.teamId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center position-relative hover-scale" style={{ transition: 'transform 0.2s' }}>
                        <button className="btn btn-link position-absolute top-0 end-0 p-3 hover-red" onClick={(e) => handleToggleFollow(e, team.teamId)} style={{ zIndex: 10 }}>
                            <Heart fill={isFollowed ? "#ff6b6b" : "none"} color={isFollowed ? "#ff6b6b" : "#adb5bd"} />
                        </button>
                        <Link to={`/teams/${team.teamId}`} className="text-decoration-none text-dark">
                            <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                                 {team.logoUrl ? <img src={team.logoUrl} alt={team.name} style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }} referrerPolicy="no-referrer"/> : <div className="fw-bold text-muted">{team.name}</div>}
                            </div>
                            <h5 className="fw-bold mb-1">{team.name}</h5>
                            <p className="text-muted small mb-3">홈구장 정보 없음</p>
                        </Link>
                        <div className="bg-light rounded-3 p-2 d-flex justify-content-around small">
                            <div><div className="text-muted">순위</div><div className="fw-bold">-위</div></div>
                            <div className="vr"></div>
                            <div><div className="text-muted">승점</div><div className="fw-bold">-pts</div></div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
}
export default TeamPage;