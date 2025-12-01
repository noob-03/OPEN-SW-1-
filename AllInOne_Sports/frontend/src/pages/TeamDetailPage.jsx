import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Instagram, Globe, MapPin } from 'lucide-react';
import axios from 'axios';

function TeamDetailPage({ sportMode }) {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [teamMatches, setTeamMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [players, setPlayers] = useState([]);

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // 선수 정보 불러오기 API 함수
  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/players/by-team/${id}`);
      setPlayers(res.data || []);
    } catch (error) {
      console.error("선수 정보 로딩 실패:", error);
    }
  };

  // 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 팀 정보 불러오기
        const teamResponse = await axios.get(`http://localhost:8080/api/teams/${id}`);
        setTeam(teamResponse.data);

        // 팀 경기 일정 불러오기
        const matchResponse = await axios.get(`http://localhost:8080/api/matches/by-team/${id}`);
        setTeamMatches(matchResponse.data);

        // 선수 정보 불러오기
        await fetchPlayers();
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setError("정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

// --------------------------------------------------------------------------
// [로직 분리] 렌더링 전에 감독(등번호 없음)과 선수(등번호 있음)를 분류합니다.
// --------------------------------------------------------------------------

// 1. 감독: playerNumber가 아예 없는 경우 (null)
const directors = players.filter((p) => p.playerNumber === null);
// 2. 선수: playerNumber가 있는 경우 (0번 포함, null이 아닌 모든 값)
// (주의: !p.playerNumber 라고 쓰면 0도 false가 되어 감독으로 가버립니다. 꼭 !== null을 써야 합니다)
const fieldPlayers = players.filter((p) => p.playerNumber !== null);

  if (loading) return <div className="container pt-5 text-center">로딩 중...</div>;
  if (error || !team) return <div className="container pt-5 text-center text-danger">{error || "존재하지 않는 팀입니다."}</div>;

  return (
    <div className="container" style={{ paddingTop: "100px", paddingBottom: "80px" }}>

      {/* -------------------- 상단 헤더 -------------------- */}
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 text-white"
        style={{ background: `linear-gradient(45deg, ${themeColor}, #222)` }}
      >
        <div className="card-body p-5 position-relative">
          <Link to="/teams" className="text-white-50 position-absolute top-0 start-0 m-4">
            <ArrowLeft size={24} />
          </Link>

          <div className="d-flex flex-column flex-md-row align-items-center gap-4">
            <div
              style={{
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              {team.logoUrl ? (
                <img
                  src={team.logoUrl}
                  alt={team.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span style={{ fontSize: "4rem" }}>⚽</span>
              )}
            </div>

            <div className="text-center text-md-start">
              <span className="badge bg-white text-dark mb-2 bg-opacity-75">{team.league}</span>
              <h1 className="fw-black display-4 mb-2">{team.name}</h1>
              <p className="opacity-75 fs-5 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <MapPin size={18} /> {team.teamStadium || "홈구장 정보 없음"}
              </p>

              <div className="d-flex gap-2 justify-content-center justify-content-md-start mt-3">
                {team.snsLink && (
                  <a href={team.snsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <Instagram size={16} /> Instagram
                  </a>
                )}
                {team.teamLink && (
                  <a href={team.teamLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                    <Globe size={16} /> Official Web
                  </a>
                )}
                {team.ticketLink && (
                  <a href={team.ticketLink} target="_blank" rel="noopener noreferrer" className="btn btn-light text-dark btn-sm rounded-pill px-3 fw-bold">
                    예매하기
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- 탭 메뉴 -------------------- */}
      <div className="d-flex border-bottom mb-4">
        <button
          className={`btn rounded-0 py-3 px-4 fw-bold ${activeTab === "schedule" ? "border-bottom border-3 text-primary" : "text-muted"}`}
          style={{
            borderColor: activeTab === "schedule" ? themeColor : "transparent",
            color: activeTab === "schedule" ? themeColor : undefined,
          }}
          onClick={() => setActiveTab("schedule")}
        >
          경기 일정
        </button>

        <button
          className={`btn rounded-0 py-3 px-4 fw-bold ${activeTab === "roster" ? "border-bottom border-3 text-primary" : "text-muted"}`}
          style={{
            borderColor: activeTab === "roster" ? themeColor : "transparent",
            color: activeTab === "roster" ? themeColor : undefined,
          }}
          onClick={() => setActiveTab("roster")}
        >
          선수단
        </button>
      </div>

      {/* -------------------- 탭 내용 -------------------- */}
      {activeTab === "schedule" ? (
        /* ---------- 경기 일정 ---------- */
        <div className="row">
          <div className="col-lg-8">
            <h5 className="fw-bold mb-3">경기 일정 / 결과</h5>

            <div className="d-flex flex-column gap-3">
              {teamMatches.length > 0 ? (
                teamMatches.map((match) => {
                  const matchDate = new Date(match.matchDate);
                  const dateStr = matchDate.toLocaleDateString();
                  const timeStr = matchDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                  // ⭐ [수정됨] Optional Chaining(?.)을 사용하여 homeTeam이 null일 때 에러 방지
                  // 기존: match.homeTeam.teamId -> 에러 발생
                  // 수정: match.homeTeam?.teamId -> 안전함
                  const isHome = match.homeTeam?.teamId === team.teamId;

                  // ⭐ [수정됨] 상대팀 데이터가 null일 경우를 대비한 안전 장치
                  let opponent = isHome ? match.awayTeam : match.homeTeam;
                  if (!opponent) {
                      opponent = { name: "상대팀 미정", logoUrl: null };
                  }

                  return (
                    <div key={match.id} className="card border-0 shadow-sm p-3 rounded-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="text-muted small" style={{ width: "120px" }}>
                          {dateStr}
                          <br />
                          {timeStr}
                        </div>

                        <div className="flex-grow-1 d-flex justify-content-center align-items-center gap-3">
                          {/* 우리 팀 (현재 페이지의 팀) */}
                          <div className="text-center" style={{ width: "100px" }}>
                            <div className="mb-1" style={{ height: "40px" }}>
                              {team.logoUrl ? (
                                <img src={team.logoUrl} style={{ maxHeight: "100%" }} alt={team.name} />
                              ) : (
                                <span>⚽</span>
                              )}
                            </div>
                            <small className="fw-bold">{team.name}</small>
                          </div>

                          <div className="fw-bold fs-4 text-center" style={{ minWidth: "80px" }}>
                            {match.status === "FINISHED" ? (
                              <span>
                                {isHome ? match.homeScore : match.awayScore} :{" "}
                                {isHome ? match.awayScore : match.homeScore}
                              </span>
                            ) : (
                              <span className="text-muted">VS</span>
                            )}
                          </div>

                          {/* 상대 팀 (opponent가 null이어도 안전하게 표시) */}
                          <div className="text-center" style={{ width: "100px" }}>
                            <div className="mb-1" style={{ height: "40px" }}>
                              {opponent.logoUrl ? (
                                <img src={opponent.logoUrl} style={{ maxHeight: "100%" }} alt={opponent.name} />
                              ) : (
                                <span>⚽</span>
                              )}
                            </div>
                            <small>{opponent.name}</small>
                          </div>
                        </div>

                        <div className="text-end" style={{ width: "80px" }}>
                          {match.status === "FINISHED" ? (
                            <span className="badge bg-secondary">종료</span>
                          ) : (
                            <span className="badge bg-primary">예정</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted py-5 text-center">등록된 경기 일정이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ---------- 선수단 탭 ---------- */
        <div>
          {/* 1. 코칭 스태프 (감독) */}
          {directors.length > 0 && (
            <div className="mb-5">
              <h5 className="fw-bold mb-3 border-start border-4 border-dark ps-2">코칭 스태프</h5>
              <div className="row g-3">
                {directors.map((director) => (
                  <div key={director.playerId} className="col-6 col-md-4 col-lg-2">
                    <div className="card border-0 shadow-sm text-center py-4 rounded-4 hover-scale h-100">
                      <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", background: "#f5f5f5", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={director.playerUrl || "/default-player.png"} alt={director.playerName} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <h6 className="fw-bold mb-1">{director.playerName}</h6>
                      <span className="badge bg-dark mx-auto mt-1">감독</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. 선수단 */}
          <div>
            <h5 className="fw-bold mb-3 border-start border-4 border-dark ps-2">선수단</h5>
            <div className="row g-3">
              {fieldPlayers.length > 0 ? (
                fieldPlayers.map((player) => (
                  <div key={player.playerId} className="col-6 col-md-4 col-lg-2">
                    <div className="card border-0 shadow-sm text-center py-4 rounded-4 hover-scale h-100">
                      <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", background: "#f5f5f5", borderRadius: "50%", overflow: "hidden" }}>
                        {player.playerUrl ? (
                          <img src={player.playerUrl} alt={player.playerName} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.backgroundColor = '#eee'; }} />
                        ) : (
                          <Users size={40} className="text-secondary" />
                        )}
                      </div>
                      <h6 className="fw-bold mb-0">{player.playerName}</h6>
                      <small className="text-muted">No. {player.playerNumber}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted ms-2">등록된 선수가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailPage;