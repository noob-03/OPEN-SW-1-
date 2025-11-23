import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

// [백엔드 연동 지점 1] - 가짜 데이터 (Mock Data)
const MOCK_TOP_MATCHES = [
  { id: 1, title: "Train Hard, Live Better", imageUrl: "https://via.placeholder.com/300x200?text=Match+1" },
  { id: 2, title: "Money Transfers", imageUrl: "https://via.placeholder.com/300x200?text=Match+2" },
  { id: 3, title: "Financial Clarity", imageUrl: "https://via.placeholder.com/300x200?text=Match+3" },
  { id: 4, title: "Jones & Brown Legal", imageUrl: "https://via.placeholder.com/300x200?text=Match+4" },
  { id: 5, title: "Match 5 (Next Slide)", imageUrl: "https://via.placeholder.com/300x200?text=Match+5" },
  { id: 6, title: "Match 6 (Next Slide)", imageUrl: "https://via.placeholder.com/300x200?text=Match+6" },
  { id: 7, title: "Match 7 (Next Slide)", imageUrl: "https://via.placeholder.com/300x200?text=Match+7" },
  { id: 8, title: "Match 8 (Next Slide)", imageUrl: "https://via.placeholder.com/300x200?text=Match+8" },
];

function HomePage() {
  const [topMatches, setTopMatches] = useState([]);
  const navigate = useNavigate();

  // 로그인 상태 관리
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTopMatches(MOCK_TOP_MATCHES);
    // fetch('/api/matches/top')
    //   .then(res => res.json())
    //   .then(data => setTopMatches(data));
  }, []);

  // 소셜 로그인 이벤트
  const handleSocialLogin = (provider) => {
      window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`
      navigate("/user");
  };

  // 자체 로그인 이벤트 (사용자가 제공한 로직 반영)
  const handleLogin = async (e) => {

      e.preventDefault();
      setError("");

      if (username === "" || password === "") {
          setError("아이디와 비밀번호를 입력하세요.");
          return;
      }

      // API 요청
      try {
          // Spring Boot의 /login 엔드포인트로 POST 요청
          const res = await fetch(`${BACKEND_API_BASE_URL}/login`, {
              method: "POST",
              headers: {"Content-Type": "application/json",},
              credentials: "include",
              body: JSON.stringify({ username, password }),
          });

          if (!res.ok) {
              // 응답이 200-299가 아니면 실패 처리
              throw new Error("로그인 실패");
          }

          const data = await res.json();
          // 토큰 저장 (로그인 유지)
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // 로그인 성공 후 메인/대시보드 페이지로 이동
          navigate("/user");
      } catch (err) {
          console.error("Login Error:", err);
          setError("아이디 또는 비밀번호가 틀렸습니다.");
      }
  };

  // 회원가입 이벤트: /join 경로로 이동
  const handleSignUp = () => {
    navigate('/join');
  };

  // 캐러셀은 4개씩 묶어야 하므로, 데이터를 4개 단위로 자르는 함수
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  const matchChunks = chunkArray(topMatches, 4);


    // --- 오른쪽 컬럼 스타일 (그라데이션 수정됨) ---
  const rightColumnStyle = {
    // Figma 정보 반영: 흰색(#FFFFFF) -> 연한 파랑(#BCD9FF)
    // 방향: to right (왼쪽에서 오른쪽으로)
    backgroundImage: 'linear-gradient(to left, #FFFFFF 0%, #BCD9FF 100%)',

    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '300px',
    minHeight: '100vh'
  };

  // --- 왼쪽 컬럼 스타일 (흰색) ---
  const leftColumnStyle = {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '5rem',
    paddingTop: '350px',
    minHeight: '100vh'
  };

  return (
    <>
      {/* --- 1. 메인 히어로 & 로그인 섹션 (Split Screen) --- */}
      <section className="container-fluid p-0 overflow-hidden">
        <div className="row g-0">

          {/* 왼쪽: 텍스트 영역 */}
          <div className="col-lg-6" style={leftColumnStyle}>
            <div>
              <h1 className="hero-title">All Your Sports,<br/>All In One Place</h1>
              <p className="lead hero-subtitle">
                Check Schedules, Book Tickets,<br/>
                And Join The Fan Community<br/>
                For KBO And K-League
              </p>
            </div>
          </div>

          {/* 오른쪽: 로그인 폼 영역 (그라데이션 배경) */}
          <div className="col-lg-6" style={rightColumnStyle}>
            <div className="card shadow-lg border-0 rounded-4" style={{ width: '80%', maxWidth: '450px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 fw-bold">Sign In</h3>

                {/* 💡 1. 오류 메시지 표시 */}
                {error && (
                    <div className="alert alert-danger small py-2" role="alert">
                        {error}
                    </div>
                )}

                {/* 💡 2. 로그인 폼 (handleLogin 연결) */}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control form-control-lg"
                      placeholder="Enter ID"
                      style={{backgroundColor: '#F0F4F8', border: 'none'}}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      style={{backgroundColor: '#F0F4F8', border: 'none'}}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary btn-lg fw-semibold" style={{backgroundColor: '#6C80FF', borderColor: '#6C80FF'}}>Sign In</button>
                  </div>
                </form>

                {/* 💡 3. Sign Up 버튼 (폼 외부에 배치) */}
                <div className="d-grid mb-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg fw-semibold" // 아웃라인 스타일로 변경
                    onClick={handleSignUp}
                    >
                    Sign Up
                  </button>
                </div>

                <div className="text-center text-muted small my-3">Or continue with</div>

                {/* 💡 4. 소셜 로그인 버튼 정리 (d-grid gap-2 사용) */}
                <div className="d-grid gap-2">
                  <button onClick={() => handleSocialLogin("google")} className="btn btn-outline-secondary w-100">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                      alt="Google Logo"
                      style={{ height: '1.2em', marginRight: '0.5em', verticalAlign: 'middle' }}
                    />
                    Sign in with Google
                  </button>
                  <button onClick={() => handleSocialLogin("naver")} className="btn btn-outline-secondary w-100">
                    <img
                      src="https://i.namu.wiki/i/p_1IEyQ8rYenO9YgAFp_LHIAW46kn6DXT0VKmZ_jKNijvYth9DieYZuJX_E_H_4GkCER_sVKhMqSyQYoW94JKA.svg"
                      alt="Naver Logo"
                      style={{ height: '1.2em', marginRight: '0.5em', verticalAlign: 'middle' }}
                    />
                    Sign in with Naver
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 2. TOP 매치 캐러셀 섹션 --- */}
      <section className="container mb-5 mt-5">
        <h2 className="mb-2 fw-bold">This Week's Top Matches</h2>
        <p className="text-muted mb-4">Check Out The Hottest Games</p>

        <div id="topMatchesCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {matchChunks.map((chunk, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="row g-4">
                  {chunk.map(match => (
                    <div className="col-md-3" key={match.id}>
                      <div className="card h-100 shadow-sm border-0">
                        <img src={match.imageUrl} className="card-img-top" alt={match.title} />
                        <div className="card-body">
                          <h5 className="card-title">{match.title}</h5>
                          <a href={`/matches/${match.id}`} className="btn btn-sm btn-outline-primary">View Details</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#topMatchesCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" style={{filter: 'invert(1)'}}></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#topMatchesCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" style={{filter: 'invert(1)'}}></span>
          </button>
        </div>
      </section>
    </>
  );
}

export default HomePage;