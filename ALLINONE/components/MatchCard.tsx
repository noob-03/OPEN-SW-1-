import React from 'react';
import { Link } from 'react-router-dom';
import { Match, MatchStatus, Team } from '../types';

interface MatchCardProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, homeTeam, awayTeam }) => {
  const getStatusBadge = () => {
    switch (match.status) {
      case MatchStatus.LIVE:
        return <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">LIVE</span>;
      case MatchStatus.FINISHED:
        return <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-full">종료</span>;
      default:
        return <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{new Date(match.startAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>;
    }
  };

  return (
    <Link to={`/matches/${match.id}`} className="block bg-secondary rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 relative">
      {getStatusBadge()}
      <div className="flex items-center justify-between">
        <div className="flex items-center w-2/5">
          <img src={homeTeam.logoUrl} alt={homeTeam.name} className="w-10 h-10 md:w-12 md:h-12 mr-3" />
          <span className="font-semibold text-sm md:text-base text-text-primary">{homeTeam.name}</span>
        </div>
        <div className="text-center">
            {match.status !== MatchStatus.SCHEDULED ? (
                <div className="text-2xl md:text-3xl font-bold text-white">
                    <span>{match.homeScore}</span> - <span>{match.awayScore}</span>
                </div>
            ) : (
                 <div className="text-lg font-bold text-highlight">VS</div>
            )}
        </div>
        <div className="flex items-center justify-end w-2/5">
          <span className="font-semibold text-sm md:text-base text-text-primary text-right">{awayTeam.name}</span>
          <img src={awayTeam.logoUrl} alt={awayTeam.name} className="w-10 h-10 md:w-12 md:h-12 ml-3" />
        </div>
      </div>
       <div className="text-center text-xs text-text-secondary mt-3">
            <span>{new Date(match.startAt).toLocaleDateString('ko-KR')} at {match.venue}</span>
        </div>
    </Link>
  );
};

export default MatchCard;