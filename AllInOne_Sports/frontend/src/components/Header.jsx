import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1020, backgroundColor: 'transparent' }}>

      {/* [추가됨] 메뉴 호버 효과를 위한 CSS 스타일 */}
      <style>
        {`
          .nav-link-custom {
            color: #212529; /* 기본 검은색 (Bootstrap text-dark) */
            transition: all 0.3s ease; /* 부드러운 전환 효과 */
          }
          .nav-link-custom:hover {
            color: #5C67F2 !important; /* 호버 시 로고 색상과 동일한 보라색으로 변경 */
            transform: translateY(-2px); /* 살짝 위로 떠오르는 효과 (선택 사항) */
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light py-4">
        <div className="container-fluid px-5">

          {/* 로고 설정 유지 */}
          <Link
            className="navbar-brand fs-3"
            to="/"
            style={{
                color: '#5C67F2',
                fontFamily: 'sans-serif',
                fontWeight: '900'
            }}
          >
            ALL-IN_SPORTS
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-5">
              <li className="nav-item">
                {/* [수정됨] nav-link-custom 클래스 추가 및 text-dark 제거 (CSS에서 제어) */}
                <Link className="nav-link nav-link-custom fw-semibold" to="/main">Home</Link>
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

              {/* 버튼 */}
              <li className="nav-item d-none d-lg-block">
                <button className="btn btn-dark rounded-pill px-4 fw-bold">SOCCER ⚽</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;