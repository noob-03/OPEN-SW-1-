
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { MOCK_TEAMS, MOCK_MATCHES, MOCK_PLAYERS } from '../../constants';

function TeamDetailPage({ sportMode }) {
  const { id } = useParams();
  const team = MOCK_TEAMS.find(t => t.id === id);
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, roster

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  if (!team) return <div className="container pt-5">존재하지 않는 팀입니다.</div>;

  // 해당 팀의 경기 일정 필터링
  const teamMatches = MOCK_MATCHES.filter(m => m.homeId === id || m.awayId === id);

  // 해당 팀의 선수단 필터링 및 포지션 그룹화
  const teamPlayers = MOCK_PLAYERS.filter(p => p.teamId === id);
  const groupedPlayers = {
    FW: teamPlayers.filter(p => p.position === 'FW'),
    MF: teamPlayers.filter(p => p.position === 'MF'),
    DF: teamPlayers.filter(p => p.position === 'DF'),
    GK: teamPlayers.filter(p => p.position === 'GK'),
  };

  const getOpponent = (match) => {
    const opponentId = match.homeId === id ? match.awayId : match.homeId;
    return MOCK_TEAMS.find(t => t.id === opponentId) || { name: 'Unknown', logo: '?' };
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        
        {/* 상단 헤더 (팀 정보) */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 text-white" 
             style={{ background: `linear-gradient(45deg, ${themeColor}, #222)` }}>
            <div className="card-body p-5 position-relative">
                <Link to="/teams" className="text-white-50 position-absolute top-0 start-0 m-4">
                    <ArrowLeft size={24} />
                </Link>
                
                <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                    <div style={{ fontSize: '6rem' }}>{team.logo}</div>
                    <div className="text-center text-md-start">
                        <span className="badge bg-white text-dark mb-2 bg-opacity-75">{team.league === 'K1' ? 'K LEAGUE 1' : 'K LEAGUE 2'}</span>
                        <h1 className="fw-black display-4 mb-0">{team.name}</h1>
                        <p className="opacity-75 fs-5 mt-2">감독: 김기동 | 구장: 서울 월드컵 경기장</p>
                    </div>
                    <div className="ms-auto d-flex gap-4 text-center">
                        <div>
                            <div className="h2 fw-bold mb-0">5</div>
                            <small className="opacity-75">순위</small>
                        </div>
                        <div>
                            <div className="h2 fw-bold mb-0">49</div>
                            <small className="opacity-75">승점</small>
                        </div>
                        <div>
                            <div className="h2 fw-bold mb-0">12</div>
                            <small className="opacity-75">승</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="d-flex border-bottom mb-4">
            <button 
                className={`btn rounded-0 py-3 px-4 fw-bold ${activeTab === 'schedule' ? 'border-bottom border-3 border-primary text-primary' : 'text-muted'}`}
                style={{ borderColor: activeTab === 'schedule' ? themeColor : 'transparent', color: activeTab === 'schedule' ? themeColor : undefined }}
                onClick={() => setActiveTab('schedule')}
            >
                경기 일정
            </button>
            <button 
                className={`btn rounded-0 py-3 px-4 fw-bold ${activeTab === 'roster' ? 'border-bottom border-3 border-primary text-primary' : 'text-muted'}`}
                style={{ borderColor: activeTab === 'roster' ? themeColor : 'transparent', color: activeTab === 'roster' ? themeColor : undefined }}
                onClick={() => setActiveTab('roster')}
            >
                선수단
            </button>
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === 'schedule' ? (
            <div className="row">
                <div className="col-lg-8">
                    <h5 className="fw-bold mb-3">경기 일정/결과</h5>
                    <div className="d-flex flex-column gap-3">
                        {teamMatches.length > 0 ? teamMatches.map(match => {
                            const opponent = getOpponent(match);
                            return (
                                <div key={match.id} className="card border-0 shadow-sm p-3 rounded-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="text-muted small" style={{width: '120px'}}>
                                            {match.date}<br/>{match.time}
                                        </div>
                                        <div className="flex-grow-1 d-flex justify-content-center align-items-center gap-3">
                                            <div className="text-center" style={{width: '100px'}}>
                                                <div className="fs-3">{team.logo}</div>
                                                <small>{team.name}</small>
                                            </div>
                                            <div className="fw-bold fs-4 text-center" style={{minWidth: '60px'}}>
                                                {match.status === 'FINISHED' ? 
                                                    `${match.homeId === id ? match.homeScore : match.awayScore} : ${match.homeId === id ? match.awayScore : match.homeScore}` 
                                                    : 'VS'}
                                            </div>
                                            <div className="text-center" style={{width: '100px'}}>
                                                <div className="fs-3">{opponent.logo}</div>
                                                <small>{opponent.name}</small>
                                            </div>
                                        </div>
                                        <div className="text-end" style={{width: '80px'}}>
                                            {match.status === 'FINISHED' ? 
                                                <span className="badge bg-secondary">종료</span> : 
                                                <span className="badge bg-primary">예정</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-muted py-5 text-center">등록된 경기 일정이 없습니다.</p>
                        )}
                    </div>
                </div>
                <div className="col-lg-4">
                    {/* 사이드바: 간단한 채팅이나 응원 댓글 (UI만 구현) */}
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="fw-bold mb-3">실시간 응원톡</h6>
                        <div className="d-flex flex-column gap-3 mb-3" style={{height: '300px', overflowY: 'auto'}}>
                            <div className="bg-light p-2 rounded">
                                <small className="fw-bold">팬123</small>
                                <p className="mb-0 small">오늘 경기 무조건 이기자!</p>
                            </div>
                            <div className="bg-light p-2 rounded">
                                <small className="fw-bold">서울사랑</small>
                                <p className="mb-0 small">린가드 골 기대합니다</p>
                            </div>
                        </div>
                        <input type="text" className="form-control form-control-sm" placeholder="응원 메시지 남기기..." />
                    </div>
                </div>
            </div>
        ) : (
            <div>
                {['FW', 'MF', 'DF', 'GK'].map(pos => (
                    <div key={pos} className="mb-5">
                        <h5 className="fw-bold mb-3 border-start border-4 border-dark ps-2">
                            {pos === 'FW' ? '공격수 (FW)' : pos === 'MF' ? '미드필더 (MF)' : pos === 'DF' ? '수비수 (DF)' : '골키퍼 (GK)'}
                        </h5>
                        <div className="row g-3">
                            {groupedPlayers[pos] && groupedPlayers[pos].length > 0 ? groupedPlayers[pos].map(player => (
                                <div key={player.id} className="col-6 col-md-4 col-lg-2">
                                    <div className="card border-0 shadow-sm text-center py-4 rounded-4 hover-scale">
                                        <img src={player.image} className="rounded-circle mx-auto mb-3 shadow-sm" width="80" height="80" alt={player.name} />
                                        <h6 className="fw-bold mb-0">{player.name}</h6>
                                        <small className="text-muted">No.{player.number}</small>
                                    </div>
                                </div>
                            )) : <p className="text-muted ms-2">등록된 선수가 없습니다.</p>}
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
}

export default TeamDetailPage;
