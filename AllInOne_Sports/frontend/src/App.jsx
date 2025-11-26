import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CookiePage from './pages/CookiePage.jsx';
import MessagePage from './pages/MessagePage.jsx';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/message";

  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [sportMode, setSportMode] = useState('soccer');

  // 🔥 라우트 주소에 따라 width 변경
  const targetWidth =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/join"
      ? "50%"
      : "100%";

  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem('accessToken'));
    window.addEventListener('storage', checkToken);
    window.addEventListener('login-status-change', checkToken);
    return () => {
      window.removeEventListener('storage', checkToken);
      window.removeEventListener('login-status-change', checkToken);
    };
  }, []);

  const gradientSoccer =
    'radial-gradient(circle at center, #FFFFFF 0%, #BCD9FF 100%)';
  const gradientBaseball =
    'radial-gradient(circle at center, #FFFFFF 0%, #FFC2C2 100%)';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >

      {/* 배경 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: targetWidth,           // 🔥 라우트별 width 적용
          transition:
            'width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.5s ease-in-out',
          zIndex: -2
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: gradientSoccer,
            opacity: sportMode === 'soccer' ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: gradientBaseball,
            opacity: sportMode === 'baseball' ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        ></div>
      </div>

      {/* 메시지 페이지에서는 Header 숨김 */}
      {!hideHeader && (
        <Header sportMode={sportMode} setSportMode={setSportMode} />
      )}

      <div className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/main" replace />
              ) : (
                <LoginPage sportMode={sportMode} />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPage sportMode={sportMode} />}
          />
          <Route path="/join" element={<JoinPage />} />
          <Route
            path="/main"
            element={
              token ? (
                <MainPage sportMode={sportMode} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/account"
            element={
              token ? (
                <AccountPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/message"
            element={
              token ? (
                <MessagePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/cookie" element={<CookiePage />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
