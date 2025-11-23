import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import { LogOut, User, MessageSquare, Bell, Users, HelpCircle, ChevronRight, X, Loader2, Settings } from 'lucide-react';

// --- 1. Header Component ---
function Header({ sportMode, setSportMode }) {
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  const toggleSportMode = () => {
    setSportMode(prev => prev === 'soccer' ? 'baseball' : 'soccer');
  };

  return (
    <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1020, backgroundColor: 'transparent' }}>
      <style>
        {`
          .nav-link-custom {
            color: #212529;
            transition: all 0.3s ease;
          }
          .nav-link-custom:hover {
            color: ${sportMode === 'soccer' ? '#5C67F2' : '#E03131'} !important;
            transform: translateY(-2px);
          }
          .dropdown-menu-custom {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            padding: 1rem;
            min-width: 200px;
            animation: fadeIn 0.3s ease;
            margin-top: 0;
          }
          .dropdown-item-custom {
            padding: 0.7rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            color: #444;
            transition: all 0.2s;
          }
          .dropdown-item-custom:hover {
            background-color: ${sportMode === 'soccer' ? '#f0f4ff' : '#fff0f0'};
            color: ${sportMode === 'soccer' ? '#5C67F2' : '#E03131'};
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg navbar-light py-4">
        <div className="container-fluid px-5">
          <Link
            className="navbar-brand fs-3"
            to="/"
            style={{
                color: sportMode === 'soccer' ? '#5C67F2' : '#E03131',
                fontFamily: 'sans-serif',
                fontWeight: '800',
                transition: 'color 0.5s ease'
            }}
          >
            ALL-IN_SPORTS
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-4">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom fw-semibold" to="/">Home</Link>
              </li>

              {/* Teams Dropdown */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setIsTeamsOpen(true)}
                onMouseLeave={() => setIsTeamsOpen(false)}
                style={{ position: 'relative' }}
              >
                <Link
                    className={`nav-link nav-link-custom fw-semibold dropdown-toggle ${isTeamsOpen ? 'active' : ''}`}
                    to="#"
                    role="button"
                    aria-expanded={isTeamsOpen}
                >
                    Teams
                </Link>
                <ul className={`dropdown-menu dropdown-menu-custom ${isTeamsOpen ? 'show' : ''}`}
                    style={{ position: 'absolute', display: isTeamsOpen ? 'block' : 'none' }}>
                    <li><h6 className="dropdown-header text-uppercase fw-bold text-muted" style={{fontSize: '0.75rem'}}>K-League 1</h6></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/ulsan">🐯 Ulsan HD</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/jeonbuk">💚 Jeonbuk Motors</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/seoul">🔴 FC Seoul</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/pohang">⚫ Pohang Steelers</Link></li>
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li><Link className="dropdown-item dropdown-item-custom text-center fw-bold" style={{color: sportMode === 'soccer' ? '#5C67F2' : '#E03131'}} to="/teams">View All Teams &rarr;</Link></li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-link-custom fw-semibold" to="/calendar">Calender</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom fw-semibold" to="/community">Community</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom fw-semibold" to="/ticket">Ticket</Link>
              </li>

              {/* 스포츠 모드 토글 버튼 */}
              <li className="nav-item d-none d-lg-block">
                <button
                  className="btn rounded-pill px-4 fw-bold text-white"
                  onClick={toggleSportMode}
                  style={{
                    transition: 'all 0.3s ease',
                    width: '170px',
                    backgroundColor: sportMode === 'soccer' ? '#5C67F2' : '#E03131',
                    border: 'none',
                    boxShadow: `0 4px 15px ${sportMode === 'soccer' ? 'rgba(92, 103, 242, 0.4)' : 'rgba(224, 49, 49, 0.4)'}`
                  }}
                >
                  {sportMode === 'soccer' ? 'SOCCER ⚽' : 'BASEBALL ⚾'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

// --- 2. Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; 2025 All-In-Sports. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- 3. Page Components ---

// [LoginPage]
const LoginPage = ({ sportMode }) => {
  const navigate = useNavigate();

  // [수정됨] 백엔드 URL 설정 (안전한 방식)
  // Vite 환경에서는 import.meta.env.VITE_... 를 사용합니다.
  // 미리보기 환경 오류 방지를 위해 || 연산자로 localhost 기본값을 둡니다.
  const BACKEND_API_BASE_URL = 'http://localhost:8080';
  // 실제 코드에서는 아래 줄 주석을 해제하고 사용하세요:
  // const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL || 'http://localhost:8080';

  // 자체 로그인 핸들러
  const handleLogin = () => {
    localStorage.setItem('accessToken', 'mock-token-123');
    window.dispatchEvent(new Event('login-status-change'));
    navigate('/main');
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = (provider) => {
    // 백엔드 OAuth2 엔드포인트로 이동
    window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  // 테마 색상 결정
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="row g-0" style={{ minHeight: '100vh' }}>
        <div className="col-lg-6 d-flex flex-column justify-content-center px-5">
          <div className="ps-lg-5 ms-lg-5">
            <h1 className="display-3 fw-bold mb-4" style={{ color: themeColor, lineHeight: '1.2', transition: 'color 0.5s ease' }}>
              All Your Sports,<br />
              All In One Place
            </h1>
            <p className="text-muted fs-5 mb-0">Check Schedules, Book Tickets,</p>
            <p className="text-muted fs-5">And Join The Fan Community For KBO And K-League</p>
          </div>
        </div>

        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="card p-5 shadow-lg border-0 text-center"
               style={{
                 maxWidth: '400px',
                 width: '90%',
                 borderRadius: '1.5rem',
                 backgroundColor: 'rgba(255,255,255,0.95)'
               }}>
            <h2 className="mb-4 fw-bold text-dark">Sign In</h2>
            <div className="mb-3 text-start">
                <input type="text" className="form-control mb-3 p-3 bg-light border-0" placeholder="Enter ID" />
                <input type="password" className="form-control p-3 bg-light border-0" placeholder="Password" />
            </div>
            <button onClick={handleLogin} className="btn btn-primary w-100 py-3 fw-bold mb-3"
                    style={{
                        backgroundColor: themeColor,
                        border: 'none',
                        borderRadius: '0.5rem',
                        boxShadow: `0 4px 15px ${sportMode === 'soccer' ? 'rgba(92, 103, 242, 0.4)' : 'rgba(224, 49, 49, 0.4)'}`,
                        transition: 'background-color 0.5s ease, box-shadow 0.5s ease'
                    }}>
              Sign In
            </button>
            <button className="btn btn-outline-dark w-100 py-3 fw-bold mb-4" style={{borderRadius: '0.5rem'}}>
              Sign Up
            </button>
            <p className="text-muted small mb-2">Or continue with</p>

            <div className="d-flex flex-column gap-2">
                {/* Google Login Button */}
                <button onClick={() => handleSocialLogin('google')} className="btn btn-outline-secondary w-100 py-2 small d-flex align-items-center justify-content-center" style={{borderRadius: '0.5rem'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" className="me-2">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                    Sign in with Google
                </button>

                {/* Naver Login Button */}
                <button onClick={() => handleSocialLogin('naver')} className="btn btn-outline-success w-100 py-2 small d-flex align-items-center justify-content-center" style={{borderRadius: '0.5rem', borderColor: '#03C75A', color: '#03C75A'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="me-2">
                        <path fill="#03C75A" d="M16.5 24h-5.7l-6.6-9.6V24H0V0h5.7l6.6 9.6V0h4.2v24z"/>
                    </svg>
                    Sign in with Naver
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// [MainPage]
function MainPage({ sportMode }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ nickname: "TestUser", email: "test@example.com" });
    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState('news');

    const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

    // --- Mock Data ---
    const matchSchedule = [
        { id: 1, time: "01:30", home: "아스날", away: "토트넘", homeLogo: "🔴", awayLogo: "⚪" },
        { id: 2, time: "01:30", home: "프랑크", away: "우니온", homeLogo: "🦅", awayLogo: "🐻" },
        { id: 3, time: "04:30", home: "인터밀란", away: "AC밀란", homeLogo: "🔵", awayLogo: "🔴" },
        { id: 4, time: "05:00", home: "엘체", away: "레알마드", homeLogo: "🟢", awayLogo: "👑" },
    ];
    const popularPosts = [
        { id: 1, title: "진짜 역대급 미친 경기력ㄷㄷ... 어제 맨시티 경기 하이라이트", views: 100 },
        { id: 2, title: "아스날의 새로운 유니폼 디자인 보셨나요? 바코드 논란이네요", views: 100 },
        { id: 3, title: "여러분은 현재 첼시 포체티노 감독의 전술 운영에 만족하시나요?", views: 100 },
        { id: 4, title: "(속보) 음바페, 다음 이적 시장에서 사우디 알 힐랄과 접촉 중...", views: 100 },
        { id: 5, title: "제가 직관 가서 찍은 이강인 선수의 팬 서비스 사진입니다.", views: 100 },
    ];
    const newsData = [
        { id: 1, text: "새로운 이벤트 'All-in-One 페스티벌'이 시작되었습니다!", date: "2025-11-20" },
        { id: 2, text: "시스템 업데이트 공지: 2025년 12월 1일 새벽 2시", date: "2025-11-15" },
        { id: 3, text: "쪽지 3건이 도착했습니다.", date: "2025-11-10" },
    ];
    const messageData = [
        { id: 1, sender: "운영팀", text: "가입을 환영합니다! 이용 가이드 확인해주세요.", date: "2025-11-20" },
        { id: 2, sender: "김철수", text: "오늘 경기 같이 보러 가실래요?", date: "2025-11-18" },
    ];

    const panelContent = useMemo(() => {
        if (panelType === 'news') {
            return { title: "새 소식", Icon: Bell, list: newsData.map(d => ({ ...d, label: d.text, sub: d.date })) };
        }
        return { title: "쪽지함", Icon: MessageSquare, list: messageData.map(d => ({ ...d, label: d.sender, sub: d.text, date: d.date })) };
    }, [panelType]);

    const openPanel = (type) => { setPanelType(type); setShowPanel(true); };
    const closePanel = () => { setShowPanel(false); };
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event('login-status-change'));
        navigate('/login');
    };
    const handleAccountManage = () => navigate('/account');

    const styles = {
        glassCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(4px)',
        },
        profileAvatar: {
            width: '80px', height: '80px', borderRadius: '50%',
            background: `linear-gradient(45deg, ${themeColor}, #BCD9FF)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '2rem', marginBottom: '1rem',
            transition: 'background 0.5s ease'
        },
        actionButton: {
            border: 'none', background: 'transparent', padding: '10px 0',
            display: 'flex', alignItems: 'center', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: '600', color: '#333'
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="container" style={{ paddingTop: '150px', paddingBottom: '80px' }}>

                <div className="row align-items-center mb-5">
                    <div className="col-lg-7 d-flex flex-column justify-content-center mb-4 mb-lg-0">
                        <h1 className="display-3 fw-bold mb-4" style={{ color: themeColor, lineHeight: '1.2', transition: 'color 0.5s ease' }}>
                            All Your <br />
                            Sports, All In <br />
                            One Place
                        </h1>
                        <p className="text-muted fs-5 mb-0">Check Schedules, Book Tickets,</p>
                        <p className="text-muted fs-5">And Join The Fan Community For KBO And K-League</p>
                    </div>

                    <div className="col-lg-5">
                        <div className="card p-4 h-100" style={styles.glassCard}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold m-0">My Page</h4>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="로그아웃">
                                    <LogOut size={16} />
                                </button>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-4">
                                <div style={styles.profileAvatar}>
                                    {userInfo.nickname ? userInfo.nickname[0] : <User />}
                                </div>
                                <h5 className="fw-bold">{userInfo.nickname}</h5>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <div onClick={() => openPanel('news')} style={styles.actionButton}>
                                        <Bell className="me-2" size={20} style={{color: themeColor}}/> 새 소식 (3)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={() => openPanel('message')} style={styles.actionButton}>
                                        <MessageSquare className="me-2" size={20} style={{color: themeColor}}/> 쪽지 (5)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={handleAccountManage} style={styles.actionButton}>
                                        <Settings className="me-2" size={20} style={{color: themeColor}}/> 내 정보 관리
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div style={styles.actionButton}>
                                        <Users className="me-2" size={20} style={{color: themeColor}}/> 팀 팔로우
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-3 border-top">
                                <div style={styles.actionButton}>
                                    <HelpCircle className="me-2" size={20} /> 고객 센터
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 콘텐츠 섹션 */}
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="card p-4 border-0 shadow-sm" style={{ ...styles.glassCard, minHeight: '400px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                             <h4 className="fw-bold mb-4">경기일정</h4>
                             <div className="d-flex flex-column gap-3">
                                {matchSchedule.map((match) => (
                                    <div key={match.id} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                        <div className="d-flex align-items-center gap-2" style={{width: '35%'}}>
                                            <span className="fs-5">{match.homeLogo}</span>
                                            <span className="fw-semibold text-truncate">{match.home}</span>
                                        </div>
                                        <div className="text-center text-muted small" style={{width: '30%'}}>
                                            <span className="fw-bold text-dark">{match.time}</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end gap-2" style={{width: '35%'}}>
                                            <span className="fw-semibold text-truncate">{match.away}</span>
                                            <span className="fs-5">{match.awayLogo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card p-4 border-0 shadow-sm" style={{ ...styles.glassCard, minHeight: '400px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                            <h4 className="fw-bold mb-4">인기 게시글</h4>
                            <div className="d-flex flex-column gap-3">
                                {popularPosts.map((post, index) => (
                                    <div key={post.id} className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center text-truncate">
                                            <span className="fw-bold me-3 text-muted">{index + 1}.</span>
                                            <span className="text-truncate fw-medium">{post.title}</span>
                                        </div>
                                        <span className="text-muted small ms-2">{post.views}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div className={`position-fixed top-0 start-0 w-100 h-100 bg-dark ${showPanel ? 'visible' : 'invisible'}`} style={{ zIndex: 1050, opacity: showPanel ? 0.5 : 0, transition: 'opacity 0.3s' }} onClick={closePanel}></div>
            <div className="position-fixed top-0 h-100 bg-white shadow-lg p-4" style={{ width: 'min(100%, 400px)', right: showPanel ? '0' : '-100%', transition: 'right 0.3s cubic-bezier(0.25, 1, 0.5, 1)', zIndex: 1060, overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="m-0 fw-bold d-flex align-items-center" style={{ color: themeColor }}>
                        <panelContent.Icon size={24} className="me-2" />
                        {panelContent.title}
                    </h5>
                    <button className="btn btn-link p-0 text-dark" onClick={closePanel}><X size={24} /></button>
                </div>
                <div className="list-group list-group-flush">
                    {panelContent.list.map((item, index) => (
                        <div key={index} className="list-group-item border-0 p-3 rounded-3 mb-2 bg-light">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="fw-bold text-truncate">{item.label}</span>
                                <small className="text-muted">{item.date}</small>
                            </div>
                            {item.sub && <small className="text-muted">{item.sub}</small>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Other Pages
const JoinPage = () => <div className="p-5 text-center mt-5"><h2>회원가입 페이지</h2></div>;
const CookiePage = () => <div className="p-5 text-center mt-5"><h2>쿠키 정책 페이지</h2></div>;
const AccountPage = () => {
    const navigate = useNavigate();
    return (
        <div className="p-5 text-center mt-5">
            <h2>내 정보 관리</h2>
            <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/main')}>메인으로 돌아가기</button>
        </div>
    );
}

// --- 4. Main App Component ---
function App() {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [sportMode, setSportMode] = useState('soccer');

  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem('accessToken'));
    window.addEventListener('storage', checkToken);
    window.addEventListener('login-status-change', checkToken);
    return () => {
      window.removeEventListener('storage', checkToken);
      window.removeEventListener('login-status-change', checkToken);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>

      {/* [배경 애니메이션 레이어] */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#FFFFFF', zIndex: -3 }}></div>

      {/* 그라데이션 컨테이너 */}
      <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: token ? '100%' : '50%',
          transition: 'width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
          zIndex: -2
      }}>
          {/* Soccer 배경 */}
          <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, #FFFFFF 0%, #BCD9FF 100%)',
              opacity: sportMode === 'soccer' ? 1 : 0,
              transition: 'opacity 0.5s ease'
          }}></div>

          {/* Baseball 배경 */}
          <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, #FFFFFF 0%, #FFC2C2 100%)',
              opacity: sportMode === 'baseball' ? 1 : 0,
              transition: 'opacity 0.5s ease'
          }}></div>
      </div>

      {/* Header */}
      <Header sportMode={sportMode} setSportMode={setSportMode} />

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/main" replace /> : <LoginPage sportMode={sportMode} />} />
          <Route path="/login" element={<LoginPage sportMode={sportMode} />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/main" element={token ? <MainPage sportMode={sportMode} /> : <Navigate to="/login" replace />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/account" element={token ? <AccountPage /> : <Navigate to="/login" replace />} />
          <Route path="/user" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;