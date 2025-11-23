import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. 라우터 기능 가져오기
import { BrowserRouter } from 'react-router-dom';

// 2. 부트스트랩 설정 (유지)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // 3. 앱 전체를 감싸서 라우팅 기능 활성화
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
);