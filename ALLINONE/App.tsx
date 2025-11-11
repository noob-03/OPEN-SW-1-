import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import MatchDetail from './pages/MatchDetail';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';
import Picks from './pages/Picks';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { SportProvider, useSport } from './context/SportContext';
import SportSelector from './pages/SportSelector';
import TicketTrade from './pages/TicketTrade';
import TicketTradeDetail from './pages/TicketTradeDetail';
import { ReportProvider } from './context/ReportContext';
import { NotificationProvider } from './context/NotificationContext';
import UserProfile from './pages/UserProfile';

const AppContent: React.FC = () => {
    const { sport } = useSport();

    if (!sport) {
        return <SportSelector />;
    }

    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/matches/:id" element={<MatchDetail />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/:id" element={<TeamDetail />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/community/:id" element={<PostDetail />} />
                    <Route path="/tickets" element={<TicketTrade />} />
                    <Route path="/tickets/:id" element={<TicketTradeDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                    
                    <Route path="/picks" element={
                    <ProtectedRoute>
                        <Picks />
                    </ProtectedRoute>
                    } />
                    <Route path="/mypage" element={
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <Admin />
                    </ProtectedRoute>
                    } />
                </Routes>
            </Layout>
        </HashRouter>
    );
};


const App: React.FC = () => {
  return (
    <SportProvider>
        <AuthProvider>
            <ReportProvider>
                <NotificationProvider>
                    <AppContent />
                </NotificationProvider>
            </ReportProvider>
        </AuthProvider>
    </SportProvider>
  );
};

export default App;