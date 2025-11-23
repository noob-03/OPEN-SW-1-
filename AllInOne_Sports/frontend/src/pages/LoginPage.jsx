import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ sportMode }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('accessToken', 'mock-token-123');
    window.dispatchEvent(new Event('login-status-change'));
    navigate('/main');
  };

  // 테마 색상 결정
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  return (
    <div className="container-fluid p-0" style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="row g-0" style={{ minHeight: '100vh' }}>

        {/* 왼쪽 텍스트 영역 */}
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

        {/* 오른쪽 로그인 카드 영역 */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="card p-5 shadow-lg border-0 text-center"
               style={{ maxWidth: '400px', width: '90%', borderRadius: '1.5rem', backgroundColor: 'rgba(255,255,255,0.95)' }}>
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
                <button className="btn btn-outline-secondary w-100 py-2 small">G Sign in with Google</button>
                <button className="btn btn-outline-success w-100 py-2 small">N Sign in with Naver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;