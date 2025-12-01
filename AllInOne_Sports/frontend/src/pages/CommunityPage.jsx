import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, MessageSquare, Heart, Eye, Megaphone, Ticket, Users, User, CheckCircle, ArrowLeft, Paperclip, Send, ThumbsUp, Image as ImageIcon, Mail, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAccess } from '../util/fetchUtil';
import {MOCK_TEAMS} from '../../constants';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function CommunityPage({ sportMode }) {
  const navigate = useNavigate();
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';
  
  const [viewMode, setViewMode] = useState('list');
  const [posts, setPosts] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  const [activeTab, setActiveTab] = useState('free'); 
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedLeague, setSelectedLeague] = useState('K1');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [showSellingOnly, setShowSellingOnly] = useState(false);
  const [status, setStatus] = useState("ONGOING");

  const [writeForm, setWriteForm] = useState({
    type: 'free', 
    title: '',
    content: '',
    teamId: '',
    price: '',
    file: null
  });
  const fileInputRef = useRef(null);
  const [commentInput, setCommentInput] = useState('');

  const getTeamName = (id) => {
    const team = MOCK_TEAMS.find(t => t.id === String(id));
    return team ? team.name : '알 수 없음';
  };

  const dropdownTeams = useMemo(() => {
    if (sportMode === 'baseball') {
        return MOCK_TEAMS.filter(t => t.sport === 'baseball');
    }
    return MOCK_TEAMS.filter(t => t.league === selectedLeague);
  }, [sportMode, selectedLeague]);

  const formatDate = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString();
  };

  useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigate('/');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) throw new Error("유저 정보 불러오기 실패");

                const data = await res.json();
                setCurrentUser({
                    ...data,
                    userId: data.id || data.userId,
                    nickname: data.nickname || data.name
                });
            } catch (err) {
                console.error(err);
                alert("유저 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

  useEffect(() => {
      if (!isLoading && currentUser) {
          fetchPosts();
      }
  }, [sportMode, activeTab, isLoading, currentUser]);

  const fetchPosts = async () => {
      try {
          let apiPostType = 'ALL';
          if (activeTab === 'ticket') apiPostType = 'TICKET';
          else if (activeTab === 'companion') apiPostType = 'COMPANION';
          else if (activeTab === 'free') apiPostType = 'FREE';

          if (activeTab === 'notice') apiPostType = 'FREE';

          const queryParams = new URLSearchParams({
              sportsType: sportMode,
              postType: apiPostType
          });

          const response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/posts?${queryParams.toString()}`, {
              method: 'GET',
              credentials: 'include'
          });
          
          if (!response.ok) throw new Error('데이터 로딩 실패');
          
          const data = await response.json();
          
          const mappedPosts = data.map(post => ({
              id: post.id,
              userId: post.userId,
              type: post.postType.toLowerCase(),
              title: post.title,
              author: post.author,
              date: formatDate(post.modifiedAt),
              views: post.viewCount,
              likes: post.likeCount || 0,
              comments: post.comments ? post.comments.length : 0,
              content: post.contents,
              commentsList: post.comments.map(c => ({
                  id: c.id,
                  userId: c.userId,
                  author: c.author,
                  text: c.content,
                  date: formatDate(c.createdAt),
                  likes: 0
              })),
              teamId: post.teamId, 
              price: post.price,
              status: post.status === 'ONGOING' ? 'selling' : 'soldout',
              isPinned: false, 
              hasFile: false 
          }));

          setPosts(mappedPosts);
      } catch (error) {
          console.error("게시글 로딩 에러:", error);
      }
  };

  const createChatRoom = async (roomName) => {
    try {
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/v1/chat/rooms`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: roomName })
        });
        
        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("accessToken");
                navigate('/'); 
                return;
            }
            throw new Error("채팅방 생성 실패");
        }
        alert(`${roomName}님과의 채팅방이 생성되었습니다.`);
        navigate('/message'); 

    } catch (err) {
        console.error("Error creating chat room:", err);
        alert(`채팅방 생성 중 오류 발생: ${err.message}`);
    }
  };

  const handleSendMessage = async (author) => {
    if (!currentUser) return;
    
    if (author === currentUser.nickname) {
        alert('자신에게는 쪽지를 보낼 수 없습니다.');
        return;
    }
    
    if (window.confirm(`${author}님에게 쪽지를 보내시겠습니까?\n(1:1 채팅방이 생성됩니다)`)) {
        await createChatRoom(author);
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;

    try {
        const response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/post/${selectedPost.id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            alert("게시글이 삭제되었습니다.");
            setViewMode('list');
            fetchPosts();
        } else {
            alert("삭제 권한이 없거나 오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
        const response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/comment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            const updatedCommentsList = selectedPost.commentsList.filter(c => c.id !== commentId);
            setSelectedPost({
                ...selectedPost,
                commentsList: updatedCommentsList,
                comments: updatedCommentsList.length
            });
            setPosts(posts.map(p => p.id === selectedPost.id ? { ...p, comments: updatedCommentsList.length } : p));
        } else {
            alert("삭제 권한이 없거나 오류가 발생했습니다.");
        }
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
    }
  };

  const handleWriteClick = () => {
    setIsEditing(false);
    setEditPostId(null);
    setWriteForm({
      type: 'free',
      title: '',
      content: '',
      price: '',
      teamId: '',
      file: null,
      status: 'ONGOING'
    });
    setViewMode('write');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setWriteForm({ ...writeForm, file: e.target.files[0] });
    }
  };

  const handleSubmitPost = async () => {
    if (!writeForm.title.trim() || !writeForm.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    if (writeForm.type === 'ticket' && (!writeForm.teamId || !writeForm.price)) {
        alert('티켓 양도 시 구단과 가격은 필수입니다.');
        return;
    }

    try {
        const payload = {
            title: writeForm.title,
            author: currentUser.nickname,
            username: currentUser.username,
            contents: writeForm.content,
            postType: writeForm.type.toUpperCase(),
            sportsType: sportMode,
            price: writeForm.price ? parseInt(writeForm.price) : 0,
            teamId: writeForm.teamId, 
            status: writeForm.status,
            gameDate: new Date().toISOString()
        };

        let response;
        if (isEditing && editPostId) {
            // 🌟 수정 (PUT)
            response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/post/${editPostId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response) alert("게시글이 수정되었습니다.");
        } else {
            // 🌟 작성 (POST)
            response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            alert('게시글이 등록되었습니다.');
            await fetchPosts();
            setViewMode('list');
        } else {
            alert('등록 실패');
        }
    } catch (error) {
        console.error("글쓰기 에러:", error);
        alert("오류가 발생했습니다.");
    }
  };

  const handleEditClick = (post) => {
    console.log("수정 모드 진입:", post);
    setIsEditing(true);
    setEditPostId(post.id);

    setWriteForm({
        type: post.postType === 'TICKET' ? 'ticket' : post.postType === 'COMPANION' ? 'companion' : 'free',
        title: post.title,
        content: post.content, 
        price: post.price || '',
        teamId: post.teamId || '', // 팀 ID 매칭 필요 (문자열/숫자 확인)
        file: null, // 파일은 다시 올려야 함 (보안상)
        status: post.status || 'ONGOING'
    });
    
    setViewMode('write');
};

  const handlePostClick = async (post) => {
    try {
        const response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/post/${post.id}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('상세 조회 실패');
        
        const data = await response.json();
        
        const mappedDetail = {
            ...post,
            userId: data.userId,
            views: data.viewCount,
            likes: data.likeCount || 0,
            content: data.contents,
            comments: data.comments ? data.comments.length : 0,
            commentsList: data.comments.map(c => ({
                id: c.id,
                userId: c.userId,
                author: c.author,
                text: c.content,
                date: formatDate(c.createdAt),
                likes: 0
            })),
            likedByCurrentUser: data.likedByCurrentUser
        };

        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, views: data.viewCount } : p));
        setSelectedPost(mappedDetail);
        setViewMode('detail');
    } catch (error) {
        console.error("상세보기 에러:", error);
    }
  };

  const handleLikePost = async () => {
    if (!selectedPost) return;
    try {
        const response = await fetch(`${BACKEND_API_BASE_URL}/api/post/${selectedPost.id}/like`, {
            method: 'POST',
        });
        // handlePostClick(selectedPost)
    } catch (error) {
        console.error("좋아요 에러:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
        const payload = {
            author: currentUser.nickname,
            content: commentInput,
            username: currentUser.username
        };

        const response = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/post/${selectedPost.id}/comment`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const newCommentData = await response.json();
            const newComment = {
                id: newCommentData.id,
                userId: newCommentData.userId,
                author: newCommentData.author,
                text: newCommentData.content,
                date: formatDate(newCommentData.createdAt),
                likes: 0
            };

            const updatedPost = {
                ...selectedPost,
                commentsList: [...(selectedPost.commentsList || []), newComment],
                comments: (selectedPost.comments || 0) + 1
            };

            setSelectedPost(updatedPost);
            setPosts(posts.map(p => p.id === updatedPost.id ? { ...p, comments: updatedPost.comments } : p));
            setCommentInput('');
        }
    } catch (error) {
        console.error("댓글 작성 에러:", error);
    }
  };

  const handleLikeComment = (commentId) => {
    const updatedCommentsList = selectedPost.commentsList.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    );
    const updatedPost = { ...selectedPost, commentsList: updatedCommentsList };
    setSelectedPost(updatedPost);
  };

  const getFilteredPosts = () => {
    let filtered = posts;

    if (activeTab !== 'all') { 
        filtered = filtered.filter(post => post.type === activeTab || (activeTab === 'free' && post.type === 'notice'));
    }

    if (searchText) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchText.toLowerCase()) || 
        post.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (activeTab === 'ticket') {
      if (selectedTeam !== 'all') {
        filtered = filtered.filter(post => post.teamId === selectedTeam);
      } else if (sportMode === 'soccer') {
    // 1. MOCK_TEAMS에서 선택된 리그(K1, K2)에 해당하는 팀을 찾습니다.
    // 2. 게시글의 teamId가 '이름'으로 되어있으므로, 여기서도 .map(t => t.name)으로 '이름' 리스트를 뽑습니다.
    const leagueTeamNames = MOCK_TEAMS
      .filter(t => t.league === selectedLeague)
      .map(t => t.name); 

    // 3. 게시글의 teamId(팀 이름)가 해당 리그의 팀 이름 목록에 포함되는지 확인합니다.
    filtered = filtered.filter(post => leagueTeamNames.includes(post.teamId));
  }
      if (showSellingOnly) {
        filtered = filtered.filter(post => post.status === 'selling');
      }
    }

    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'comments') return (b.comments || 0) - (a.comments || 0);
      
      return new Date(b.date) - new Date(a.date);
    });

    return filtered;
  };

  const displayedPosts = getFilteredPosts();

  if (isLoading) {
      return (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          </div>
      );
  }

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

         {writeForm.type === 'ticket' && (
            <>
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
                            <option key={t.id} value={t.name}>{t.name}</option> 
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
                
                {/* 🌟 [핵심] 판매 상태 변경 UI (수정 모드 + 티켓 타입일 때만 노출) */}
                {isEditing && (
                    <div className="mb-4">
                        <label className="form-label fw-bold">판매 상태 변경</label>
                        <div className="d-flex gap-3 p-3 bg-white border rounded-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="statusOptions"
                                    id="statusOngoing"
                                    value="ONGOING"
                                    checked={writeForm.status === 'ONGOING'}
                                    onChange={() => setWriteForm({ ...writeForm, status: 'ONGOING' })}
                                />
                                <label className="form-check-label fw-bold text-success" htmlFor="statusOngoing">
                                    🟢 판매중
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="statusOptions"
                                    id="statusCompleted"
                                    value="COMPLETED"
                                    checked={writeForm.status === 'COMPLETED'}
                                    onChange={() => setWriteForm({ ...writeForm, status: 'COMPLETED' })}
                                    defaultChecked={writeForm.status === 'COMPLETED'}
                                />
                                <label className="form-check-label fw-bold text-secondary" htmlFor="statusCompleted">
                                    🔴 판매완료
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </>
          )}
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

          <div className="mb-4">
            <textarea 
              className="form-control border-0 px-0" 
              rows="10" 
              placeholder="내용을 입력하세요. (경기 직관 후기, 티켓 양도 상세 내용 등)"
              value={writeForm.content}
              onChange={(e) => setWriteForm({ ...writeForm, content: e.target.value })}
              style={{ boxShadow: 'none', resize: 'none' }}
              autoComplete="off"
              spellCheck="false"
            ></textarea>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-light px-4" onClick={() => setViewMode('list')}>취소</button>
            <button 
                className="btn text-white px-4 fw-bold" 
                style={{ backgroundColor: themeColor }}
                onClick={handleSubmitPost}
            >
                {isEditing ? '수정 완료' : '등록 완료'}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="mb-4 pb-4 border-bottom">
                <div className="d-flex justify-content-between">
                   <h2 className="fw-bold mb-3">
                        <span className="badge rounded-pill bg-primary text-white px-3 py-2 me-2 shadow-sm align-middle" 
                            style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                            {selectedPost.teamId}
                        </span>
                        {selectedPost.title}
                    </h2>
                    
                    {currentUser && selectedPost.userId === currentUser.userId && (
                        <div className="d-flex gap-2 flex-shrink-0">
                            {/* 수정 버튼 */}
                            <button 
                                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                                onClick={() => {
                                    console.log("수정 시작:", selectedPost.id);
                                    // TODO: 여기서 수정 모달을 열거나 수정 페이지로 이동하는 함수 호출
                                    handleEditClick(selectedPost); 
                                }}
                            >
                                <Edit size={16} /> 수정
                            </button>
                            
                            {/* 삭제 버튼 */}
                            <button 
                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                onClick={handleDeletePost}
                            >
                                <Trash2 size={16} /> 삭제
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white" style={{width: '40px', height: '40px'}}>
                            <User size={20}/>
                        </div>
                        <div>
                            <div className="fw-bold text-dark d-flex align-items-center gap-2">
                                {selectedPost.author}
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

            <div className="mb-5" style={{ minHeight: '200px', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {selectedPost.content}
            </div>

            <div className="text-center mb-5">
                <button 
                    className={`btn btn-outline-danger rounded-pill px-4 py-2 d-flex align-items-center gap-2 mx-auto hover-scale ${selectedPost.likedByCurrentUser ? 'active bg-danger text-white' : ''}`}
                    onClick={handleLikePost}
                >
                    <Heart className={selectedPost.likes > 0 || selectedPost.likedByCurrentUser ? "fill-danger" : ""} size={20}/> 
                    <span className="fw-bold">{selectedPost.likes}</span>
                </button>
            </div>

            <div className="bg-light rounded-4 p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    댓글 <span className="text-primary">{selectedPost.comments}</span>
                </h5>

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
                                            <button 
                                                className="btn btn-sm p-0 text-muted" 
                                                title="쪽지 보내기"
                                                onClick={() => handleSendMessage(comment.author)}
                                            >
                                                <Mail size={12} />
                                            </button>
                                        </span>
                                        <div className="d-flex gap-2 align-items-center">
                                            <span className="small text-muted">{comment.date}</span>
                                            {currentUser && comment.userId === currentUser.userId && (
                                                <button 
                                                    className="btn btn-link text-muted p-0"
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
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

                <form onSubmit={handleSubmitComment} className="position-relative">
                    <textarea 
                        className="form-control pe-5" 
                        rows="2" 
                        placeholder="댓글을 입력하세요..."
                        style={{ resize: 'none', borderRadius: '1rem' }}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target ? e.target.value : '')}
                        autoComplete="off"
                        spellCheck="false"
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

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="fw-bold m-0" style={{ color: themeColor }}>
            {sportMode === 'soccer' ? '축구 커뮤니티' : '야구 커뮤니티'}
        </h2>
      </div>

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

      <div className="d-flex flex-column gap-3">
        {displayedPosts.length > 0 ? (
            displayedPosts.map(post => {
                if (post.type === 'ticket') {
                    return (
                        <div 
                            key={post.id} 
                            className="card border-0 shadow-sm p-0 overflow-hidden hover-shadow transition-all cursor-pointer"
                            onClick={() => handlePostClick(post)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-body p-4 d-flex align-items-center">
                                <div className="mb-3">            
                                    <div className="me-4 text-center" style={{minWidth: '80px'}}>
                                <label className="form-label fw-bold small text-muted mb-2">판매 상태</label>
                                    <div>
                                        {post.status === 'selling' ? (
                                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary px-3 py-2 rounded-pill w-100">
                                            판매중
                                        </span>
                                        ) : (
                                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary px-3 py-2 rounded-pill w-100">
                                            판매완료
                                        </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center mb-1">
                                        <span className="badge rounded-pill bg-primary text-white px-3 py-1 me-2 flex-shrink-0 shadow-sm" 
                                            style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                                            {post.teamId}
                                        </span>
                                        <h5 className="fw-bold mb-0 text-truncate text-dark">
                                            {post.title}
                                        </h5>
                                    </div>
                                    
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