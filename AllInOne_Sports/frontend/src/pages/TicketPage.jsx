
import React, { useState, useMemo } from 'react';
import { Ticket, ExternalLink } from 'lucide-react';
import { MOCK_TEAMS, MOCK_MATCHES } from '../../constants';

function TicketPage({ sportMode }) {
  const [selectedLeague, setSelectedLeague] = useState('K1'); // K1, K2 (축구일 때만 유효)
  const [selectedTeams, setSelectedTeams] = useState([]);

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // 현재 리그에 맞는 팀 목록 필터링
  const currentLeagueTeams = useMemo(() => {
    if (sportMode === 'baseball') return MOCK_TEAMS.filter(t => t.sport === 'baseball');
    return MOCK_TEAMS.filter(t => t.league === selectedLeague);
  }, [sportMode, selectedLeague]);

  // 팀 선택 핸들러
  const toggleTeam = (teamId) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) ? prev.filter(id => id !== teamId) : [...prev, teamId]
    );
  };

  // 예매 가능한 경기 (여기서는 단순히 예정된 경기만 필터링)
  const ticketMatches = MOCK_MATCHES.filter(match => {
    // 1. 종목 필터
    const isCorrectSport = sportMode === 'soccer' ? match.league.startsWith('K') : match.league === 'KBO';
    if (!isCorrectSport) return false;

    // 2. 리그 필터 (축구일 때)
    if (sportMode === 'soccer' && match.league !== selectedLeague) return false;

    // 3. 팀 필터 (선택된 팀이 있을 경우, 홈이나 원정 팀 중 하나라도 포함되면 표시)
    if (selectedTeams.length > 0) {
      return selectedTeams.includes(match.homeId) || selectedTeams.includes(match.awayId);
    }

    return match.status === 'SCHEDULED'; // 예정된 경기만
  });

  const getTeam = (id) => MOCK_TEAMS.find(t => t.id === id);

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <h2 className="fw-bold mb-4" style={{ color: themeColor }}>티켓 예매처 모아보기</h2>

      {/* 필터 섹션 */}
      <div className="card p-4 mb-5 shadow-sm border-0 bg-white rounded-4">
        <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FilterIcon /> 상세 조건
        </h5>

        {/* 리그 선택 (축구일 때만) */}
        {sportMode === 'soccer' && (
            <div className="mb-4">
                <label className="fw-bold text-muted small mb-2 d-block">리그 선택</label>
                <div className="btn-group" role="group">
                    <button 
                        className={`btn btn-sm ${selectedLeague === 'K1' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => { setSelectedLeague('K1'); setSelectedTeams([]); }}
                        style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K1' ? '#fff' : themeColor }}
                    >
                        K리그 1 (12팀)
                    </button>
                    <button 
                        className={`btn btn-sm ${selectedLeague === 'K2' ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => { setSelectedLeague('K2'); setSelectedTeams([]); }}
                        style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K2' ? '#fff' : themeColor }}
                    >
                        K리그 2 (13팀)
                    </button>
                </div>
            </div>
        )}

        {/* 구단 선택 체크박스 */}
        <div className="mb-3">
            <label className="fw-bold text-muted small mb-2 d-block">구단 선택</label>
            <div className="d-flex flex-wrap gap-3">
                {currentLeagueTeams.map(team => (
                    <div key={team.id} className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id={`team-${team.id}`}
                            checked={selectedTeams.includes(team.id)}
                            onChange={() => toggleTeam(team.id)}
                        />
                        <label className="form-check-label" htmlFor={`team-${team.id}`}>
                            {team.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
        
        {/* 예매처 필터 (더미) */}
        <div>
            <label className="fw-bold text-muted small mb-2 d-block">예매처</label>
            <div className="d-flex gap-3">
                {['티켓링크', '인터파크 티켓', '구단 공식몰'].map(v => (
                    <div key={v} className="form-check">
                        <input className="form-check-input" type="checkbox" id={`vendor-${v}`} />
                        <label className="form-check-label" htmlFor={`vendor-${v}`}>{v}</label>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 예매 목록 */}
      <h5 className="fw-bold mb-3">예매 가능한 경기</h5>
      <div className="d-flex flex-column gap-3">
        {ticketMatches.length > 0 ? ticketMatches.map(match => {
            const home = getTeam(match.homeId);
            const away = getTeam(match.awayId);
            
            return (
                <div key={match.id} className="card border-0 shadow-sm p-4 rounded-4 d-flex flex-row align-items-center justify-content-between">
                    {/* 날짜 및 시간 */}
                    <div className="text-center bg-light rounded-3 p-3" style={{minWidth: '100px'}}>
                        <div className="small text-muted">{match.date}</div>
                        <div className="fs-4 fw-bold text-dark">{match.time}</div>
                    </div>

                    {/* 매치 정보 */}
                    <div className="d-flex align-items-center justify-content-center flex-grow-1 gap-4 mx-4">
                        <div className="text-center">
                            <div className="fs-2 mb-2">{home.logo}</div>
                            <div className="fw-bold">{home.name}</div>
                        </div>
                        <div className="fs-4 fw-bold text-secondary">VS</div>
                        <div className="text-center">
                            <div className="fs-2 mb-2">{away.logo}</div>
                            <div className="fw-bold">{away.name}</div>
                        </div>
                    </div>

                    {/* 경기장 정보 */}
                    <div className="text-muted small px-3 border-start border-end">
                        {match.stadium}<br/>경기중
                    </div>

                    {/* 예매 버튼 */}
                    <div className="d-flex flex-column gap-2 ms-4" style={{minWidth: '180px'}}>
                        <button className="btn btn-outline-dark btn-sm d-flex justify-content-between align-items-center">
                            <span>🎫 티켓링크</span> <ExternalLink size={14}/>
                        </button>
                        <button className="btn btn-outline-dark btn-sm d-flex justify-content-between align-items-center">
                            <span>🎟️ 인터파크</span> <ExternalLink size={14}/>
                        </button>
                    </div>
                </div>
            );
        }) : (
            <div className="text-center py-5 text-muted bg-light rounded-4">
                <Ticket size={48} className="mb-3 opacity-25" />
                <p>현재 예매 가능한 경기가 없습니다.</p>
            </div>
        )}
      </div>
    </div>
  );
}

function FilterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
    );
}

export default TicketPage;
