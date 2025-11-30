import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Instagram, Globe, MapPin } from 'lucide-react';
import axios from 'axios';

// 선수단 Mock 데이터는 유지 (아직 DB 연동 전)
const MOCK_PLAYERS = [];

function TeamDetailPage({ sportMode }) {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [teamMatches, setTeamMatches] = useState([]); // 경기 일정 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // 1. 데이터 불러오기 (팀 정보 + 팀 경기 일정)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // (1) 팀 정보 조회
        const teamResponse = await axios.get(`http://localhost:8080/api/teams/${id}`);
        setTeam(teamResponse.data);

        // (2) 팀 경기 일정 조회 (새로 만든 API)
        const matchResponse = await axios.get(`http://localhost:8080/api/matches/team/${id}`);
        setTeamMatches(matchResponse.data);

      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setError("정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        fetchData();
    }
  }, [id]);

  if (loading) return <div className="container pt-5 text-center">로딩 중...</div>;
  if (error || !team) return <div className="container pt-5 text-center text-danger">{error || "존재하지 않는 팀입니다."}</div>;

  // 선수단 필터링 (Mock 데이터 사용 시)
  const teamIdNum = parseInt(id);
  const teamPlayers = MOCK_PLAYERS.filter(p => p.teamId === teamIdNum);

  const groupedPlayers = {
    FW: teamPlayers.filter(p => p.position === 'FW'),
    MF: teamPlayers.filter(p => p.position === 'MF'),
    DF: teamPlayers.filter(p => p.position === 'DF'),
    GK: teamPlayers.filter(p => p.position === 'GK'),
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
                    <div style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '10px' }}>
                        {team.logoUrl ? (
                            <img src={team.logoUrl} alt={team.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} referrerPolicy="no-referrer" />
                        ) : (
                            <span style={{ fontSize: '4rem' }}>⚽</span>
                        )}
                    </div>

                    <div className="text-center text-md-start">
                        <span className="badge bg-white text-dark mb-2 bg-opacity-75">{team.league}</span>
                        <h1 className="fw-black display-4 mb-2">{team.name}</h1>
                        <p className="opacity-75 fs-5 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                            <MapPin size={18} /> {team.stadium || "홈구장 정보 없음"}
                        </p>

                        <div className="d-flex gap-2 justify-content-center justify-content-md-start mt-3">
                            {team.snsLink && (
                                <a href={team.snsLink} target="_blank" rel="noopener noreferrer"
                                   className="btn btn-outline-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                                    <Instagram size={16} /> Instagram
                                </a>
                            )}
                            {team.teamLink && (
                                <a href={team.teamLink} target="_blank" rel="noopener noreferrer"
                                   className="btn btn-outline-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                                    <Globe size={16} /> Official Web
                                </a>
                            )}
                            {team.ticketLink && (
                                <a href={team.ticketLink} target="_blank" rel="noopener noreferrer"
                                   className="btn btn-light text-dark btn-sm rounded-pill px-3 fw-bold">
                                    예매하기
                                </a>
                            )}
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
                            // 날짜 및 시간 포맷팅
                            const matchDate = new Date(match.matchDate);
                            const dateStr = matchDate.toLocaleDateString();
                            const timeStr = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            // 현재 팀(team)과 상대 팀(opponent) 구분
                            // match.homeTeam.teamId 와 현재 페이지의 teamIdNum(또는 team.teamId) 비교
                            const isHome = match.homeTeam.teamId === team.teamId;
                            const opponent = isHome ? match.awayTeam : match.homeTeam;

                            return (
                                <div key={match.id} className="card border-0 shadow-sm p-3 rounded-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/* 시간 정보 */}
                                        <div className="text-muted small" style={{width: '120px'}}>
                                            {dateStr}<br/>{timeStr}
                                        </div>

                                        {/* 대진 정보 (센터) */}
                                        <div className="flex-grow-1 d-flex justify-content-center align-items-center gap-3">
                                            {/* 우리 팀 (왼쪽) */}
                                            <div className="text-center" style={{width: '100px'}}>
                                                <div className="mb-1" style={{height:'40px'}}>
                                                    {team.logoUrl ? <img src={team.logoUrl} alt={team.name} style={{maxHeight:'100%', maxWidth:'100%'}} referrerPolicy="no-referrer"/> : <span>⚽</span>}
                                                </div>
                                                <small className="fw-bold">{team.name}</small>
                                            </div>

                                            {/* 스코어 또는 VS */}
                                            <div className="fw-bold fs-4 text-center" style={{minWidth: '80px'}}>
                                                {match.status === 'FINISHED' ? (
                                                    <span>
                                                        {isHome ? match.homeScore : match.awayScore} : {isHome ? match.awayScore : match.homeScore}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">VS</span>
                                                )}
                                            </div>

                                            {/* 상대 팀 (오른쪽) */}
                                            <div className="text-center" style={{width: '100px'}}>
                                                <div className="mb-1" style={{height:'40px'}}>
                                                    {opponent.logoUrl ? <img src={opponent.logoUrl} alt={opponent.name} style={{maxHeight:'100%', maxWidth:'100%'}} referrerPolicy="no-referrer"/> : <span>⚽</span>}
                                                </div>
                                                <small>{opponent.name}</small>
                                            </div>
                                        </div>

                                        {/* 상태 배지 */}
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
                    {/* 사이드바: 응원톡 */}
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="fw-bold mb-3">실시간 응원톡</h6>
                        <div className="d-flex flex-column gap-3 mb-3" style={{height: '300px', overflowY: 'auto'}}>
                            <div className="bg-light p-2 rounded">
                                <small className="fw-bold">팬123</small>
                                <p className="mb-0 small">오늘 경기 무조건 이기자!</p>
                            </div>
                        </div>
                        <input type="text" className="form-control form-control-sm" placeholder="응원 메시지 남기기..." />
                    </div>
                </div>
            </div>
        ) : (
            <div>
                {/* 선수단 정보 (Mock) */}
                {['FW', 'MF', 'DF', 'GK'].map(pos => (
                    <div key={pos} className="mb-5">
                        <h5 className="fw-bold mb-3 border-start border-4 border-dark ps-2">
                            {pos === 'FW' ? '공격수 (FW)' : pos === 'MF' ? '미드필더 (MF)' : pos === 'DF' ? '수비수 (DF)' : '골키퍼 (GK)'}
                        </h5>
                        <div className="row g-3">
                            {groupedPlayers[pos] && groupedPlayers[pos].length > 0 ? groupedPlayers[pos].map(player => (
                                <div key={player.id} className="col-6 col-md-4 col-lg-2">
                                    <div className="card border-0 shadow-sm text-center py-4 rounded-4 hover-scale">
                                        <div className="mb-3 mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width:'80px', height:'80px'}}>
                                            <Users size={40} className="text-secondary"/>
                                        </div>
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