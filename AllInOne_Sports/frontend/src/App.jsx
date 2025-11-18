import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      {/* 1. Header는 이제 absolute position으로 페이지 위에 떠있게 됩니다. (index.css 설정 덕분) */}
      <Header />

      {/* 2. HomePage가 화면 최상단부터 시작됩니다. */}
      <main>
        <HomePage />
      </main>

      {/* 3. Footer는 HomePage 아래에 위치합니다. */}
      <Footer />
    </>
  );
}

export default App;