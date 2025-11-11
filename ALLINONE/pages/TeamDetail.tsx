import React from 'react';
import { useParams } from 'react-router-dom';
import { teams, players, leagues } from '../data/mock';
import { Player } from '../types';

const TeamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const teamId = Number(id);

  const team = teams.find(t => t.id === teamId);
  
  if (!team) {
    return <div className="text-center text-xl text-text-secondary">팀을 찾을 수 없습니다.</div>;
  }
  
  const league = leagues.find(l => l.id === team.leagueId);
  const teamPlayers = players.filter(p => p.teamId === teamId);

  return (
    <div className="bg-secondary shadow-xl rounded-lg p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-8">
        <img src={team.logoUrl} alt={team.name} className="w-32 h-32 md:w-48 md:h-48 mb-6 md:mb-0 md:mr-8 rounded-full bg-gray-200 p-2" />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">{team.name}</h1>
          <p className="text-xl text-highlight">{league?.name}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold border-b-2 border-highlight pb-2 mb-6">선수 명단</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-primary rounded-lg">
                <thead className="bg-accent">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">선수</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">포지션</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-accent">
                    {teamPlayers.map((player: Player) => (
                        <tr key={player.id} className="hover:bg-accent/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{player.number}</td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <img src={player.profileUrl} alt={player.name} className="w-10 h-10 rounded-full mr-4" />
                                <span className="font-medium text-text-primary">{player.name}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-text-primary">{player.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;