import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // 드롭다운 상태 관리
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  return (
    <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1020, backgroundColor: 'transparent' }}>

      <style>
        {`
          .nav-link-custom {
            color: #212529;
            transition: all 0.3s ease;
          }
          .nav-link-custom:hover, .nav-link-custom.active {
            color: #5C67F2 !important;
            transform: translateY(-2px);
          }
          /* 드롭다운 메뉴 스타일 */
          .dropdown-menu-custom {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            padding: 1rem;
            min-width: 200px;
            animation: fadeIn 0.3s ease;
            margin-top: 0; /* 헤더와 떨어지지 않게 */
          }
          .dropdown-item-custom {
            padding: 0.7rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            color: #444;
            transition: all 0.2s;
          }
          .dropdown-item-custom:hover {
            background-color: #f0f4ff;
            color: #5C67F2;
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
                color: '#5C67F2',
                fontFamily: 'sans-serif',
                fontWeight: '800'
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
                <Link className="nav-link nav-link-custom fw-semibold" to="/main">Home</Link>
              </li>

              {/* [추가됨] Teams 드롭다운 메뉴 */}
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
                {/* 드롭다운 목록 */}
                <ul className={`dropdown-menu dropdown-menu-custom ${isTeamsOpen ? 'show' : ''}`}
                    style={{ position: 'absolute', display: isTeamsOpen ? 'block' : 'none' }}>
                    <li><h6 className="dropdown-header text-uppercase fw-bold text-muted" style={{fontSize: '0.75rem'}}>K-League 1</h6></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/ulsan">🐯 Ulsan HD</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/jeonbuk">💚 Jeonbuk Motors</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/seoul">🔴 FC Seoul</Link></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams/pohang">⚫ Pohang Steelers</Link></li>
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li><Link className="dropdown-item dropdown-item-custom text-center fw-bold" style={{color: '#5C67F2'}} to="/teams">View All Teams &rarr;</Link></li>
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