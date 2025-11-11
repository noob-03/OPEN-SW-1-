import React, { useState, useMemo } from 'react';
import MatchCard from '../components/MatchCard';
import { matches, teams, leagues } from '../data/mock';
import { League } from '../types';
import { useSport } from '../context/SportContext';

const Matches: React.FC = () => {
  const { sport } = useSport();
  const [selectedLeague, setSelectedLeague] = useState<number | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const sportLeagues = useMemo(() => leagues.filter(l => l.sportType === sport), [sport]);

  const filteredMatches = useMemo(() => {
    const sportLeagueIds = sportLeagues.map(l => l.id);
    return matches
      .filter(match => sportLeagueIds.includes(match.leagueId))
      .filter(match => selectedLeague === 'all' || match.leagueId === selectedLeague)
      .filter(match => {
        if (!selectedDate) return true;
        const matchDate = new Date(match.startAt);
        matchDate.setHours(0, 0, 0, 0);
        const filterDate = new Date(selectedDate);
        filterDate.setHours(0, 0, 0, 0);
        filterDate.setTime(filterDate.getTime() + filterDate.getTimezoneOffset() * 60 * 1000);
        return matchDate.getTime() === filterDate.getTime();
      })
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [selectedLeague, selectedDate, sportLeagues]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-highlight mb-6">경기 일정</h1>
      
      <div className="bg-secondary p-4 rounded-lg mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-auto">
          <label htmlFor="league-filter" className="block text-sm font-medium text-text-secondary mb-1">리그</label>
          <select
            id="league-filter"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full bg-accent border border-accent text-text-primary rounded-md shadow-sm p-2 focus:outline-none focus:ring-highlight focus:border-highlight"
          >
            <option value="all">모든 리그</option>
            {sportLeagues.map((league: League) => (
              <option key={league.id} value={league.id}>{league.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label htmlFor="date-filter" className="block text-sm font-medium text-text-secondary mb-1">날짜</label>
          <input
            type="date"
            id="date-filter"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-accent border border-accent text-text-primary rounded-md shadow-sm p-2 focus:outline-none focus:ring-highlight focus:border-highlight"
          />
        </div>
        <button 
            onClick={() => {setSelectedLeague('all'); setSelectedDate('')}}
            className="w-full md:w-auto mt-2 md:mt-6 bg-highlight hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition-colors"
        >
            필터 초기화
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => {
            const homeTeam = teams.find(t => t.id === match.homeTeamId);
            const awayTeam = teams.find(t => t.id === match.awayTeamId);
            if (!homeTeam || !awayTeam) return null;
            return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
          })
        ) : (
          <p className="text-text-secondary col-span-full text-center">선택한 조건에 맞는 경기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Matches;