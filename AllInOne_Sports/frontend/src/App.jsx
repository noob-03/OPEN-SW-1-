import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Calendar, Users, Ticket, User, Bell, Menu, X, MessageCircle, Search, Phone } from 'lucide-react';
import './App.css';

// Pages - src/pages 경로의 파일들을 불러옵니다.
import LandingPage from './pages/LandingPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import TeamPage from './pages/TeamPage.jsx';
import TeamDetailPage from './pages/TeamDetailPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SupportPage from './pages/SupportPage.jsx';

import { MOCK_POSTS } from './constants';

// Context 생성
export const AppContext = createContext();

// 공통 레이아웃 컴포넌트
const Layout = ({ children }) => {
  const { sport, setSport, setIsLoggedIn, user } = useContext(AppContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBaseball = sport === 'BASEBALL';
  const primaryColor = isBaseball ? 'bg-red-700' : 'bg-blue-700';
  const textColor = isBaseball ? 'text-red-700' : 'text-blue-700';

  const navItems = [
    { name: '경기일정', path: '/calendar', icon: Calendar },
    { name: '티켓', path: '/tickets', icon: Ticket },
    { name: '커뮤니티', path: '/community', icon: Users },
    { name: '팀 정보', path: '/teams', icon: Search },
  ];

  // 최신 글 3개 (뉴스피드용)
  const newsFeed = MOCK_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className={`text-white shadow-md sticky top-0 z-50 ${primaryColor} transition-colors duration-500`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* 로고 및 종목 스위처 */}
            <div className="flex items-center space-x-4">
              <Link to="/home" className="text-2xl font-bold italic tracking-tighter">
                ALL-IN_<span className="text-yellow-400">SPORTS</span>
              </Link>
              <div className="hidden md:flex bg-black/20 rounded-full p-1">
                <button
                  onClick={() => setSport('SOCCER')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${sport === 'SOCCER' ? 'bg-white text-blue-700 shadow' : 'text-white/70 hover:text-white'}`}
                >
                  SOCCER
                </button>
                <button
                  onClick={() => setSport('BASEBALL')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${sport === 'BASEBALL' ? 'bg-white text-red-700 shadow' : 'text-white/70 hover:text-white'}`}
                >
                  BASEBALL
                </button>
              </div>
            </div>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 font-medium text-sm text-white/90 hover:text-white transition-colors ${location.pathname.startsWith(item.path) ? 'border-b-2 border-yellow-400 pb-0.5' : ''}`}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* 우측 메뉴 */}
            <div className="flex items-center space-x-4">
              <Link to="/messages" className="relative p-1 hover:bg-white/10 rounded-full">
                <MessageCircle size={20} />
                {/* 알림 뱃지 예시 */}
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-yellow-400 ring-2 ring-transparent" />
              </Link>
              <Link to="/profile" className="p-1 hover:bg-white/10 rounded-full">
                <User size={20} />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-1">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${primaryColor} border-t border-white/10`}>
             <div className="flex justify-center p-4 bg-black/10">
                <button onClick={() => setSport('SOCCER')} className={`mr-4 font-bold ${sport === 'SOCCER' ? 'text-white underline' : 'text-white/60'}`}>축구</button>
                <button onClick={() => setSport('BASEBALL')} className={`font-bold ${sport === 'BASEBALL' ? 'text-white underline' : 'text-white/60'}`}>야구</button>
             </div>
             <nav className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="flex items-center space-x-3 text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link to="/profile" className="flex items-center space-x-3 text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <User size={20} /> <span>내 정보</span>
              </Link>
              <Link to="/support" className="flex items-center space-x-3 text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <Phone size={20} /> <span>고객센터</span>
              </Link>
              <button onClick={() => setIsLoggedIn(false)} className="text-left text-white/70 mt-4 pt-4 border-t border-white/20">로그아웃</button>
             </nav>
          </div>
        )}
      </header>

      {/* 메인 콘텐츠 + 사이드바 */}
      <div className="flex-grow container mx-auto px-4 py-6 flex gap-6">
        <main className="flex-grow w-full md:w-3/4">
          {children}
        </main>

        {/* 우측 사이드바 (PC 전용) */}
        <aside className="hidden md:block w-1/4 space-y-6">
          {/* 미니 프로필 */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
             <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                   {user.nickname ? user.nickname[0] : <User />}
                </div>
                <div>
                   <p className="font-bold text-sm">{user.nickname || '게스트'}</p>
                   <p className="text-xs text-gray-500">팔로우 중인 팀: {user.teamILove.length}개</p>
                </div>
             </div>
             <div className="flex justify-between text-xs text-center border-t pt-3">
                <div className="flex-1 border-r">
                   <span className="block text-gray-500">새 소식</span>
                   <span className={`font-bold ${textColor}`}>3</span>
                </div>
                 <div className="flex-1">
                   <span className="block text-gray-500">쪽지</span>
                   <span className={`font-bold ${textColor}`}>2</span>
                </div>
             </div>
          </div>

          {/* 새 소식 (게시글 미리보기) */}
          <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-bold text-sm text-gray-700">최신 커뮤니티 글</h3>
              <Bell size={14} className="text-gray-400" />
            </div>
            <ul className="divide-y divide-gray-100">
              {newsFeed.map(post => (
                <li key={post.BoardPostid} className="p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">{post.title}</p>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>{post.user_nickname}</span>
                    <span>{post.created_at.slice(5)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-2 text-center border-t bg-gray-50">
              <Link to="/community" className="text-xs text-gray-500 hover:underline">더보기</Link>
            </div>
          </div>

           {/* 배너 */}
           <div className={`rounded-lg p-4 text-white text-center shadow-md cursor-pointer ${primaryColor}`}>
              <p className="text-sm font-medium opacity-90">티켓 양도 구하시나요?</p>
              <Link to="/tickets" className="font-bold text-lg mt-1 block">티켓 장터 바로가기 &rarr;</Link>
           </div>
        </aside>
      </div>
      
      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 All-In Sports. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
             <Link to="/support" className="hover:text-white">고객센터</Link>
             <span>|</span>
             <span className="hover:text-white cursor-pointer">이용약관</span>
             <span>|</span>
             <span className="hover:text-white cursor-pointer">개인정보처리방침</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const [sport, setSport] = useState('BASEBALL');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 사용자 상태 (DB 스키마 기반)
  const [user, setUser] = useState({
    ID: 'user1',
    nickname: '스포츠팬',
    email: 'user@example.com',
    roleType: 'USER',
    teamILove: ['t1'], // 팔로우한 팀 ID 목록
    sportILove: ['BASEBALL']
  });

  // 팀 팔로우/언팔로우 기능
  const toggleFollowTeam = (teamId) => {
    setUser(prev => {
      const isFollowing = prev.teamILove.includes(teamId);
      if (isFollowing) {
        return { ...prev, teamILove: prev.teamILove.filter(id => id !== teamId) };
      } else {
        return { ...prev, teamILove: [...prev.teamILove, teamId] };
      }
    });
  };

  return (
    <AppContext.Provider value={{ sport, setSport, isLoggedIn, setIsLoggedIn, user, setUser, toggleFollowTeam }}>
      <Router>
        <Routes>
          {/* 비로그인 시 LandingPage, 로그인 시 Home으로 리다이렉트 */}
          <Route path="/" element={!isLoggedIn ? <LandingPage /> : <Navigate to="/home" />} />
          <Route path="/join" element={<JoinPage />} />
          
          {/* 로그인 보호 라우트 */}
          <Route path="/home" element={isLoggedIn ? <Layout><CalendarPage /></Layout> : <Navigate to="/" />} />
          <Route path="/calendar" element={isLoggedIn ? <Layout><CalendarPage /></Layout> : <Navigate to="/" />} />
          <Route path="/community" element={isLoggedIn ? <Layout><CommunityPage /></Layout> : <Navigate to="/" />} />
          <Route path="/tickets" element={isLoggedIn ? <Layout><TicketPage /></Layout> : <Navigate to="/" />} />
          <Route path="/teams" element={isLoggedIn ? <Layout><TeamPage /></Layout> : <Navigate to="/" />} />
          <Route path="/teams/:teamId" element={isLoggedIn ? <Layout><TeamDetailPage /></Layout> : <Navigate to="/" />} />
          <Route path="/messages" element={isLoggedIn ? <Layout><MessagesPage /></Layout> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <Layout><ProfilePage /></Layout> : <Navigate to="/" />} />
          <Route path="/support" element={isLoggedIn ? <Layout><SupportPage /></Layout> : <Navigate to="/" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;