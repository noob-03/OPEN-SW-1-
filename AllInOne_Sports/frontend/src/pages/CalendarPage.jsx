import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { MOCK_MATCHES, MOCK_TEAMS } from '../constants';
import { ChevronLeft, ChevronRight, Tv, Star } from 'lucide-react';

// 날짜 유틸리티
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const startOfWeek = (date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day;
  result.setDate(diff);
  return result;
};

const format = (date, formatStr) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = date.getDay();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  if (formatStr === 'yyyy년 MM월') return `${year}년 ${month}월`;
  if (formatStr === 'EEE') return dayNames[dayOfWeek];
  if (formatStr === 'd') return String(date.getDate());
  if (formatStr === 'yyyy-MM-dd') return `${year}-${month}-${day}`;
  return date.toDateString();
};

const CalendarPage = () => {
  const { sport, user } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date('2025-05-20'));
  const [filterMyTeam, setFilterMyTeam] = useState(false); // 내 팀 필터
  const [selectedLeague, setSelectedLeague] = useState(sport === 'BASEBALL' ? 'KBO' : 'K-League 1');

  // 종목이 바뀌면 리그 필터 초기화
  useEffect(() => {
    if (sport === 'BASEBALL') {
      setSelectedLeague('KBO');
    } else {
      setSelectedLeague('K-League 1');
    }
  }, [sport]);

  const startDate = startOfWeek(currentDate); 
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const getTeam = (id) => MOCK_TEAMS.find(t => t.Teamid === id) || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">경기 일정</h2>
          
          {/* 축구일 경우 리그 선택 탭 표시 */}
          {sport === 'SOCCER' && (
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedLeague('K-League 1')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${selectedLeague === 'K-League 1' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                K리그 1
              </button>
              <button
                onClick={() => setSelectedLeague('K-League 2')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${selectedLeague === 'K-League 2' ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:text-gray-700'}`}
              >
                K리그 2
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {/* 필터 토글 */}
          <button 
            onClick={() => setFilterMyTeam(!filterMyTeam)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-medium transition text-sm whitespace-nowrap ${filterMyTeam ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-white hover:bg-gray-50'}`}
          >
            <Star size={16} fill={filterMyTeam ? "currentColor" : "none"} />
            {sport === 'BASEBALL' ? '내 팔로우 팀' : '팔로우 팀'}
          </button>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border">
            <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={20} /></button>
            <span className="text-lg font-bold min-w-[120px] text-center">
              {format(currentDate, 'yyyy년 MM월')}
            </span>
            <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      {/* 주간 일정 그리드 */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* 헤더 (요일) */}
        <div className="grid grid-cols-7 border-b bg-gray-50">
          {weekDays.map((day, idx) => (
             <div key={idx} className={`text-center py-3 font-medium ${day.getDay() === 0 ? 'text-red-500' : day.getDay() === 6 ? 'text-blue-500' : 'text-gray-600'}`}>
                {format(day, 'EEE')} <br/>
                <span className="text-xl font-bold">{format(day, 'd')}</span>
             </div>
          ))}
        </div>

        {/* 바디 (경기) */}
        <div className="grid grid-cols-7 min-h-[400px] divide-x">
           {weekDays.map((day, idx) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              // 해당 날짜의 경기 필터링
              let dayMatches = MOCK_MATCHES.filter(m => {
                // 1. 날짜 일치 여부
                if (!m.date_time.startsWith(dateStr)) return false;
                
                const homeTeam = getTeam(m.home_team_id);
                
                // 2. 리그 필터 (KBO, K-League 1, K-League 2)
                if (homeTeam.league !== selectedLeague) return false;

                return true;
              });

              // 내 팀 필터 적용
              if (filterMyTeam) {
                dayMatches = dayMatches.filter(m => 
                  user.teamILove.includes(m.home_team_id) || user.teamILove.includes(m.away_team_id)
                );
              }

              return (
                 <div key={idx} className="p-2 space-y-2 relative">
                    {dayMatches.length === 0 ? (
                       <div className="text-center text-gray-300 text-xs mt-10">경기 없음</div>
                    ) : (
                       dayMatches.map(match => {
                          const home = getTeam(match.home_team_id);
                          const away = getTeam(match.away_team_id);
                          
                          return (
                             <div key={match.Gameid} className="bg-white border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex justify-between items-center mb-2">
                                   <span className="text-xs font-bold bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{match.date_time.split(' ')[1]}</span>
                                   <span className="text-[10px] text-gray-400 truncate max-w-[60px]">{match.stadium}</span>
                                </div>
                                <div className="flex justify-between items-center space-x-1">
                                   <div className="text-center flex-1">
                                      <img src={away.logo_url} alt={away.name} className="w-8 h-8 mx-auto mb-1 object-contain" />
                                      <p className="text-[10px] font-bold truncate">{away.name}</p>
                                   </div>
                                   <div className="text-center flex flex-col">
                                      {match.status === 'FINISHED' ? (
                                        <div className="text-xs font-bold text-gray-800 bg-gray-100 px-1 rounded">
                                          {match.score.away} : {match.score.home}
                                        </div>
                                      ) : (
                                        <span className="font-bold text-gray-400 text-xs">VS</span>
                                      )}
                                   </div>
                                   <div className="text-center flex-1">
                                      <img src={home.logo_url} alt={home.name} className="w-8 h-8 mx-auto mb-1 object-contain" />
                                      <p className="text-[10px] font-bold truncate">{home.name}</p>
                                   </div>
                                </div>
                                {match.status === 'LIVE' && (
                                   <div className="mt-2 text-center bg-red-500 text-white text-xs rounded py-0.5 font-bold animate-pulse">LIVE</div>
                                )}
                                {match.broadcaster && (
                                  <div className="hidden group-hover:flex mt-2 justify-center items-center text-[10px] text-blue-600 gap-1">
                                      <Tv size={10} /> <span>{match.broadcaster}</span>
                                  </div>
                                )}
                             </div>
                          );
                       })
                    )}
                 </div>
              );
           })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;