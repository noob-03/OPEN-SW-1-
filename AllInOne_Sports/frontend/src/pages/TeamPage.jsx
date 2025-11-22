
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { MOCK_TEAMS } from '../constants';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const TeamPage = () => {
  const { sport, user, toggleFollowTeam } = useContext(AppContext);
  const [selectedLeague, setSelectedLeague] = useState(sport === 'BASEBALL' ? 'KBO' : 'K-League 1');

  // 종목이 변경되면 리그 선택 초기화
  useEffect(() => {
    if (sport === 'BASEBALL') {
      setSelectedLeague('KBO');
    } else {
      setSelectedLeague('K-League 1');
    }
  }, [sport]);

  const teams = MOCK_TEAMS.filter(t => t.league === selectedLeague);

  return (
    <div className="space-y-8">
       <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-gray-900">Team Information</h2>
           <p className="text-gray-500 mt-2">응원하는 구단을 팔로우하고 소식을 받아보세요.</p>
       </div>

       {/* 축구일 경우 리그 선택 탭 표시 */}
       {sport === 'SOCCER' && (
         <div className="flex justify-center mb-8">
           <div className="flex bg-gray-100 p-1 rounded-lg">
             <button
               onClick={() => setSelectedLeague('K-League 1')}
               className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${selectedLeague === 'K-League 1' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
             >
               K리그 1
             </button>
             <button
               onClick={() => setSelectedLeague('K-League 2')}
               className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${selectedLeague === 'K-League 2' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
             >
               K리그 2
             </button>
           </div>
         </div>
       )}

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {teams.map(team => {
               const isFollowed = user.teamILove.includes(team.Teamid);
               
               return (
                   <div key={team.Teamid} className="group bg-white rounded-xl shadow-sm hover:shadow-xl border transition-all duration-300 overflow-hidden flex flex-col items-center p-8 relative">
                       {/* 팔로우 버튼 */}
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           toggleFollowTeam(team.Teamid);
                         }}
                         className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition z-10"
                       >
                         <Heart 
                           size={24} 
                           fill={isFollowed ? "#ef4444" : "none"} 
                           className={isFollowed ? "text-red-500" : "text-gray-400"} 
                         />
                       </button>

                       <Link to={`/teams/${team.Teamid}`} className="flex flex-col items-center w-full">
                           <div className="w-24 h-24 mb-6 relative">
                               <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                           </div>
                           <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">{team.name}</h3>
                           <p className="text-sm text-gray-400 mt-1">{team.stadium}</p>
                           
                           <div className="mt-4 w-full bg-gray-50 rounded-lg py-2 flex justify-center gap-4 text-sm">
                               <div className="text-center">
                                   <span className="block text-gray-400 text-xs">순위</span>
                                   <span className="font-bold text-gray-800">{team.rank}위</span>
                               </div>
                               <div className="w-px bg-gray-200"></div>
                               <div className="text-center">
                                   <span className="block text-gray-400 text-xs">{sport === 'BASEBALL' ? '승률' : '승점'}</span>
                                   <span className="font-bold text-gray-800">{team.stats.rate}</span>
                               </div>
                           </div>
                       </Link>
                   </div>
               );
           })}
       </div>
    </div>
  );
};

export default TeamPage;
