import React, { useContext } from 'react';
import { AppContext } from '../App';
import { MOCK_TEAMS } from '../constants';
import { User, Settings, LogOut, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, setIsLoggedIn } = useContext(AppContext);
  
  const myTeams = MOCK_TEAMS.filter(t => user.teamILove.includes(t.Teamid));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">마이 페이지</h2>

       <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
             <User size={48} />
          </div>
          <div>
             <h3 className="text-xl font-bold">{user.nickname}</h3>
             <p className="text-gray-500">{user.email}</p>
             <div className="mt-3 flex gap-2">
                 <span className="px-3 py-1 bg-gray-100 text-xs rounded-full font-bold text-gray-600">
                     {user.roleType === 'USER' ? '일반회원' : '관리자'}
                 </span>
             </div>
          </div>
       </div>

       {/* 팔로우한 팀 목록 */}
       <div className="bg-white p-6 rounded-xl shadow border">
           <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
               <Heart size={18} className="text-red-500" /> 팔로우한 팀
           </h3>
           {myTeams.length > 0 ? (
               <div className="grid grid-cols-3 gap-4">
                   {myTeams.map(team => (
                       <div key={team.Teamid} className="border rounded-lg p-3 flex flex-col items-center text-center hover:bg-gray-50">
                           <img src={team.logo_url} alt="" className="w-12 h-12 mb-2 object-contain"/>
                           <span className="font-bold text-sm">{team.name}</span>
                           <span className="text-xs text-gray-400">{team.league}</span>
                       </div>
                   ))}
               </div>
           ) : (
               <p className="text-gray-400 text-sm">팔로우한 팀이 없습니다.</p>
           )}
       </div>

       {/* 메뉴 목록 */}
       <div className="bg-white rounded-xl shadow border overflow-hidden divide-y">
           <Link to="/messages" className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between group">
               <span className="text-gray-700 font-medium">쪽지함</span>
               <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600" />
           </Link>
           <button className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between group">
               <span className="text-gray-700 font-medium">비밀번호 변경</span>
               <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600" />
           </button>
           <button className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between group">
               <span className="text-gray-700 font-medium">회원 탈퇴</span>
               <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600" />
           </button>
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full text-left p-4 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
           >
               <LogOut size={20} /> 로그아웃
           </button>
       </div>
    </div>
  );
};

export default ProfilePage;