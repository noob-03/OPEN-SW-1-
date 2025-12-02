import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';

function CalendarPage({ sportMode }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1));
  const [selectedLeague, setSelectedLeague] = useState('K1');
  const [filterMyTeam, setFilterMyTeam] = useState(false);
  const [followedTeamIds, setFollowedTeamIds] = useState(new Set()); // 내 팔로우 팀 ID 목록

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

//   // JWT 토큰 디코딩 (TeamPage와 동일 로직)
//   const getUserIdFromToken = (rawToken) => {
//     try {
//         if (!rawToken) return null;
//         const token = rawToken.replace(/^"|"$/g, '').trim();
//         if (!token) return null;
//         const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
//         const decoded = JSON.parse(jsonPayload);
//         return decoded.sub || decoded.id || decoded.userId;
//     } catch (e) { return null; }
//   };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 1. 사용자 ID 확인 (팔로우 목록용)
      let currentUserId = null;
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
          currentUserId = storedUserId.replace(/^"|"$/g, '');
      } else {
          // 토큰에서 추출 시도
          let token = localStorage.getItem('accessToken') || localStorage.getItem('token');
          if (token) {
              currentUserId = getUserIdFromToken(token);
              if (currentUserId) localStorage.setItem('userId', currentUserId);
          }
      }

      // 2. [경기 일정 조회] (백엔드 MatchController)
      try {
          // 야구면 'KBO', 축구면 선택된 리그(K1, K2)
          const leagueParam = sportMode === 'baseball' ? 'KBO' : selectedLeague;
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;

          const matchRes = await axios.get(`http://localhost:8080/api/matches`, {
              params: { 
                  league: leagueParam,
                  year: year,
                  month: 10
              }
          });
          setMatches(matchRes.data);
      } catch (err) {
          console.error("경기 일정 로딩 실패:", err);
          setMatches([]); // 에러 시 빈 배열
      }

      // 3. [내 팔로우 목록 조회]
      if (currentUserId) {
          try {
              const followRes = await axios.get(`http://localhost:8080/api/follow/my`, {
                  params: { userId: currentUserId }
              });
              const myIds = new Set(followRes.data.map(t => t.teamId));
              setFollowedTeamIds(myIds);
          } catch (err) {
              console.warn("팔로우 목록 로딩 실패:", err);
          }
      }

      setLoading(false);
    };

    fetchData();
  }, [sportMode, selectedLeague, currentDate]); // 리그나 달이 바뀌면 다시 조회

  // 월 변경 핸들러
  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const formatMonth = (date) => {
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`;
  };

  // [필터링 로직]
  // 1. 기본적으로 DB에서 해당 월/리그 데이터를 가져왔으므로 날짜/리그 필터링은 불필요
  // 2. "내 팀만 보기" 필터가 켜져 있으면 팔로우한 팀이 포함된 경기만 남김
  const displayedMatches = matches.filter(match => {
      if (filterMyTeam) {
          // 홈팀이나 원정팀 중 하나라도 내가 팔로우한 팀이면 보여줌
          // 주의: DB 구조에 따라 match.homeTeam.teamId 처럼 접근해야 할 수 있음 (Entity 구조 확인 필요)
          // 여기서는 백엔드가 Entity를 그대로 준다고 가정 (객체 안에 teamId가 있음)
          const homeId = match.homeTeam?.teamId;
          const awayId = match.awayTeam?.teamId;
          return followedTeamIds.has(homeId) || followedTeamIds.has(awayId);
      }
      return true; // 필터 안 켜면 다 보여줌
  });

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold" style={{ color: themeColor }}>경기 일정</h2>

        {sportMode === 'soccer' && (
            <div className="btn-group" role="group">
                <button type="button" className={`btn ${selectedLeague === 'K1' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedLeague('K1')} style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K1' ? '#fff' : themeColor }}>K리그 1</button>
                <button type="button" className={`btn ${selectedLeague === 'K2' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedLeague('K2')} style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K2' ? '#fff' : themeColor }}>K리그 2</button>
            </div>
        )}
      </div>

      {/* 컨트롤 바 */}
      <div className="card p-3 mb-4 shadow-sm border-0 bg-white rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <button className={`btn d-flex align-items-center gap-2 ${filterMyTeam ? 'btn-dark' : 'btn-outline-secondary'}`} onClick={() => setFilterMyTeam(!filterMyTeam)}>
            <Filter size={18} /> {filterMyTeam ? '전체 경기 보기' : '내 팔로우 팀만 보기'}
          </button>

          <div className="d-flex align-items-center gap-3">
            <button onClick={() => changeMonth(-1)} className="btn btn-light rounded-circle p-2"><ChevronLeft /></button>
            <h4 className="m-0 fw-bold">{formatMonth(currentDate)}</h4>
            <button onClick={() => changeMonth(1)} className="btn btn-light rounded-circle p-2"><ChevronRight /></button>
          </div>
          <div style={{ width: '160px' }}></div>
        </div>
      </div>

      {/* 경기 리스트 */}
      <div className="d-flex flex-column gap-4">
        {loading ? (
            <div className="text-center py-5">로딩 중...</div>
        ) : displayedMatches.length > 0 ? (
            displayedMatches.map((match) => {
                const dayOfWeek = new Date(match.matchDate).toLocaleDateString('ko-KR', { weekday: 'short' });
                // 시간 포맷팅 (예: 14:00)
                const timeString = new Date(match.matchDate).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

                return (
                    <div key={match.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-light border-0 py-2 px-4 fw-bold text-secondary fs-5">
                            {/* 날짜 표시 (예: 2025-11-01) */}
                            {new Date(match.matchDate).toISOString().split('T')[0]} ({dayOfWeek})
                        </div>
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            {/* 홈팀 */}
                            <div className="d-flex align-items-center gap-3 flex-1" style={{width: '30%'}}>
                                {/* 로고 이미지 */}
                                {match.homeTeam.logoUrl ? (
                                    <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} style={{width: '50px', height: '50px', objectFit: 'contain'}} referrerPolicy="no-referrer" />
                                ) : <span style={{fontSize: '2rem'}}>⚽</span>}
                                <span className="fw-bold fs-5">{match.homeTeam.name}</span>
                            </div>

                            {/* 스코어 / 시간 */}
                            <div className="text-center" style={{width: '20%'}}>
                                {match.status === 'FINISHED' ? (
                                    <div className="fs-2 fw-black font-monospace">
                                        {match.homeScore} : {match.awayScore}
                                        <div className="badge bg-secondary fs-6 mt-1">종료</div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="fs-3 fw-bold mb-1">{timeString}</div>
                                        <div className="badge bg-primary">{match.stadium}</div>
                                    </div>
                                )}
                            </div>

                            {/* 원정팀 */}
                            <div className="d-flex align-items-center justify-content-end gap-3 flex-1" style={{width: '30%'}}>
                                <span className="fw-bold fs-5">{match.awayTeam.name}</span>
                                {match.awayTeam.logoUrl ? (
                                    <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} style={{width: '50px', height: '50px', objectFit: 'contain'}} referrerPolicy="no-referrer" />
                                ) : <span style={{fontSize: '2rem'}}>⚽</span>}
                            </div>

                            <div style={{width: '10%'}} className="text-end">
                                <button className="btn btn-sm btn-outline-secondary">분석</button>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="text-center py-5 text-muted">
                <CalendarIcon size={48} className="mb-3 opacity-25" />
                <p>해당 월에 예정된 경기가 없습니다.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;