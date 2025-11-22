import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { MOCK_POSTS } from '../constants';
import { MessageSquare, Users, Ticket, ThumbsUp, Eye, Search } from 'lucide-react';

const CommunityPage = () => {
  const { sport } = useContext(AppContext);
  // post_type: 'GENERAL', 'TICKET_TRANSFER', 'COMPANION', 'NOTICE'
  const [activeTab, setActiveTab] = useState('GENERAL');
  
  const filteredPosts = MOCK_POSTS.filter(p => {
      if (activeTab === 'GENERAL') return p.post_type === 'GENERAL' || p.post_type === 'NOTICE';
      return p.post_type === activeTab;
  });

  // 공지사항 분리
  const notices = MOCK_POSTS.filter(p => p.post_type === 'NOTICE');
  const regularPosts = filteredPosts.filter(p => p.post_type !== 'NOTICE');

  const primaryColor = sport === 'BASEBALL' ? 'bg-red-600' : 'bg-blue-600';
  const textPrimary = sport === 'BASEBALL' ? 'text-red-600' : 'text-blue-600';

  return (
    <div className="bg-white rounded-xl shadow border min-h-[600px]">
      {/* 헤더 및 탭 */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
           <Users className={textPrimary} /> 
           {sport === 'BASEBALL' ? '야구' : '축구'} 커뮤니티
        </h2>
        
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          {[
            { id: 'GENERAL', label: '통합 게시판' },
            { id: 'TICKET_TRANSFER', label: '티켓 양도' },
            { id: 'COMPANION', label: '동행 구하기' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
        <div className="flex gap-2">
           <button className="px-3 py-1 bg-white border rounded text-sm font-medium text-gray-600 hover:border-gray-400">최신순</button>
           <button className="px-3 py-1 bg-white border rounded text-sm font-medium text-gray-600 hover:border-gray-400">인기순</button>
        </div>
        <div className="relative">
           <input type="text" placeholder="제목, 작성자 검색" className="pl-8 pr-3 py-1.5 border rounded text-sm w-64 focus:outline-none focus:border-gray-400" />
           <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="divide-y">
        {/* 공지사항 (통합 탭에서만 노출) */}
        {activeTab === 'GENERAL' && notices.map(post => (
           <div key={post.BoardPostid} className="p-4 bg-gray-50 flex items-center hover:bg-gray-100 transition cursor-pointer">
              <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">공지</span>
              <div className="flex-1">
                 <h3 className="font-bold text-gray-800">{post.title}</h3>
              </div>
              <span className="text-xs text-gray-400">{post.created_at}</span>
           </div>
        ))}

        {regularPosts.length > 0 ? (
            regularPosts.map(post => (
                <div key={post.BoardPostid} className="p-4 hover:bg-gray-50 transition cursor-pointer flex gap-4 items-start">
                    {/* 아이콘 */}
                    <div className={`p-3 rounded-full bg-opacity-10 flex-shrink-0 ${sport === 'BASEBALL' ? 'bg-red-500 text-red-500' : 'bg-blue-500 text-blue-500'}`}>
                        {activeTab === 'TICKET_TRANSFER' ? <Ticket size={20}/> : activeTab === 'COMPANION' ? <Users size={20}/> : <MessageSquare size={20}/>}
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-medium text-lg text-gray-900 mb-1 group-hover:underline">
                                {post.title}
                                {/* 상태 뱃지 */}
                                {post.status && (
                                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${post.status === 'TRADING' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                        {post.status === 'TRADING' ? '거래중' : '완료'}
                                    </span>
                                )}
                            </h3>
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                            {post.content}
                        </div>

                        <div className="flex items-center text-xs text-gray-400 gap-3">
                            <span className="font-medium text-gray-600">{post.user_nickname}</span>
                            <span>{post.created_at}</span>
                            <div className="flex-grow"></div>
                            <span className="flex items-center gap-1"><Eye size={12}/> {post.view_count}</span>
                            <span className="flex items-center gap-1 text-red-400"><ThumbsUp size={12}/> {post.like_count_post}</span>
                            <span className="flex items-center gap-1 text-blue-400"><MessageSquare size={12}/> {post.comment_count}</span>
                            <button className="ml-2 border px-2 py-0.5 rounded hover:bg-gray-100">쪽지 보내기</button>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="p-12 text-center text-gray-400">
                게시글이 없습니다.
            </div>
        )}
      </div>
      
      <div className="p-4 flex justify-end">
        <button className={`${primaryColor} text-white px-6 py-2 rounded-lg font-bold shadow hover:opacity-90`}>글쓰기</button>
      </div>
    </div>
  );
};

export default CommunityPage;