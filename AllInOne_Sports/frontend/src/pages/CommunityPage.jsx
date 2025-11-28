import React, { useState, useMemo, useRef } from 'react';
import { Search, Filter, MessageSquare, Heart, Eye, Megaphone, Ticket, Users, User, CheckCircle, ArrowLeft, Paperclip, Send, ThumbsUp, Image as ImageIcon, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COMMUNITY_POSTS, MOCK_TEAMS } from '../../constants';

function CommunityPage({ sportMode }) {
  const navigate = useNavigate();
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';
  
  // --- 상태 관리 ---
  const [viewMode, setViewMode] = useState('list'); // 'list', 'write', 'detail'
  const [posts, setPosts] = useState(MOCK_COMMUNITY_POSTS); // 로컬 상태로 데이터 관리 (글쓰기 반영 위해)
  const [selectedPost, setSelectedPost] = useState(null); // 상세 볼 글

  // 필터 상태 (List Mode)
  const [activeTab, setActiveTab] = useState('free'); 
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedLeague, setSelectedLeague] = useState('K1');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [showSellingOnly, setShowSellingOnly] = useState(false);

  // 글쓰기 폼 상태 (Write Mode)
  const [writeForm, setWriteForm] = useState({
    type: 'free', // free, ticket, companion
    title: '',
    content: '',
    teamId: '',
    price: '',
    file: null
  });
  const fileInputRef = useRef(null);

  // 댓글 입력 상태 (Detail Mode)
  const [commentInput, setCommentInput] = useState('');

  // --- Helper Functions ---
  const getTeamName = (id) => {
    const team = MOCK_TEAMS.find(t => t.id === id);
    return team ? team.name : '알 수 없음';
  };

  const dropdownTeams = useMemo(() => {
    if (sportMode === 'baseball') {
        return MOCK_TEAMS.filter(t => t.sport === 'baseball');
    }
    return MOCK_TEAMS.filter(t => t.league === selectedLeague);
  }, [sportMode, selectedLeague]);

  // --- Handlers ---

  // 1. 글쓰기 관련
  const handleWriteClick = () => {
    setWriteForm({ type: activeTab === 'notice' ? 'free' : activeTab, title: '', content: '', teamId: '', price: '', file: null });
    setViewMode('write');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setWriteForm({ ...writeForm, file: e.target.files[0] });
    }
  };

  const handleSubmitPost = () => {
    if (!writeForm.title.trim() || !writeForm.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    if (writeForm.type === 'ticket' && (!writeForm.teamId || !writeForm.price)) {
        alert('티켓 양도 시 구단과 가격은 필수입니다.');
        return;
    }

    const newPost = {
      id: Date.now(), // 임시 ID
      type: writeForm.type,
      title: writeForm.title,
      author: '나(User)', // 로그인 연동 시 실제 유저명
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      views: 0,
      likes: 0,
      comments: 0,
      content: writeForm.content,
      commentsList: [],
      // 티켓 전용
      teamId: writeForm.teamId,
      price: Number(writeForm.price),
      status: 'selling',
      isPinned: false,
      hasFile: !!writeForm.file
    };

    setPosts([newPost, ...posts]);
    setViewMode('list');
    alert('게시글이 등록되었습니다.');
  };

  // 2. 상세 보기 관련
  const handlePostClick = (post) => {
    // 조회수 증가 시뮬레이션
    const updatedPosts = posts.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p);
    setPosts(updatedPosts);
    setSelectedPost({ ...post, views: post.views + 1 }); // 업데이트된 상태로 설정
    setViewMode('detail');
  };

  const handleLikePost = () => {
    if (!selectedPost) return;
    // 좋아요 토글 시뮬레이션 (여기선 단순 증가만)
    const updatedPost = { ...selectedPost, likes: selectedPost.likes + 1 };
    setSelectedPost(updatedPost);
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  // 3. 댓글 관련
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      author: '나(User)',
      text: commentInput,
      date: '방금 전',
      likes: 0
    };

    const updatedPost = {
      ...selectedPost,
      commentsList: [...(selectedPost.commentsList || []), newComment],
      comments: (selectedPost.comments || 0) + 1
    };

    setSelectedPost(updatedPost);
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setCommentInput('');
  };

  const handleLikeComment = (commentId) => {
    const updatedCommentsList = selectedPost.commentsList.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    const updatedPost = { ...selectedPost, commentsList: updatedCommentsList };
    setSelectedPost(updatedPost);
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  // 4. 쪽지 보내기 핸들러
  const handleSendMessage = (author) => {
    if (author === '나(User)') {
        alert('자신에게는 쪽지를 보낼 수 없습니다.');
        return;
    }
    // 실제 구현 시: 채팅방 생성 API 호출 후 채팅방 ID와 함께 이동
    // 여기서는 단순히 메시지 페이지로 이동
    if (window.confirm(`${author}님에게 쪽지를 보내시겠습니까?`)) {
        navigate('/message'); 
    }
  };


  // --- Filtering Logic (List Mode) ---
  const getFilteredPosts = () => {
    let filtered = posts;

    // 탭 필터
    if (activeTab !== 'all') { // 'all' 탭이 없다면 notice 제외한 탭별 필터링
        filtered = filtered.filter(post => post.type === activeTab || (activeTab === 'free' && post.type === 'notice'));
    }

    // 검색
    if (searchText) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchText.toLowerCase()) || 
        post.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 티켓 필터
    if (activeTab === 'ticket') {
      if (selectedTeam !== 'all') {
        filtered = filtered.filter(post => post.teamId === selectedTeam);
      } else if (sportMode === 'soccer') {
        const leagueTeamIds = MOCK_TEAMS.filter(t => t.league === selectedLeague).map(t => t.id);
        filtered = filtered.filter(post => leagueTeamIds.includes(post.teamId));
      }
      if (showSellingOnly) {
        filtered = filtered.filter(post => post.status === 'selling');
      }
    }

    // 정렬
    filtered.sort((a, b) => {
      // 공지사항 최우선
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'comments') return (b.comments || 0) - (a.comments || 0);
      return b.date.localeCompare(a.date);
    });

    return filtered;
  };

  const displayedPosts = getFilteredPosts();


  // --- RENDERERS ---

  // 1. 글쓰기 화면
  if (viewMode === 'write') {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <button onClick={() => setViewMode('list')} className="btn btn-light rounded-circle p-2">
            <ArrowLeft />
          </button>
          <h2 className="fw-bold m-0">게시글 작성</h2>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          {/* 게시판 선택 */}
          <div className="mb-4">
            <label className="form-label fw-bold">게시판 선택</label>
            <div className="d-flex gap-2">
              {['free', 'ticket', 'companion'].map(type => (
                <button
                  key={type}
                  className={`btn ${writeForm.type === type ? 'btn-dark' : 'btn-outline-secondary'} flex-grow-1`}
                  onClick={() => setWriteForm({ ...writeForm, type })}
                >
                  {type === 'free' ? '통합 게시판' : type === 'ticket' ? '티켓 양도' : '동행 구하기'}
                </button>
              ))}
            </div>
          </div>

          {/* 티켓 정보 (티켓 선택 시에만 표시) */}
          {writeForm.type === 'ticket' && (
            <div className="row g-3 mb-4 p-3 bg-light rounded-3">
              <div className="col-md-6">
                <label className="form-label fw-bold small">구단 선택</label>
                <select 
                  className="form-select"
                  value={writeForm.teamId}
                  onChange={(e) => setWriteForm({ ...writeForm, teamId: e.target.value })}
                >
                  <option value="">구단을 선택하세요</option>
                  {MOCK_TEAMS.filter(t => sportMode === 'baseball' ? t.sport === 'baseball' : t.sport === 'soccer').map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold small">판매 가격</label>
                <div className="input-group">
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="가격 입력"
                    value={writeForm.price}
                    onChange={(e) => setWriteForm({ ...writeForm, price: e.target.value })}
                  />
                  <span className="input-group-text">원</span>
                </div>
              </div>
            </div>
          )}

          {/* 제목 */}
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control form-control-lg border-0 border-bottom rounded-0 px-0" 
              placeholder="제목을 입력하세요"
              value={writeForm.title}
              onChange={(e) => setWriteForm({ ...writeForm, title: e.target.value })}
              style={{ boxShadow: 'none' }}
            />
          </div>

          {/* 파일 첨부 */}
          <div className="mb-3">
            <button 
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                onClick={() => fileInputRef.current.click()}
            >
                <ImageIcon size={16}/> {writeForm.file ? writeForm.file.name : '사진/파일 첨부'}
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                onChange={handleFileChange}
                accept="image/*"
            />
          </div>

          {/* 내용 */}
          <div className="mb-4">
            <textarea 
              className="form-control border-0 px-0" 
              rows="10" 
              placeholder="내용을 입력하세요. (경기 직관 후기, 티켓 양도 상세 내용 등)"
              value={writeForm.content}
              onChange={(e) => setWriteForm({ ...writeForm, content: e.target.value })}
              style={{ boxShadow: 'none', resize: 'none' }}
            ></textarea>
          </div>

          {/* 버튼 */}
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-light px-4" onClick={() => setViewMode('list')}>취소</button>
            <button 
                className="btn text-white px-4 fw-bold" 
                style={{ backgroundColor: themeColor }}
                onClick={handleSubmitPost}
            >
                등록 완료
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. 상세 보기 화면
  if (viewMode === 'detail' && selectedPost) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <button onClick={() => setViewMode('list')} className="btn btn-light rounded-circle p-2">
            <ArrowLeft />
          </button>
          <span className="text-muted">{selectedPost.type === 'ticket' ? '티켓 양도' : selectedPost.type === 'companion' ? '동행 구하기' : '통합 게시판'}</span>
        </div>

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
          <div className="card-body p-4 p-lg-5">
            {/* 헤더 */}
            <div className="mb-4 pb-4 border-bottom">
                <h2 className="fw-bold mb-3">{selectedPost.title}</h2>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style={{width: '40px', height: '40px'}}>
                            <User size={20}/>
                        </div>
                        <div>
                            <div className="fw-bold text-dark d-flex align-items-center gap-2">
                                {selectedPost.author}
                                {/* 쪽지 보내기 버튼 추가 */}
                                <button 
                                    className="btn btn-sm btn-light border rounded-circle p-1" 
                                    title="쪽지 보내기"
                                    onClick={() => handleSendMessage(selectedPost.author)}
                                >
                                    <Mail size={14} />
                                </button>
                            </div>
                            <div className="small text-muted">{selectedPost.date} · 조회 {selectedPost.views}</div>
                        </div>
                    </div>
                    {/* 티켓 정보 표시 */}
                    {selectedPost.type === 'ticket' && (
                        <div className="text-end">
                            <span className={`badge mb-1 ${selectedPost.status === 'selling' ? 'bg-success' : 'bg-secondary'}`}>
                                {selectedPost.status === 'selling' ? '판매중' : '판매완료'}
                            </span>
                            <div className="fw-bold text-primary fs-5">
                                {selectedPost.price?.toLocaleString()}원
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 본문 */}
            <div className="mb-5" style={{ minHeight: '200px', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {selectedPost.content}
            </div>

            {/* 좋아요 버튼 */}
            <div className="text-center mb-5">
                <button 
                    className="btn btn-outline-danger rounded-pill px-4 py-2 d-flex align-items-center gap-2 mx-auto hover-scale"
                    onClick={handleLikePost}
                >
                    <Heart className={selectedPost.likes > 0 ? "fill-danger" : ""} size={20}/> 
                    <span className="fw-bold">{selectedPost.likes}</span>
                </button>
            </div>

            {/* 댓글 영역 */}
            <div className="bg-light rounded-4 p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    댓글 <span className="text-primary">{selectedPost.comments}</span>
                </h5>

                {/* 댓글 리스트 */}
                <div className="d-flex flex-column gap-4 mb-4">
                    {selectedPost.commentsList && selectedPost.commentsList.length > 0 ? (
                        selectedPost.commentsList.map(comment => (
                            <div key={comment.id} className="d-flex gap-3">
                                <div className="rounded-circle bg-white border d-flex align-items-center justify-content-center text-muted" style={{width: '36px', height: '36px', flexShrink: 0}}>
                                    <User size={18}/>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <span className="fw-bold d-flex align-items-center gap-2">
                                            {comment.author}
                                            {/* 댓글 작성자에게도 쪽지 보내기 */}
                                            <button 
                                                className="btn btn-sm p-0 text-muted" 
                                                title="쪽지 보내기"
                                                onClick={() => handleSendMessage(comment.author)}
                                            >
                                                <Mail size={12} />
                                            </button>
                                        </span>
                                        <span className="small text-muted">{comment.date}</span>
                                    </div>
                                    <p className="mb-2 text-dark">{comment.text}</p>
                                    <button 
                                        className="btn btn-link p-0 text-decoration-none text-muted small d-flex align-items-center gap-1"
                                        onClick={() => handleLikeComment(comment.id)}
                                    >
                                        <ThumbsUp size={12}/> {comment.likes > 0 ? comment.likes : '좋아요'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted small py-3">첫 번째 댓글을 남겨보세요!</p>
                    )}
                </div>

                {/* 댓글 입력 */}
                <form onSubmit={handleSubmitComment} className="position-relative">
                    <textarea 
                        className="form-control pe-5" 
                        rows="2" 
                        placeholder="댓글을 입력하세요..."
                        style={{ resize: 'none', borderRadius: '1rem' }}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    ></textarea>
                    <button 
                        type="submit" 
                        className="btn btn-link position-absolute bottom-0 end-0 mb-1 me-1 text-primary"
                        disabled={!commentInput.trim()}
                    >
                        <Send size={20}/>
                    </button>
                </form>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 3. 목록 화면 (Default)
  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      
      {/* 헤더 섹션 */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="fw-bold m-0" style={{ color: themeColor }}>
            {sportMode === 'soccer' ? '축구 커뮤니티' : '야구 커뮤니티'}
        </h2>
      </div>

      {/* 탭 네비게이션 */}
      <div className="d-flex gap-2 mb-4 bg-light p-1 rounded-3 d-inline-flex">
        {[
            { id: 'free', label: '통합 게시판', icon: MessageSquare },
            { id: 'ticket', label: '티켓 양도', icon: Ticket },
            { id: 'companion', label: '동행 구하기', icon: Users }
        ].map(tab => (
            <button
                key={tab.id}
                className={`btn fw-bold d-flex align-items-center gap-2 ${activeTab === tab.id ? 'bg-white shadow-sm text-dark' : 'text-muted'}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ border: 'none', transition: 'all 0.2s' }}
            >
                <tab.icon size={18} />
                {tab.label}
            </button>
        ))}
      </div>

      {/* 컨트롤 바 */}
      <div className="card p-3 mb-4 border-0 shadow-sm rounded-4 bg-white">
        <div className="row g-3 align-items-center">
            <div className="col-lg-5 d-flex flex-column flex-md-row gap-2">
                <div className="input-group" style={{ maxWidth: '250px' }}>
                    <span className="input-group-text bg-white border-end-0"><Search size={16} className="text-muted"/></span>
                    <input 
                        type="text" 
                        className="form-control border-start-0 ps-0" 
                        placeholder="제목, 작성자 검색"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="btn-group">
                    {['latest', 'likes', 'views', 'comments'].map(type => (
                        <button 
                            key={type}
                            className={`btn btn-sm ${sortBy === type ? 'btn-outline-dark active' : 'btn-outline-secondary'}`}
                            onClick={() => setSortBy(type)}
                        >
                            {type === 'latest' ? '최신순' : type === 'likes' ? '좋아요순' : type === 'views' ? '조회순' : '댓글순'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="col-lg-7 d-flex justify-content-lg-end align-items-center flex-wrap gap-2">
                {activeTab === 'ticket' && (
                    <>
                        {sportMode === 'soccer' && (
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn ${selectedLeague === 'K1' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => { setSelectedLeague('K1'); setSelectedTeam('all'); }}
                                    style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : undefined, borderColor: themeColor }}
                                >K리그1</button>
                                <button 
                                    className={`btn ${selectedLeague === 'K2' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => { setSelectedLeague('K2'); setSelectedTeam('all'); }}
                                    style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : undefined, borderColor: themeColor }}
                                >K리그2</button>
                            </div>
                        )}
                        <select 
                            className="form-select form-select-sm w-auto" 
                            value={selectedTeam}
                            onChange={(e) => setSelectedTeam(e.target.value)}
                        >
                            <option value="all">전체 구단</option>
                            {dropdownTeams.map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                        <div className="form-check ms-1">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="sellingOnly" 
                                checked={showSellingOnly}
                                onChange={(e) => setShowSellingOnly(e.target.checked)}
                            />
                            <label className="form-check-label small fw-bold text-nowrap" htmlFor="sellingOnly">
                                판매중만
                            </label>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="d-flex flex-column gap-3">
        {displayedPosts.length > 0 ? (
            displayedPosts.map(post => {
                // 티켓 게시글 디자인
                if (post.type === 'ticket') {
                    return (
                        <div 
                            key={post.id} 
                            className="card border-0 shadow-sm p-0 overflow-hidden hover-shadow transition-all cursor-pointer"
                            onClick={() => handlePostClick(post)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body p-4 d-flex align-items-center">
                                <div className="me-4 text-center" style={{minWidth: '80px'}}>
                                    {post.status === 'selling' ? (
                                        <span className="badge bg-success mb-2">판매중</span>
                                    ) : (
                                        <span className="badge bg-secondary mb-2">판매완료</span>
                                    )}
                                    <div className="small text-muted fw-bold">{getTeamName(post.teamId)}</div>
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="fw-bold mb-1 text-truncate">{post.title}</h5>
                                    <div className="text-primary fw-bold fs-5">{post.price?.toLocaleString()}원</div>
                                    <div className="d-flex gap-3 mt-2 small text-muted">
                                        <span className="d-flex align-items-center gap-1"><User size={14}/> {post.author}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 text-muted small ms-3">
                                    <span className="d-flex align-items-center gap-1"><Eye size={14}/> {post.views}</span>
                                    <span className="d-flex align-items-center gap-1"><Heart size={14}/> {post.likes}</span>
                                    <span className="d-flex align-items-center gap-1"><MessageSquare size={14}/> {post.comments}</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                // 일반/공지 게시글 디자인
                return (
                    <div 
                        key={post.id} 
                        className={`card border-0 shadow-sm p-0 hover-shadow transition-all ${post.isPinned ? 'bg-light-subtle border-start border-4 border-primary' : ''}`}
                        onClick={() => handlePostClick(post)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-body p-3 px-4 d-flex align-items-center justify-content-between">
                            <div className="d-flex flex-column overflow-hidden">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    {post.isPinned && <span className="badge bg-primary">공지</span>}
                                    {post.type === 'companion' && <span className="badge bg-info text-dark">동행</span>}
                                    <span className={`fw-medium text-dark text-truncate ${post.isPinned ? 'fw-bold' : ''}`} style={{fontSize: '1.05rem'}}>{post.title}</span>
                                    {post.comments > 0 && <span className="text-primary small fw-bold">[{post.comments}]</span>}
                                </div>
                                <div className="d-flex gap-2 small text-muted">
                                    <span>{post.author}</span>
                                    <span>·</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                            <div className="d-flex gap-3 text-muted small ms-3 align-self-center">
                                <div className="d-flex flex-column align-items-center" style={{minWidth: '40px'}}>
                                    <Eye size={16} className="mb-1"/>
                                    <span>{post.views}</span>
                                </div>
                                <div className="d-flex flex-column align-items-center" style={{minWidth: '40px'}}>
                                    <Heart size={16} className="mb-1 text-danger"/>
                                    <span>{post.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="text-center py-5 text-muted">
                <div className="fs-1 mb-3">📭</div>
                <p>등록된 게시글이 없습니다.</p>
            </div>
        )}
      </div>

      {/* 글쓰기 플로팅 버튼 */}
      <div className="position-fixed bottom-0 end-0 m-5" style={{zIndex: 100}}>
        <button 
            className="btn btn-lg text-white rounded-pill shadow-lg px-4 py-3 fw-bold d-flex align-items-center gap-2 hover-scale"
            style={{backgroundColor: themeColor, border: 'none'}}
            onClick={handleWriteClick}
        >
            <Megaphone size={20}/> 글쓰기
        </button>
      </div>

    </div>
  );
}

export default CommunityPage;