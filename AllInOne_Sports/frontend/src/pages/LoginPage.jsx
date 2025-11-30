import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_API_BASE_URL = 'http://localhost:8080';

const LoginPage = ({ sportMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // [추가] 경기 데이터 상태
  const [topMatches, setTopMatches] = useState([]);

  // 슬라이드 관련 상태
  const [currentSlide, setCurrentSlide] = useState(0);
  const chunkSize = 4;

  // 1. 경기 데이터 불러오기
  useEffect(() => {
    const fetchTopMatches = async () => {
      try {
        const today = new Date();
        // 이번 달 경기 데이터 가져오기 (필요하면 다음 달 데이터도 가져오도록 로직 수정 가능)
        // 여기서는 편의상 '이번 달'의 '모든 리그' 경기를 가져온다고 가정하거나,
        // 특정 리그(K1, KBO 등)를 지정해서 가져옵니다.
        const leagueParam = sportMode === 'soccer' ? 'K1' : 'KBO';

        const response = await axios.get(`${BACKEND_API_BASE_URL}/api/matches`, {
            params: {
                league: leagueParam,
                year: 2025, // 데모용 (실제: today.getFullYear())
                month: 11   // 데모용 (실제: today.getMonth() + 1)
            }
        });

        // 가져온 데이터를 UI에 맞게 변환
        const formattedMatches = response.data.map(match => ({
            id: match.id,
            title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
            // 이미지가 없으므로 팀 로고 두 개를 보여주거나, 기본 배경 이미지를 사용해야 함
            // 여기서는 홈팀 로고를 대표 이미지로 사용하거나, 플레이스홀더 사용
            homeLogo: match.homeTeam.logoUrl,
            awayLogo: match.awayTeam.logoUrl,
            date: new Date(match.matchDate).toLocaleDateString(),
            time: new Date(match.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));

        setTopMatches(formattedMatches);

      } catch (error) {
        console.error("경기 일정 로딩 실패:", error);
        // 에러 시 빈 배열 유지
      }
    };

    fetchTopMatches();
  }, [sportMode]);

  const chunks = useMemo(() => {
    const tempChunks = [];
    // 데이터가 없으면 빈 청크 방지
    if (topMatches.length === 0) return [];

    for (let i = 0; i < topMatches.length; i += chunkSize) {
      tempChunks.push(topMatches.slice(i, i + chunkSize));
    }
    return tempChunks;
  }, [topMatches]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % chunks.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + chunks.length) % chunks.length);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (username === "" || password === "") {
      setErrorMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
      }

      const data = await response.json();
      if (!data.accessToken) throw new Error("토큰을 받아오지 못했습니다.");

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      window.dispatchEvent(new Event("login-status-change"));
      navigate('/main');

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  const CARD_HEIGHT = 220;
  const TITLE_AREA_HEIGHT = 150;
  const arrowTopStyle = `calc(${TITLE_AREA_HEIGHT + CARD_HEIGHT / 2 + 15}px)`;

  useEffect(() => {
    if (chunks.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [chunks.length]);

  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  const backgroundObjectStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: isLoginPage ? "50%" : "100%",
    zIndex: 0,
    transition: "width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
    background:
      sportMode === 'soccer'
        ? 'linear-gradient(155deg, #E0EBFF 0%, #BCD9FF 100%)'
        : 'linear-gradient(155deg, #FFE5E5 0%, #FFC2C2 100%)',
  };

  const heroColumnStyle = {
    paddingTop: '3rem',
    paddingBottom: '100px',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: '#FFFFFF' }}>

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '85vh', overflow: 'hidden' }}>
        <div style={backgroundObjectStyle} />

        <div className="row g-0" style={{ height: '100%', paddingTop: '80px' }}>

          {/* LEFT TEXT */}
          <div className="col-lg-6 d-flex flex-column justify-content-center px-5" style={heroColumnStyle}>
            <div className="ps-lg-5 ms-lg-5">
              <h1 className="display-3 fw-bold mb-4" style={{ color: themeColor }}>
                All Your Sports,<br />All In One Place
              </h1>
              <p className="text-muted fs-5 mb-0">Check Schedules, Book Tickets,</p>
              <p className="text-muted fs-5">And Join The Fan Community</p>
            </div>
          </div>

          {/* RIGHT LOGIN */}
          <div className="col-lg-6 d-flex justify-content-center align-items-center" style={heroColumnStyle}>
            <form
              onSubmit={handleLogin}
              className="card p-5 shadow-lg border-0 text-center"
              style={{
                maxWidth: '400px',
                width: '90%',
                borderRadius: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.95)',
              }}
            >
              <h2 className="mb-4 fw-bold text-dark">Sign In</h2>

              <div className="mb-3 text-start">
                <input
                  type="text"
                  className="form-control mb-3 p-3 bg-light border-0"
                  placeholder="Enter ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input
                  type="password"
                  className="form-control p-3 bg-light border-0"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {errorMessage && <p className="text-danger small mb-2">{errorMessage}</p>}

              <button
                type="submit"
                className="btn w-100 py-3 fw-bold mb-3"
                style={{
                  backgroundColor: themeColor,
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => navigate('/join')}
                className="btn btn-outline-dark w-100 py-3 fw-bold mb-4"
                style={{ borderRadius: '0.5rem' }}
              >
                Sign Up
              </button>

              <p className="text-muted small mb-2">Or continue with</p>

              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="btn btn-outline-secondary w-100 py-2 small mb-2"
              >
                Google Login
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('naver')}
                className="btn w-100 py-2 small"
                style={{ borderColor: '#03C75A', color: '#03C75A' }}
              >
                Naver Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 캐러셀 (Top Matches) */}
      <section className="container px-5 position-relative"
        style={{ paddingTop: '60px', paddingBottom: '150px', backgroundColor: '#FFF' }}>

        <div className="mb-5">
          <div style={{ width: '50px', height: '3px', backgroundColor: '#000', marginBottom: '1rem' }} />
          <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: '2.2rem' }}>
            This Week's Top Matches
          </h2>
        </div>

        {chunks.length > 0 && (
            <>
                <button
                  onClick={prevSlide}
                  className="btn btn-link p-0 position-absolute d-none d-md-block"
                  style={{ left: '-50px', top: arrowTopStyle }}
                >
                  <ChevronLeft size={40} />
                </button>

                <button
                  onClick={nextSlide}
                  className="btn btn-link p-0 position-absolute d-none d-md-block"
                  style={{ right: '-50px', top: arrowTopStyle }}
                >
                  <ChevronRight size={40} />
                </button>
            </>
        )}

        {topMatches.length > 0 ? (
            <div style={{ overflow: 'hidden' }}>
              <div
                className="row g-5 flex-nowrap"
                style={{
                  width: `${chunks.length * 100}%`,
                  transform: `translateX(-${currentSlide * (100 / chunks.length)}%)`,
                  transition: 'transform 0.5s ease-in-out',
                }}
              >
                {/* 데이터가 있을 때 렌더링 */}
                {topMatches.map((match) => (
                  <div
                    key={match.id}
                    className="col-12 col-md-6 col-lg-3"
                    style={{
                      flex: `0 0 ${100 / (chunks[0].length * chunks.length)}%`,
                    }}
                  >
                    <div className="card h-100 border-0" style={{ backgroundColor: 'transparent' }}>
                      <div
                        className="position-relative rounded-4 overflow-hidden mb-3 d-flex flex-column align-items-center justify-content-center bg-light shadow-sm"
                        style={{ height: `${CARD_HEIGHT}px` }}
                      >
                        {/* 팀 로고 대결 구도 UI */}
                        <div className="d-flex align-items-center justify-content-center w-100 h-75 gap-3">
                            {match.homeLogo ? <img src={match.homeLogo} alt="home" style={{width:'60px', height:'60px', objectFit:'contain'}} referrerPolicy="no-referrer"/> : <span className="fs-1">⚽</span>}
                            <span className="fw-bold text-muted fs-4">VS</span>
                            {match.awayLogo ? <img src={match.awayLogo} alt="away" style={{width:'60px', height:'60px', objectFit:'contain'}} referrerPolicy="no-referrer"/> : <span className="fs-1">⚽</span>}
                        </div>

                        {/* 경기 정보 */}
                        <div className="w-100 text-center pb-3">
                            <h6 className="fw-bold m-0 text-dark text-truncate px-2">{match.title}</h6>
                            <small className="text-muted">{match.date} {match.time}</small>
                        </div>

                        <div
                          className="position-absolute bottom-0 end-0 m-3 bg-black rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
                        >
                          <ArrowUpRight size={18} color="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        ) : (
            <div className="text-center py-5 text-muted">
                <p>예정된 경기 정보가 없습니다.</p>
            </div>
        )}
      </section>

    </div>
  );
};

export default LoginPage;