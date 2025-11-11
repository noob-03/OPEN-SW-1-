import React from 'react';
import { Link } from 'react-router-dom';
import MatchCard from '../components/MatchCard';
import { matches, teams, posts, users, leagues } from '../data/mock';
import { Post, User } from '../types';
import { useSport } from '../context/SportContext';

const PostCard: React.FC<{ post: Post, author: User | undefined }> = ({ post, author }) => (
    <div className="bg-secondary p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div>
            <Link to={`/community/${post.id}`} className="hover:underline">
                <h3 className="font-bold text-highlight truncate mb-2">{post.title}</h3>
            </Link>
            <p className="text-sm text-text-secondary h-10 overflow-hidden">{post.content.substring(0, 50)}...</p>
        </div>
        <div className="flex-grow"></div> {/* Spacer */}
        <div className="text-xs text-gray-400 mt-4 pt-2 border-t border-accent flex justify-between items-center">
             {author ? (
                <Link to={`/profile/${author.id}`} className="flex items-center hover:underline">
                    <img src={author.avatarUrl} alt={author.nickname} className="w-6 h-6 rounded-full mr-2" />
                    <span>{author.nickname}</span>
                </Link>
            ) : (
                <span>알 수 없음</span>
            )}
            <span>좋아요 {post.likes}</span>
        </div>
    </div>
);


const Home: React.FC = () => {
    const { sport } = useSport();
    
    const today = new Date().toDateString();
    
    const sportLeagues = leagues.filter(l => l.sportType === sport);
    const sportLeagueIds = sportLeagues.map(l => l.id);

    const todaysMatches = matches
        .filter(m => sportLeagueIds.includes(m.leagueId))
        .filter(m => new Date(m.startAt).toDateString() === today);
        
    const popularPosts = [...posts]
        .filter(p => p.sportType === sport)
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3);
  
    return (
    <div className="space-y-12">
        <div>
            <h1 className="text-3xl font-bold text-highlight mb-6">오늘의 경기</h1>
            {todaysMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {todaysMatches.map(match => {
                        const homeTeam = teams.find(t => t.id === match.homeTeamId);
                        const awayTeam = teams.find(t => t.id === match.awayTeamId);
                        if (!homeTeam || !awayTeam) return null;
                        return <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />;
                    })}
                </div>
            ) : (
                <p className="text-text-secondary">오늘 예정된 경기가 없습니다.</p>
            )}
        </div>

        <div>
            <h2 className="text-3xl font-bold text-highlight mb-6">인기 게시글</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {popularPosts.map(post => {
                     const author = users.find(u => u.id === post.userId);
                     return <PostCard key={post.id} post={post} author={author} />;
                 })}
            </div>
        </div>
    </div>
  );
};

export default Home;