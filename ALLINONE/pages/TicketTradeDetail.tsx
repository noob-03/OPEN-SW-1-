import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ticketTradePosts, users, comments as mockComments, matches, teams } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import { Comment as CommentType, TicketTradePost, ReportStatus } from '../types';
import { useReports } from '../context/ReportContext';
import { useNotification } from '../context/NotificationContext';

const TicketTradeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { user } = useAuth();
  const { addReport } = useReports();
  const { showNotification } = useNotification();
  const [postData, setPostData] = useState<TicketTradePost | undefined>(ticketTradePosts.find(p => p.id === postId));
  const [comments, setComments] = useState<CommentType[]>(mockComments.filter(c => c.postId === postId));
  const [newComment, setNewComment] = useState('');
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  if (!postData) {
    return <div className="text-center text-xl text-text-secondary">게시글을 찾을 수 없습니다.</div>;
  }

  const author = users.find(u => u.id === postData.userId);
  const match = matches.find(m => m.id === postData.matchId);
  const homeTeam = teams.find(t => t.id === match?.homeTeamId);
  const awayTeam = teams.find(t => t.id === match?.awayTeamId);

  const handleLikePost = () => {
    if (!user) {
      showNotification('좋아요를 누르려면 로그인이 필요합니다.', 'error');
      return;
    }
    if (!postData) return;
    const newLikes = isPostLiked ? postData.likes - 1 : postData.likes + 1;
    setPostData({ ...postData, likes: newLikes });
    setIsPostLiked(!isPostLiked);
  };

  const handleReportPost = () => {
    if (!user) {
        showNotification("로그인이 필요합니다.", 'error');
        return;
    }
    if (window.confirm('이 게시글을 신고하시겠습니까?')) {
      addReport({
        reporterId: user.id,
        targetType: 'TICKET_TRADE_POST',
        targetId: postId,
        reason: '사용자 신고',
        status: ReportStatus.PENDING,
      });
      showNotification('신고가 접수되었습니다. 관리자가 검토 후 조치하겠습니다.', 'success');
    }
  };

  const handleLikeComment = (commentId: number) => {
    if (!user) {
      showNotification('좋아요를 누르려면 로그인이 필요합니다.', 'error');
      return;
    }
    const isLiked = likedComments.has(commentId);
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, likes: isLiked ? (c.likes || 0) - 1 : (c.likes || 0) + 1 } : c
    ));
    const newLikedComments = new Set(likedComments);
      if (isLiked) {
          newLikedComments.delete(commentId);
      } else {
          newLikedComments.add(commentId);
      }
    setLikedComments(newLikedComments);
  };

  const handleReportComment = (commentId: number) => {
    if (!user) {
        showNotification("로그인이 필요합니다.", 'error');
        return;
    }
    if (window.confirm('이 댓글을 신고하시겠습니까?')) {
        addReport({
            reporterId: user.id,
            targetType: 'COMMENT',
            targetId: commentId,
            reason: '사용자 신고',
            status: ReportStatus.PENDING,
        });
        showNotification('신고가 접수되었습니다. 관리자가 검토 후 조치하겠습니다.', 'success');
    }
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    const submittedComment: CommentType = {
      id: Date.now(),
      postId: postId,
      userId: user.id,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    
    setComments(prev => [submittedComment, ...prev]);
    setNewComment('');
  };

  return (
    <div className="bg-secondary shadow-xl rounded-lg p-4 md:p-8">
      <header className="border-b-2 border-accent pb-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${postData.status === 'AVAILABLE' ? 'bg-blue-200 text-blue-800' : 'bg-gray-300 text-gray-800'}`}>
                {postData.status === 'AVAILABLE' ? '판매중' : '판매완료'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">{postData.title}</h1>
        </div>
        <div className="flex items-center text-text-secondary mt-2">
          {author && <Link to={`/profile/${author.id}`}><img src={author.avatarUrl} alt={author.nickname} className="w-8 h-8 rounded-full mr-3" /></Link>}
          <span>작성자: {author ? <Link to={`/profile/${author.id}`} className="hover:underline">{author.nickname}</Link> : '알 수 없음'} / 작성일: {new Date(postData.createdAt).toLocaleString('ko-KR')}</span>
        </div>
      </header>

      <div className="mb-8 p-4 border border-accent rounded-lg">
        <h3 className="text-xl font-bold text-highlight mb-2">거래 정보</h3>
        {match && homeTeam && awayTeam && (
            <p className="text-text-primary"><strong className="w-20 inline-block">경기:</strong> {homeTeam.name} vs {awayTeam.name} ({new Date(match.startAt).toLocaleString('ko-KR')})</p>
        )}
        <p className="text-text-primary mt-1"><strong className="w-20 inline-block">가격:</strong> <span className="font-bold text-xl">{postData.price.toLocaleString('ko-KR')}원</span></p>
      </div>
      
      <div className="prose max-w-none text-text-primary mb-8">
        <p>{postData.content}</p>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <button onClick={handleLikePost} className={`flex items-center space-x-2 ${isPostLiked ? 'text-highlight' : 'text-text-secondary'} hover:text-highlight transition-colors`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isPostLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span>좋아요 {postData.likes}</span>
        </button>
        <button onClick={handleReportPost} className="flex items-center space-x-2 text-text-secondary hover:text-red-500 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>신고</span>
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold border-b-2 border-highlight pb-2 mb-4">댓글 ({comments.length})</h2>
        
        {user && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성하세요..."
              className="w-full bg-primary border border-accent rounded-md p-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight"
              rows={3}
            />
            <button type="submit" className="mt-2 bg-highlight hover:bg-teal-500 text-white font-bold py-2 px-4 rounded transition-colors">
              댓글 등록
            </button>
          </form>
        )}
        
        <div className="space-y-4">
          {comments.map(comment => {
            const commentAuthor = users.find(u => u.id === comment.userId);
            const isCommentLiked = likedComments.has(comment.id);
            return (
              <div key={comment.id} className="bg-accent p-4 rounded-lg">
                <div className="flex items-start">
                    {commentAuthor ? <Link to={`/profile/${commentAuthor.id}`}><img src={commentAuthor.avatarUrl} alt={commentAuthor.nickname} className="w-10 h-10 rounded-full mr-4" /></Link> : <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>}
                    <div className="flex-grow">
                      <p className="font-semibold text-text-primary">{commentAuthor ? <Link to={`/profile/${commentAuthor.id}`} className="hover:underline">{commentAuthor.nickname}</Link> : '알 수 없음'} <span className="text-xs text-text-secondary ml-2">{new Date(comment.createdAt).toLocaleString('ko-KR')}</span></p>
                      <p className="text-text-primary mt-1">{comment.content}</p>
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-4 mt-2 text-xs">
                    <button onClick={() => handleLikeComment(comment.id)} className={`flex items-center space-x-1 hover:text-highlight ${isCommentLiked ? 'text-highlight' : 'text-text-secondary'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isCommentLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        <span>{comment.likes}</span>
                    </button>
                    <button onClick={() => handleReportComment(comment.id)} className="flex items-center space-x-1 text-text-secondary hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>신고</span>
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TicketTradeDetail;