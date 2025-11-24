import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// 페이지들 import
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CookiePage from './pages/CookiePage.jsx';

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
  }, []); // 이펙트는 이벤트 리스너 등록용으로 한 번만 실행되면 됩니다.

  const gradientSoccer = 'radial-gradient(circle at center, #FFFFFF 0%, #BCD9FF 100%)';
  const gradientBaseball = 'radial-gradient(circle at center, #FFFFFF 0%, #FFC2C2 100%)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>

      {/* [배경 레이어 그룹] */}
      <div style={{
          position: 'fixed', top: 0, right: 0, height: '100%',
          // [수정 1] token 상태에 따라 width가 변경되므로, token이 바뀔 때마다 리렌더링되어 애니메이션이 작동합니다.
          width: token ? '100%' : '50%',
          // [수정 2] 콤마(,) 추가: transition 속성 간 구분
          transition: 'width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.5s ease-in-out',
          zIndex: -2
      }}>
          {/* ... (내부 그라데이션 div들은 그대로 유지) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: gradientSoccer, opacity: sportMode === 'soccer' ? 1 : 0, transition: 'opacity 0.5s ease' }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: gradientBaseball, opacity: sportMode === 'baseball' ? 1 : 0, transition: 'opacity 0.5s ease' }}></div>
      </div>

      <Header sportMode={sportMode} setSportMode={setSportMode} />

      <div className="main-content" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/main" replace /> : <LoginPage sportMode={sportMode} />} />
          <Route path="/login" element={<LoginPage sportMode={sportMode} />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/main" element={token ? <MainPage sportMode={sportMode} /> : <Navigate to="/login" replace />} />
          <Route path="/account" element={token ? <AccountPage /> : <Navigate to="/login" replace />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/user" element={<Navigate to="/main" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;