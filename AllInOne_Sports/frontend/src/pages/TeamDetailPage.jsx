
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_MATCHES } from '../constants';
import { ArrowLeft, Youtube, Instagram, Globe, Heart, Calendar, User } from 'lucide-react';

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { sport, user, toggleFollowTeam } = useContext(AppContext);
  
  const team = MOCK_TEAMS.find(t => t.Teamid === teamId) || MOCK_TEAMS[0];
  const isFollowed = user.teamILove.includes(team.Teamid);
  
  const [tab, setTab] = useState('SCHEDULE'); // SCHEDULE, ROSTER, RECORDS

  const bgGradient = sport === 'BASEBALL' 
    ? 'bg-gradient-to-r from-red-800 to-red-600' 
    : 'bg-gradient-to-r from-blue-800 to-blue-600';

  // 해당 팀의 경기 일정 필터링 (최신순 정렬)
  const teamMatches = MOCK_MATCHES.filter(m => m.home_team_id === teamId || m.away_team_id === teamId)
    .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

  // 해당 팀의 선수단 필터링
  const teamPlayers = MOCK_PLAYERS.filter(p => p.team_id === teamId);
  
  // 포지션별 그룹화
  const groupedPlayers = {
    '공격수': teamPlayers.filter(p => p.position === '공격수'),
    '미드필더': teamPlayers.filter(p => p.position === '미드필더'),
    '수비수': teamPlayers.filter(p => p.position === '수비수'),
    '골키퍼': teamPlayers.filter(p => p.position === '골키퍼'),
    '투수': teamPlayers.filter(p => p.position === '투수'),
    '내야수': teamPlayers.filter(p => p.position === '내야수'),
    '외야수': teamPlayers.filter(p => p.position === '외야수'),
  };

  const getTeamName = (id) => {
      const t = MOCK_TEAMS.find(tm => tm.Teamid === id);
      return t ? t.name : id;
  };
  
  const getTeamLogo = (id) => {
      const t = MOCK_TEAMS.find(tm => tm.Teamid === id);
      return t ? t.logo_url : '';
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden min-h-screen">
       {/* 팀 헤더 */}
       <div className={`${bgGradient} p-8 text-white relative overflow-hidden`}>
           <button onClick={() => navigate(-1)} className="flex items-center text-white/80 hover:text-white mb-6">
               <ArrowLeft size={20} className="mr-1" /> 목록으로
           </button>

           <div className="flex items-center relative z-10 gap-8">
               <div className="w-32 h-32 bg-white rounded-full p-4 shadow-lg flex items-center justify-center">
                   <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" />
               </div>
               <div>
                   <div className="flex items-center gap-3 mb-2">
                       <h1 className="text-4xl font-bold">{team.name}</h1>
                       <button onClick={() => toggleFollowTeam(team.Teamid)} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                           <Heart fill={isFollowed ? "white" : "none"} className={isFollowed ? "text-white" : "text-white/60"} />
                       </button>
                   </div>
                   <div className="flex gap-6 text-sm opacity-90">
                       <p>감독 <span className="font-bold">{team.coach}</span></p>
                       <p>구장 <span className="font-bold">{team.stadium}</span></p>
                   </div>
               </div>
           </div>

           {/* 스탯 리본 */}
           <div className="flex gap-8 mt-8 pt-6 border-t border-white/20">
               <div>
                   <p className="text-xs opacity-70 mb-1">순위</p>
                   <p className="text-2xl font-bold">{team.rank}</p>
               </div>
               <div>
                   <p className="text-xs opacity-70 mb-1">승</p>
                   <p className="text-2xl font-bold">{team.stats.w}</p>
               </div>
               <div>
                   <p className="text-xs opacity-70 mb-1">무</p>
                   <p className="text-2xl font-bold">{team.stats.d}</p>
               </div>
               <div>
                   <p className="text-xs opacity-70 mb-1">패</p>
                   <p className="text-2xl font-bold">{team.stats.l}</p>
               </div>
           </div>
       </div>

       {/* 탭 메뉴 */}
       <div className="flex border-b">
           {['SCHEDULE', 'ROSTER', 'RECORDS'].map((t) => (
               <button 
                 key={t}
                 onClick={() => setTab(t)}
                 className={`flex-1 py-4 text-center font-bold transition-colors ${tab === t ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
               >
                   {t === 'SCHEDULE' ? '일정/결과' : t === 'ROSTER' ? '선수단' : '시즌기록'}
               </button>
           ))}
       </div>

       {/* 탭 내용 */}
       <div className="p-8 bg-gray-50 min-h-[500px]">
           {/* 일정 탭 */}
           {tab === 'SCHEDULE' && (
               <div className="space-y-4 max-w-4xl mx-auto">
                   <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                       <Calendar className="text-blue-600"/> 2025 시즌 일정
                   </h3>
                   {teamMatches.length > 0 ? (
                       teamMatches.map(match => {
                           const isHome = match.home_team_id === teamId;
                           const opponentId = isHome ? match.away_team_id : match.home_team_id;
                           
                           return (
                               <div key={match.Gameid} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
                                   <div className="flex items-center gap-4 w-1/3">
                                       <div className="text-center min-w-[60px]">
                                           <div className="text-xs text-gray-500">{match.date_time.split(' ')[0]}</div>
                                           <div className="font-bold text-lg">{match.date_time.split(' ')[1]}</div>
                                       </div>
                                       <div className="text-xs text-gray-400 border-l pl-4">
                                           {match.stadium}
                                       </div>
                                   </div>

                                   <div className="flex-1 flex items-center justify-center gap-6">
                                       {/* 홈팀 */}
                                       <div className={`flex items-center gap-2 w-32 justify-end ${isHome ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                           <span>{getTeamName(match.home_team_id)}</span>
                                           <img src={getTeamLogo(match.home_team_id)} className="w-8 h-8 object-contain" alt=""/>
                                       </div>
                                       
                                       {/* 스코어 */}
                                       <div className="bg-gray-100 px-3 py-1 rounded font-bold text-lg min-w-[80px] text-center">
                                           {match.status === 'FINISHED' ? `${match.score.home} : ${match.score.away}` : 'VS'}
                                       </div>

                                       {/* 원정팀 */}
                                       <div className={`flex items-center gap-2 w-32 ${!isHome ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                           <img src={getTeamLogo(match.away_team_id)} className="w-8 h-8 object-contain" alt=""/>
                                           <span>{getTeamName(match.away_team_id)}</span>
                                       </div>
                                   </div>

                                   <div className="w-24 text-right">
                                       {match.status === 'FINISHED' ? (
                                           <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">종료</span>
                                       ) : (
                                           <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-bold">예정</span>
                                       )}
                                   </div>
                               </div>
                           );
                       })
                   ) : (
                       <div className="text-center text-gray-400 py-10">등록된 일정이 없습니다.</div>
                   )}
               </div>
           )}

           {/* 선수단 탭 */}
           {tab === 'ROSTER' && (
               <div className="max-w-5xl mx-auto">
                   {Object.entries(groupedPlayers).map(([pos, players]) => (
                       players.length > 0 && (
                           <div key={pos} className="mb-10">
                               <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2">
                                   <User size={20} /> {pos} <span className="text-sm font-normal text-gray-500 ml-1">{players.length}</span>
                               </h3>
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                   {players.map(player => (
                                       <div key={player.player_id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition group">
                                           <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                               <img src={player.player_url} alt={player.player_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                               <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">No.{player.player_number}</div>
                                           </div>
                                           <div className="p-4 text-center">
                                               <h4 className="font-bold text-gray-900">{player.player_name}</h4>
                                               <p className="text-xs text-gray-500 mt-1">{player.stats_summary}</p>
                                           </div>
                                       </div>
                                   ))}
                               </div>
                           </div>
                       )
                   ))}
                   {teamPlayers.length === 0 && (
                       <div className="text-center text-gray-400 py-20">선수 데이터가 준비 중입니다.</div>
                   )}
               </div>
           )}

           {/* 시즌 기록 탭 (Placeholder) */}
           {tab === 'RECORDS' && (
               <div className="text-center py-20 text-gray-400">
                   시즌 기록 데이터가 준비 중입니다.
               </div>
           )}

           {/* SNS 연계 링크 */}
           <div className="mt-12 pt-8 border-t">
               <h3 className="font-bold text-gray-800 mb-4">공식 채널 & SNS</h3>
               <div className="flex gap-4">
                   <a href={team.sns_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 border border-pink-200">
                       <Instagram size={20} /> <span>Instagram</span>
                   </a>
                   <a href={team.team_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 border border-gray-300">
                       <Globe size={20} /> <span>Official Site</span>
                   </a>
               </div>
           </div>
       </div>
    </div>
  );
};

export default TeamDetailPage;
