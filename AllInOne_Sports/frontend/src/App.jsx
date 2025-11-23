import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// 페이지들 import (모든 파일 확장자 명시)
import LoginPage from './pages/LoginPage.jsx';
import CookiePage from "./pages/CookiePage.jsx";
import JoinPage from "./pages/JoinPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import AccountPage from "./pages/AccountPage.jsx"; // ✅ AccountPage import 완료

function App() {
  // 1. 토큰 확인 (로그인 했는지 체크)
  const token = localStorage.getItem('accessToken');

  return (
    <>
      <Header />

      <div className="main-content" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* 2. [핵심] 기본 경로('/') 접속 시 규칙 */}
          {/* 토큰이 있으면 -> UserPage (로그인 된 화면) */}
          {/* 토큰이 없으면 -> LoginPage (로그인 안 된 화면) */}
          <Route
            path="/"
            element={token ? <UserPage /> : <LoginPage />}
          />

          {/* 3. 나머지 페이지 경로들 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/account" element={<AccountPage />} /> {/* ✅ AccountPage 라우트 등록 완료 */}
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;