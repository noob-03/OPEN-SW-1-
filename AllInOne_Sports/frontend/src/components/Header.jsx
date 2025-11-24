import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ sportMode, setSportMode }) {
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);

  const toggleSportMode = () => {
    setSportMode(prev => prev === 'soccer' ? 'baseball' : 'soccer');
  };

  // 모드에 따른 색상 설정
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';
  const hoverBgColor = sportMode === 'soccer' ? '#f0f4ff' : '#fff0f0';

  return (
    <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1020, backgroundColor: 'transparent' }}>

      {/* 동적 스타일링을 위한 내부 style 태그 */}
      <style>
        {`
          .nav-link-custom { color: #212529; transition: all 0.3s ease; }
          .nav-link-custom:hover { color: ${themeColor} !important; transform: translateY(-2px); }

          .dropdown-menu-custom {
            border: none; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            padding: 1rem; min-width: 200px; animation: fadeIn 0.3s ease; margin-top: 0;
          }
          .dropdown-item-custom {
            padding: 0.7rem 1rem; border-radius: 0.5rem; font-weight: 500; color: #444; transition: all 0.2s;
          }
          .dropdown-item-custom:hover {
            background-color: ${hoverBgColor}; color: ${themeColor};
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light py-4">
        <div className="container-fluid px-5">

          <Link className="navbar-brand fs-3" to="/"
            style={{ color: themeColor, fontFamily: 'sans-serif', fontWeight: '800', transition: 'color 0.5s ease' }}>
            ALL-IN_SPORTS
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-4">
              <li className="nav-item"><Link className="nav-link nav-link-custom fw-semibold" to="/">Home</Link></li>

              {/* Teams 드롭다운 */}
              <li className="nav-item dropdown"
                onMouseEnter={() => setIsTeamsOpen(true)}
                onMouseLeave={() => setIsTeamsOpen(false)}
                style={{ position: 'relative' }}
              >
                <Link className={`nav-link nav-link-custom fw-semibold dropdown-toggle ${isTeamsOpen ? 'active' : ''}`} to="#">Teams</Link>
                <ul className={`dropdown-menu dropdown-menu-custom ${isTeamsOpen ? 'show' : ''}`}
                    style={{ position: 'absolute', display: isTeamsOpen ? 'block' : 'none' }}>
                    <li><h6 className="dropdown-header text-uppercase fw-bold text-muted" style={{fontSize: '0.75rem'}}>Leagues</h6></li>
                    <li><Link className="dropdown-item dropdown-item-custom" to="/teams">View All Teams &rarr;</Link></li>
                </ul>
              </li>

              <li className="nav-item"><Link className="nav-link nav-link-custom fw-semibold" to="/calendar">Calender</Link></li>
              <li className="nav-item"><Link className="nav-link nav-link-custom fw-semibold" to="/community">Community</Link></li>
              <li className="nav-item"><Link className="nav-link nav-link-custom fw-semibold" to="/ticket">Ticket</Link></li>

              {/* 스포츠 모드 전환 버튼 */}
              <li className="nav-item d-none d-lg-block">
                <button
                  className="btn rounded-pill px-4 fw-bold text-white"
                  onClick={toggleSportMode}
                  style={{
                    transition: 'all 0.3s ease',
                    width: '170px',
                    backgroundColor: themeColor,
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

export default Header;