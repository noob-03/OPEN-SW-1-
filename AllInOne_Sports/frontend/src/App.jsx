import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"; // Navigate 추가
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// 페이지들 import
import LoginPage from './pages/LoginPage.jsx';
import CookiePage from "./pages/CookiePage.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import MainPage from "./pages/MainPage.jsx"; // 파일명 대소문자 확인 (MainPage.jsx)
import AccountPage from "./pages/AccountPage.jsx";

function App() {
  // 1. 토큰 확인 (로그인 했는지 체크)
  const token = localStorage.getItem('accessToken');

  return (
    <>
      <Header />

      <div className="main-content" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* 2. 기본 경로('/') 접속 시 규칙 */}
          {/* 로그인 상태라면 /main으로 리다이렉트 시키거나 MainPage를 보여줌 */}
          <Route
            path="/"
            element={token ? <Navigate to="/main" replace /> : <LoginPage />}
          />

          {/* 3. 일반 페이지 경로들 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/account" element={<AccountPage />} />

          {/* 4. [핵심 수정] /user로 들어오면 /main으로 강제 이동 (안전장치) */}
          <Route path="/user" element={<Navigate to="/main" replace />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;