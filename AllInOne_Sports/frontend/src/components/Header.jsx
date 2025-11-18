import React from 'react';

function Header() {
  return (
    <header>
      {/* 1. bg-light, shadow-sm 제거
        2. transparent-navbar 클래스 추가
      */}
      <nav className="navbar navbar-expand-lg transparent-navbar py-4">
        <div className="container-fluid px-5"> {/* 좌우 여백을 위해 container-fluid와 px-5 사용 */ }

          <a className="navbar-brand logo-font" href="/">ALL-IN_SPORTS</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link menu-font" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link menu-font" href="/calender">Calender</a></li>
              <li className="nav-item"><a className="nav-link menu-font" href="/community">Community</a></li>
              <li className="nav-item"><a className="nav-link menu-font" href="/ticket">Ticket</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;