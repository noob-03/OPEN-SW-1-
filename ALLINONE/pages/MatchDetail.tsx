import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { matches, teams, leagues, matchEvents, players } from '../data/mock';
import { Match, Team, League, MatchEvent, MatchStatus, SportType } from '../types';

const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const matchId = Number(id);

  const [match, setMatch] = useState<Match | undefined>(matches.find(m => m.id === matchId));
  const [events, setEvents] = useState<MatchEvent[]>(matchEvents.filter(e => e.matchId === matchId));

  useEffect(() => {
    if (match?.status !== MatchStatus.LIVE) return;

    const interval = setInterval(() => {
      // Simulate a new event or score change
      setMatch(prevMatch => {
        if (!prevMatch) return undefined;
        const newScore = Math.random() > 0.5;
        if (!newScore) return prevMatch;

        const updatedMatch = { ...prevMatch };
        if (Math.random() > 0.5) {
          updatedMatch.homeScore++;
        } else {
          updatedMatch.awayScore++;
        }
        
        const eventType = match.leagueId === 1 ? '골' : '득점';
        const teamPlayers = players.filter(p => p.teamId === updatedMatch.homeTeamId || p.teamId === updatedMatch.awayTeamId);
        const randomPlayer = teamPlayers[Math.floor(Math.random() * teamPlayers.length)];

        const newEvent: MatchEvent = {
            id: Date.now(),
            matchId: updatedMatch.id,
            time: `${Math.floor(Math.random() * 90)}'`,
            type: eventType,
            playerName: randomPlayer.name
        };
        setEvents(prevEvents => [newEvent, ...prevEvents]);

        return updatedMatch;
      });
    }, 5000); // SSE simulation every 5 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.status, matchId]);
  

  if (!match) {
    return <div className="text-center text-xl text-text-secondary">경기를 찾을 수 없습니다.</div>;
  }

  const homeTeam = teams.find(t => t.id === match.homeTeamId) as Team;
  const awayTeam = teams.find(t => t.id === match.awayTeamId) as Team;
  const league = leagues.find(l => l.id === match.leagueId) as League;
  
  const getStatusDisplay = () => {
    switch(match.status) {
      case MatchStatus.LIVE: return <span className="text-red-500 font-bold animate-pulse">실시간</span>;
      case MatchStatus.FINISHED: return <span className="text-gray-400 font-bold">경기 종료</span>;
      case MatchStatus.SCHEDULED: return <span className="text-blue-400 font-bold">경기 예정</span>;
    }
  }

  const renderEventIcon = (type: string) => {
    if (league.sportType === SportType.SOCCER) return '⚽';
    if (league.sportType === SportType.BASEBALL) return '⚾';
    return '⭐';
  }

  return (
    <div className="bg-secondary shadow-xl rounded-lg p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-text-primary">{league.name}</h1>
        <p className="text-text-secondary">{new Date(match.startAt).toLocaleString('ko-KR')}</p>
        <p className="text-lg font-semibold">{match.venue}</p>
      </header>

      <div className="flex items-center justify-around mb-8">
        <div className="flex flex-col items-center w-1/3">
          <img src={homeTeam.logoUrl} alt={homeTeam.name} className="w-20 h-20 md:w-32 md:h-32 mb-4" />
          <h2 className="text-xl md:text-3xl font-bold text-center">{homeTeam.name}</h2>
        </div>
        <div className="text-center">
            <div className="text-5xl md:text-7xl font-mono font-extrabold text-highlight mb-2">
                <span>{match.homeScore}</span> - <span>{match.awayScore}</span>
            </div>
            <div className="text-lg">{getStatusDisplay()}</div>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <img src={awayTeam.logoUrl} alt={awayTeam.name} className="w-20 h-20 md:w-32 md:h-32 mb-4" />
          <h2 className="text-xl md:text-3xl font-bold text-center">{awayTeam.name}</h2>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">경기 이벤트</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {events.length > 0 ? events.sort((a,b) => b.id - a.id).map(event => (
                <div key={event.id} className="flex items-center bg-accent p-3 rounded-md">
                    <span className="text-2xl mr-4">{renderEventIcon(event.type)}</span>
                    <div className="flex-grow">
                        <p className="font-semibold text-text-primary">{event.type} - {event.playerName}</p>
                    </div>
                    <span className="font-mono text-text-secondary">{event.time}</span>
                </div>
            )) : <p className="text-text-secondary">아직 이벤트가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;