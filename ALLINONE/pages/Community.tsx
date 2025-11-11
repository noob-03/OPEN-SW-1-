import React from 'react';
import { Link } from 'react-router-dom';
import { posts, users } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import { useSport } from '../context/SportContext';

const Community: React.FC = () => {
  const { user } = useAuth();
  const { sport } = useSport();

  const sortedPosts = [...posts]
    .filter(p => p.sportType === sport)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-highlight">커뮤니티</h1>
        {user && (
             <button className="bg-highlight hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition-colors">
                새 글 작성
             </button>
        )}
      </div>
      
      <div className="bg-secondary rounded-lg shadow-lg">
        <ul className="divide-y divide-accent">
          {sortedPosts.map(post => {
            const author = users.find(u => u.id === post.userId);
            return (
              <li key={post.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                      <Link to={`/community/${post.id}`}>
                        <h2 className="text-lg font-semibold text-text-primary hover:underline">{post.title}</h2>
                      </Link>
                      <p className="text-sm text-text-secondary mt-1 flex items-center">
                        {author ? (
                            <Link to={`/profile/${author.id}`} className="flex items-center hover:underline">
                                <img src={author.avatarUrl} alt={author.nickname} className="w-5 h-5 rounded-full mr-2" />
                                {author.nickname}
                            </Link>
                        ) : '알 수 없음'}
                         - <span className="ml-1">{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                      </p>
                  </div>
                  <div className="text-right text-sm text-text-secondary">
                      <p>좋아요 {post.likes}</p>
                      <p>댓글 {post.commentCount}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Community;