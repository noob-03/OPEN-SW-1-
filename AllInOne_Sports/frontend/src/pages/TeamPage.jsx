import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import axios from 'axios';

function TeamPage({ sportMode }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedTeamIds, setFollowedTeamIds] = useState(new Set());
  const [userId, setUserId] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('K1');

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // JWT 토큰 디코딩 함수 (안전성 강화)
  const getUserIdFromToken = (rawToken) => {
    try {
        if (!rawToken || typeof rawToken !== 'string') return null;

        // 따옴표 제거 및 공백 제거
        const token = rawToken.replace(/^"|"$/g, '').trim();
        if (!token) return null;

        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);

        // 문자열 ID 허용
        if (decoded.sub) return decoded.sub;
        if (decoded.id) return decoded.id;
        if (decoded.userId) return decoded.userId;
        return null;
    } catch (e) {
        return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let currentUserId = null;

        // -----------------------------------------------------------
        // 1. 사용자 인증 확인 (여기서 에러가 나도 팀 목록은 보여줘야 함!)
        // -----------------------------------------------------------
        try {
            const storedUserId = localStorage.getItem('userId');
            if (storedUserId) {
                currentUserId = storedUserId.replace(/^"|"$/g, '');
            }

            // ID가 없으면 토큰으로 확인
            if (!currentUserId) {
                let token = localStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('Authorization');
                if (token) {
                    token = token.replace(/^"|"$/g, '');
                    // 1차 시도: 토큰 직접 해석
                    currentUserId = getUserIdFromToken(token);

                    if (currentUserId) {
                        const cleanId = String(currentUserId).replace(/^"|"$/g, '');
                        localStorage.setItem('userId', cleanId);
                        currentUserId = cleanId;
                    }
                }
            }

            if (currentUserId) setUserId(currentUserId);
        } catch (authErr) {
            console.error("인증 확인 중 오류 (무시):", authErr);
        }

        // -----------------------------------------------------------
        // 2. 팀 목록 조회 (가장 중요 - 여기서 에러나면 안됨)
        // -----------------------------------------------------------
        try {
            const teamsResponse = await axios.get(`http://localhost:8080/api/teams`, {
                params: { sport: sportMode }
            });
            setTeams(teamsResponse.data);
        } catch (teamErr) {
            console.error("팀 목록 로딩 실패:", teamErr);
            throw teamErr; // 팀 목록 실패는 치명적이므로 catch 블록으로 보냄
        }

        // -----------------------------------------------------------
        // 3. 내 팔로우 목록 조회 (에러 나도 팀 목록은 보여줘야 함!)
        // -----------------------------------------------------------
        if (currentUserId) {
            try {
                const followResponse = await axios.get(`http://localhost:8080/api/follow/my`, {
                    params: { userId: currentUserId }
                });
                const myTeamIds = new Set(followResponse.data.map(team => team.teamId));
                setFollowedTeamIds(myTeamIds);
            } catch (followErr) {
                console.warn("팔로우 목록 불러오기 실패 (400 에러 등):", followErr);
                // 여기서 에러를 throw하지 않음 -> 팀 목록은 그대로 유지됨
            }
        }

      } catch (err) {
        console.error("데이터 로딩 치명적 오류:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sportMode]);

  const handleToggleFollow = async (e, teamId) => {
    e.preventDefault();

    let targetUserId = userId;
    if (!targetUserId) {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('Authorization');
        if (token) {
            targetUserId = getUserIdFromToken(token);
            if (targetUserId) setUserId(targetUserId);
        }
    }

    if (!targetUserId) {
        alert("로그인이 필요한 서비스입니다.");
        return;
    }

    try {
        await axios.post(`http://localhost:8080/api/follow/${teamId}`, null, {
            params: { userId: targetUserId }
        });

        setFollowedTeamIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(teamId)) newSet.delete(teamId);
            else newSet.add(teamId);
            return newSet;
        });
    } catch (err) {
        console.error("팔로우 실패:", err);
        alert("작업을 처리하지 못했습니다.");
    }
  };

  const filteredTeams = teams.filter(team => {
    if (sportMode === 'baseball') return team.league === 'KBO';
    if (selectedLeague === 'K1') return team.league === 'K리그1';
    if (selectedLeague === 'K2') return team.league === 'K리그2';
    return false;
  });

  if (loading) {
      return (
          <div className="container text-center" style={{ paddingTop: '200px' }}>
              <div className="spinner-border" role="status" style={{ color: themeColor }}>
                  <span className="visually-hidden">Loading...</span>
              </div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="container text-center text-danger" style={{ paddingTop: '200px' }}>
              <h3>데이터를 불러오지 못했습니다.</h3>
              <p className="fw-bold">{error.message}</p>
          </div>
      );
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2">Team Information</h2>
        <p className="text-muted">응원하는 구단을 팔로우하고 소식을 받아보세요.</p>
      </div>

      {sportMode === 'soccer' && (
        <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K1' ? 'text-white' : 'text-dark'}`}
                    style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K1' ? themeColor : '#ddd'}` }}
                    onClick={() => setSelectedLeague('K1')}
                >
                    K리그 1
                </button>
                <button
                    type="button"
                    className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K2' ? 'text-white' : 'text-dark'}`}
                    style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K2' ? themeColor : '#ddd'}` }}
                    onClick={() => setSelectedLeague('K2')}
                >
                    K리그 2
                </button>
            </div>
        </div>
      )}

      <div className="row g-4">
        {filteredTeams.map(team => {
            const isFollowed = followedTeamIds.has(team.teamId);

            return (
                <div key={team.teamId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center position-relative hover-scale"
                         style={{ transition: 'transform 0.2s' }}>

                        <button
                            className="btn btn-link position-absolute top-0 end-0 p-3 hover-red"
                            onClick={(e) => handleToggleFollow(e, team.teamId)}
                            style={{ zIndex: 10 }}
                        >
                            <Heart
                                fill={isFollowed ? "#ff6b6b" : "none"}
                                color={isFollowed ? "#ff6b6b" : "#adb5bd"}
                            />
                        </button>

                        <Link to={`/teams/${team.teamId}`} className="text-decoration-none text-dark">
                            <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                                 {team.logoUrl ? (
                                     <img
                                        src={team.logoUrl}
                                        alt={team.name}
                                        style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                                        referrerPolicy="no-referrer"
                                     />
                                 ) : (
                                     <div className="fw-bold text-muted">{team.name}</div>
                                 )}
                            </div>
                            <h5 className="fw-bold mb-1">{team.name}</h5>
                            <p className="text-muted small mb-3">홈구장 정보 없음</p>
                        </Link>

                        <div className="bg-light rounded-3 p-2 d-flex justify-content-around small">
                            <div>
                                <div className="text-muted">순위</div>
                                <div className="fw-bold">-위</div>
                            </div>
                            <div className="vr"></div>
                            <div>
                                <div className="text-muted">승점</div>
                                <div className="fw-bold">-pts</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}

        {filteredTeams.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
                해당 리그에 등록된 팀이 없습니다.
            </div>
        )}
      </div>
    </div>
  );
}

export default TeamPage;