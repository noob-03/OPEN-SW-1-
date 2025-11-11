import React from 'react';
import { Link } from 'react-router-dom';
import { teams, leagues } from '../data/mock';
import { League } from '../types';
import { useSport } from '../context/SportContext';

const Teams: React.FC = () => {
  const { sport } = useSport();
  const sportLeagues = leagues.filter(l => l.sportType === sport);

  return (
    <div>
      <h1 className="text-3xl font-bold text-highlight mb-8">팀 목록</h1>
      {sportLeagues.map((league: League) => (
        <div key={league.id} className="mb-10">
          <h2 className="text-2xl font-semibold border-b-2 border-accent pb-2 mb-6">{league.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {teams
              .filter(team => team.leagueId === league.id)
              .map(team => (
                <Link to={`/teams/${team.id}`} key={team.id} className="group flex flex-col items-center p-4 bg-secondary rounded-lg text-center hover:bg-accent transition-colors">
                  <img src={team.logoUrl} alt={team.name} className="w-20 h-20 mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium text-text-primary">{team.name}</span>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teams;