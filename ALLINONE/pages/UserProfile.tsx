import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { users, posts, comments, teams } from '../data/mock';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const user = users.find(u => u.id === userId);

  if (!user) {
    return <div className="text-center text-xl text-text-secondary">사용자를 찾을 수 없습니다.</div>;
  }

  const userPosts = posts.filter(p => p.userId === userId);
  const userCommentsCount = comments.filter(c => c.userId === userId).length;
  const favoriteTeam = user.favoriteTeamId ? teams.find(t => t.id === user.favoriteTeamId) : null;

  return (
    <div className="bg-secondary shadow-xl rounded-lg p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <img src={user.avatarUrl} alt={user.nickname} className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8 border-4 border-highlight" />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-text-primary">{user.nickname}</h1>
          <p className="text-lg text-text-secondary">{user.email}</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4 text-text-primary">
            <span>게시글 <strong>{userPosts.length}</strong></span>
            <span>댓글 <strong>{userCommentsCount}</strong></span>
          </div>
        </div>
      </div>
      
      {favoriteTeam && (
          <div className="mb-8">
              <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">관심 팀</h2>
              <Link to={`/teams/${favoriteTeam.id}`} className="inline-flex items-center p-3 bg-accent rounded-lg hover:bg-highlight/20 transition-colors">
                  <img src={favoriteTeam.logoUrl} alt={favoriteTeam.name} className="w-12 h-12 mr-4" />
                  <span className="font-semibold text-lg text-text-primary">{favoriteTeam.name}</span>
              </Link>
          </div>
      )}

      <div>
        <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">작성한 게시글</h2>
        <ul className="space-y-4">
          {userPosts.length > 0 ? userPosts.map(post => (
            <li key={post.id} className="bg-accent p-4 rounded-lg hover:bg-accent/50 transition-colors">
                 <Link to={`/community/${post.id}`} className="block">
                  <h3 className="font-semibold text-text-primary truncate">{post.title}</h3>
                  <div className="text-xs text-gray-400 mt-2 flex justify-end gap-4">
                    <span>좋아요 {post.likes}</span>
                    <span>댓글 {post.commentCount}</span>
                  </div>
                </Link>
            </li>
          )) : <p className="text-text-secondary">작성한 게시글이 없습니다.</p>}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
