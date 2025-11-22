import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { TICKET_VENDORS, MOCK_MATCHES, MOCK_TEAMS } from '../constants';
import { ExternalLink, Filter } from 'lucide-react';

const TicketPage = () => {
  const { sport } = useContext(AppContext);
  const [selectedLeague, setSelectedLeague] = useState(sport === 'BASEBALL' ? 'KBO' : 'K-League 1');

  // 종목이 변경되면 리그 선택 초기화
  useEffect(() => {
    if (sport === 'BASEBALL') {
      setSelectedLeague('KBO');
    } else {
      setSelectedLeague('K-League 1');
    }
  }, [sport]);
  
  // 현재 선택된 리그의 팀만 필터링
  const teams = MOCK_TEAMS.filter(t => t.league === selectedLeague);

  const getTeam = (id) => MOCK_TEAMS.find(t => t.Teamid === id) || {};

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-gray-800">티켓 예매처 모아보기</h2>

       {/* 필터 영역 */}
       <div className="bg-white p-4 rounded-xl shadow border mb-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
             <div className="flex items-center gap-2 text-gray-700 font-bold">
               <Filter size={18} /> <span>상세 조건</span>
             </div>

             {/* 축구일 경우 리그 선택 탭 표시 */}
             {sport === 'SOCCER' && (
               <div className="flex bg-gray-100 p-1 rounded-lg">
                 <button
                   onClick={() => setSelectedLeague('K-League 1')}
                   className={`px-4 py-1 text-xs font-bold rounded-md transition-all ${selectedLeague === 'K-League 1' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   K리그 1
                 </button>
                 <button
                   onClick={() => setSelectedLeague('K-League 2')}
                   className={`px-4 py-1 text-xs font-bold rounded-md transition-all ${selectedLeague === 'K-League 2' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   K리그 2
                 </button>
               </div>
             )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 text-sm">
             {/* 구단 선택 */}
             <div className="font-bold text-gray-600 md:text-right pt-1">구단 선택</div>
             <div className="flex flex-wrap gap-x-4 gap-y-2">
                {teams.map(t => (
                    <label key={t.Teamid} className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                        <input type="checkbox" className="rounded text-blue-600"/> <span>{t.name}</span>
                    </label>
                ))}
             </div>
             
              {/* 예매처 */}
             <div className="font-bold text-gray-600 md:text-right pt-1">예매처</div>
             <div className="flex flex-wrap gap-4">
                {TICKET_VENDORS.map(v => (
                    <label key={v.name} className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                        <input type="checkbox" className="rounded text-blue-600"/> <span>{v.name}</span>
                    </label>
                ))}
             </div>
          </div>
       </div>

       {/* 예매 가능 경기 목록 */}
       <div className="bg-white rounded-xl shadow border overflow-hidden">
           <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <span className="font-bold text-gray-700">
                {selectedLeague === 'KBO' ? '예매 가능한 경기' : `${selectedLeague} 예매 가능한 경기`}
              </span>
           </div>

           <div className="divide-y">
              {MOCK_MATCHES.map(match => {
                 const home = getTeam(match.home_team_id);
                 const away = getTeam(match.away_team_id);
                 
                 // 현재 선택된 리그의 경기가 아니면 패스
                 if (home.league !== selectedLeague) return null;

                 // 완료된 경기는 제외하고 예정된 경기만 보여줄지 여부는 기획에 따름. 
                 // 여기서는 모든 경기를 보여주되 상태만 표시함.

                 return (
                    <div key={match.Gameid} className="p-5 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50 transition">
                       {/* 날짜 */}
                       <div className="flex flex-col items-center min-w-[80px] bg-gray-100 rounded p-2">
                          <span className="text-xs text-gray-500">{match.date_time.split(' ')[0]}</span>
                          <span className="font-bold text-lg text-gray-800">{match.date_time.split(' ')[1]}</span>
                       </div>

                       {/* 대진 정보 */}
                       <div className="flex-1 flex items-center justify-center md:justify-start gap-8">
                          <div className="flex items-center gap-3 w-32 justify-end">
                             <span className="font-bold text-gray-800">{away.name}</span>
                             <img src={away.logo_url} alt="" className="w-10 h-10 rounded-full border bg-white object-contain" />
                          </div>
                          <div className="font-black text-xl text-gray-300">VS</div>
                           <div className="flex items-center gap-3 w-32">
                             <img src={home.logo_url} alt="" className="w-10 h-10 rounded-full border bg-white object-contain" />
                             <span className="font-bold text-gray-800">{home.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 ml-4 border-l pl-4 hidden md:block">
                             <p>{match.stadium}</p>
                             <p className={match.status === 'LIVE' ? 'text-red-500 font-bold' : ''}>
                               {match.status === 'LIVE' ? '경기중' : match.status === 'FINISHED' ? '종료됨' : '예매오픈'}
                             </p>
                          </div>
                       </div>

                       {/* 예매 버튼 */}
                       <div className="flex flex-col gap-2 w-full md:w-auto">
                           {TICKET_VENDORS.slice(0,2).map((vendor, idx) => (
                               <a key={idx} href={vendor.url} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 px-4 py-2 border rounded-lg hover:border-blue-500 hover:text-blue-600 group transition bg-white">
                                   <div className="flex items-center gap-2">
                                       <img src={vendor.logo} alt="" className="w-5 h-5 object-contain"/>
                                       <span className="text-sm font-medium">{vendor.name} 바로가기</span>
                                   </div>
                                   <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                               </a>
                           ))}
                       </div>
                    </div>
                 )
              })}
              
              {/* 해당 리그에 경기가 없을 경우 메시지 */}
              {MOCK_MATCHES.filter(m => getTeam(m.home_team_id).league === selectedLeague).length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                      해당 리그의 경기 일정이 없습니다.
                  </div>
              )}
           </div>
       </div>
    </div>
  );
};

export default TicketPage;