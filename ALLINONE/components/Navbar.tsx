import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSport } from '../context/SportContext';
import { UserRole } from '../types';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-highlight text-white'
                    : 'text-text-secondary hover:bg-accent hover:text-white'
                }`
            }
        >
            {children}
        </NavLink>
    );
};


const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { clearSport } = useSport();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <nav className="bg-secondary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-highlight text-xl font-bold">
                Sportify
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/matches">경기</NavItem>
                <NavItem to="/teams">팀</NavItem>
                <NavItem to="/community">커뮤니티</NavItem>
                <NavItem to="/tickets">티켓 거래</NavItem>
                <NavItem to="/picks">승부예측</NavItem>
              </div>
            </div>
          </div>
          <div className="flex items-center">
             <button onClick={clearSport} className="text-text-secondary hover:text-white text-sm font-medium mr-4">
                스포츠 변경
             </button>
            {user ? (
                <div className="flex items-center space-x-4">
                    {user.role === UserRole.ADMIN && <NavItem to="/admin">관리자</NavItem>}
                    <NavItem to="/mypage">
                        <div className="flex items-center">
                            <img src={user.avatarUrl} alt={user.nickname} className="w-8 h-8 rounded-full mr-2" />
                            {user.nickname}
                        </div>
                    </NavItem>
                    <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                        로그아웃
                    </button>
                </div>
            ) : (
                <NavItem to="/login">로그인</NavItem>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;