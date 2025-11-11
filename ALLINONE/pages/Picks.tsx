import React from 'react';
import { matches, teams, picks, users, leagues } from '../data/mock';
import { MatchStatus, PickResult, SportType } from '../types';
import { useSport } from '../context/SportContext';

const Picks: React.FC = () => {
    const { sport } = useSport();

    const sportLeagues = leagues.filter(l => l.sportType === sport);
    const sportLeagueIds = sportLeagues.map(l => l.id);

    const upcomingMatches = matches.filter(m => 
        m.status === MatchStatus.SCHEDULED && sportLeagueIds.includes(m.leagueId)
    );

    const userScores = users.map(user => {
        const userPicks = picks.filter(p => {
            const match = matches.find(m => m.id === p.matchId);
            return p.userId === user.id && p.result !== PickResult.PENDING && match && sportLeagueIds.includes(match.leagueId);
        });
        const wins = userPicks.filter(p => p.result === PickResult.WIN).length;
        return { user, wins, total: userPicks.length };
    }).filter(score => score.total > 0)
      .sort((a,b) => b.wins - a.wins);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold text-highlight mb-6">승부 예측</h1>
        <div className="space-y-6">
          {upcomingMatches.length > 0 ? upcomingMatches.map(match => {
            const homeTeam = teams.find(t => t.id === match.homeTeamId);
            const awayTeam = teams.find(t => t.id === match.awayTeamId);
            if (!homeTeam || !awayTeam) return null;

            return (
              <div key={match.id} className="bg-secondary p-4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center w-2/5">
                        <img src={homeTeam.logoUrl} alt={homeTeam.name} className="w-8 h-8 mr-2" />
                        <span className="font-semibold">{homeTeam.name}</span>
                    </div>
                    <div className="text-sm text-text-secondary">vs</div>
                    <div className="flex items-center justify-end w-2/f">
                        <span className="font-semibold">{awayTeam.name}</span>
                        <img src={awayTeam.logoUrl} alt={awayTeam.name} className="w-8 h-8 ml-2" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors w-full">{homeTeam.shortName} 승</button>
                  {sport === SportType.SOCCER && <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors w-full">무승부</button>}
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors w-full">{awayTeam.shortName} 승</button>
                </div>
              </div>
            );
          }) : <p className="text-text-secondary">예정된 경기가 없습니다.</p>}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-highlight mb-6">순위표</h2>
        <div className="bg-secondary p-4 rounded-lg shadow-lg">
            <ol className="space-y-3">
                {userScores.map(({user, wins, total}, index) => (
                    <li key={user.id} className="flex items-center justify-between p-2 rounded bg-accent">
                        <div className="flex items-center">
                            <span className="font-bold text-lg mr-3 w-6 text-center">{index + 1}</span>
                            <img src={user.avatarUrl} alt={user.nickname} className="w-8 h-8 rounded-full mr-3"/>
                            <span className="font-medium">{user.nickname}</span>
                        </div>
                        <div className="text-sm font-semibold">
                            <span className="text-green-400">{wins}승</span> / <span className="text-text-secondary">{total}개</span>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
      </div>
    </div>
  );
};

export default Picks;