import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Bootstrap CSS 파일을 여기서 불러옵니다!
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. 부트스트랩 JS (캐러셀, 네비바 토글 등에 필요)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx';
import './index.css'; // (기존 CSS)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);