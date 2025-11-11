import React from 'react';
import { useAuth } from '../context/AuthContext';
// FIX: Imported `leagues` from mock data to resolve reference error.
import { posts, picks, matches, notifications as mockNotifications, leagues } from '../data/mock';
import { useSport } from '../context/SportContext';

const MyPage: React.FC = () => {
  const { user } = useAuth();
  const { sport } = useSport();
  
  if (!user) {
    return <div className="text-center text-xl text-text-secondary">로그인이 필요합니다.</div>;
  }

  const userPosts = posts.filter(p => p.userId === user.id && p.sportType === sport);
  const userPicks = picks.filter(p => {
    const match = matches.find(m => m.id === p.matchId);
    const league = match ? leagues.find(l => l.id === match.leagueId) : null;
    return p.userId === user.id && league && league.sportType === sport;
  });
  const userNotifications = mockNotifications.filter(n => n.userId === user.id);

  return (
    <div className="bg-secondary shadow-xl rounded-lg p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <img src={user.avatarUrl} alt={user.nickname} className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 border-4 border-highlight" />
        <div>
          <h1 className="text-4xl font-bold text-text-primary">{user.nickname}</h1>
          <p className="text-lg text-text-secondary">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">내 게시글</h2>
          <ul className="space-y-3">
            {userPosts.length > 0 ? userPosts.map(post => (
              <li key={post.id} className="bg-accent p-3 rounded-md">{post.title}</li>
            )) : <p className="text-text-secondary">작성한 게시글이 없습니다.</p>}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">나의 예측</h2>
          <ul className="space-y-3">
            {userPicks.length > 0 ? userPicks.map(pick => {
                const match = matches.find(m => m.id === pick.matchId);
                return <li key={pick.id} className="bg-accent p-3 rounded-md">경기 #{pick.matchId} 예측 - {pick.selection} ({pick.result})</li>
            }) : <p className="text-text-secondary">참여한 예측이 없습니다.</p>}
          </ul>
        </div>
        <div className="md:col-span-2">
            <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">알림</h2>
            <ul className="space-y-3">
            {userNotifications.length > 0 ? userNotifications.map(n => (
              <li key={n.id} className={`p-3 rounded-md ${n.read ? 'bg-accent' : 'bg-highlight/30'}`}>
                <strong>{n.type}:</strong> {n.payload.commenter}님이 게시글 '{n.payload.postTitle}'에 댓글을 남겼습니다.
              </li>
            )) : <p className="text-text-secondary">새 알림이 없습니다.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPage;