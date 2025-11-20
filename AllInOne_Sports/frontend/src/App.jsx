import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import CookiePage from "./pages/CookiePage";
import JoinPage from "./pages/JoinPage";
import UserPage from "./pages/UserPage"

function App() {
  return (
    // [수정] BrowserRouter가 전체 애플리케이션을 감싸도록 최상단에 배치
    <BrowserRouter> 
      {/* 1. Header는 이제 absolute position으로 페이지 위에 떠있게 됩니다. */}
      <Header />

      {/* 2. Routes 내부에서 경로에 따라 페이지를 렌더링합니다. */}
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/cookie" element={<CookiePage />} />
      </Routes>

      {/* 3. Footer는 라우터 내부에 위치합니다. */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;