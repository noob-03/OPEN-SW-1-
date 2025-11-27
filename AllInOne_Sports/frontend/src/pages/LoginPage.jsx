import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const MOCK_TOP_MATCHES = [
  { id: 1, title: "아스날 vs 토트넘", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/5C67F2?text=Match" },
  { id: 2, title: "맨시티 vs 리버풀", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/5C67F2?text=Match" },
  { id: 3, title: "바르셀로나 vs 레알", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/5C67F2?text=Match" },
  { id: 4, title: "뮌헨 vs 도르트문트", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/5C67F2?text=Match" },
  { id: 5, title: "PSG vs 마르세유", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/E03131?text=Match" },
  { id: 6, title: "AC밀란 vs 인터밀란", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/E03131?text=Match" },
  { id: 7, title: "첼시 vs 맨유", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/E03131?text=Match" },
  { id: 8, title: "유벤투스 vs 나폴리", imageUrl: "https://via.placeholder.com/300x200/f0f4f8/E03131?text=Match" },
];

const LoginPage = ({ sportMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const chunkSize = 4;

  const chunks = useMemo(() => {
    const tempChunks = [];
    for (let i = 0; i < MOCK_TOP_MATCHES.length; i += chunkSize) {
      tempChunks.push(MOCK_TOP_MATCHES.slice(i, i + chunkSize));
    }
    return tempChunks;
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % chunks.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + chunks.length) % chunks.length);

  const BACKEND_API_BASE_URL = 'http://localhost:8080';

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
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [chunks.length]);

  // 🔥 라우터 주소 기반 배경 width 애니메이션
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

      {/* 캐러셀 - 원본 유지 */}
      <section className="container px-5 position-relative"
        style={{ paddingTop: '60px', paddingBottom: '150px', backgroundColor: '#FFF' }}>

        <div className="mb-5">
          <div style={{ width: '50px', height: '3px', backgroundColor: '#000', marginBottom: '1rem' }} />
          <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: '2.2rem' }}>
            This Week's Top Matches
          </h2>
        </div>

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

        <div style={{ overflow: 'hidden' }}>
          <div
            className="row g-5 flex-nowrap"
            style={{
              width: `${chunks.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / chunks.length)}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {MOCK_TOP_MATCHES.map((match) => (
              <div
                key={match.id}
                className="col-12 col-md-6 col-lg-3"
                style={{
                  flex: `0 0 ${100 / (chunks[0].length * chunks.length)}%`,
                }}
              >
                <div className="card h-100 border-0" style={{ backgroundColor: 'transparent' }}>
                  <div
                    className="position-relative rounded-4 overflow-hidden mb-3"
                    style={{ height: `${CARD_HEIGHT}px`, backgroundColor: '#f8f9fa' }}
                  >
                    <img
                      src={match.imageUrl}
                      className="w-100 h-100 object-fit-cover"
                      alt={match.title}
                      style={{ opacity: 0.8 }}
                    />

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
      </section>

    </div>
  );
};

export default LoginPage;
