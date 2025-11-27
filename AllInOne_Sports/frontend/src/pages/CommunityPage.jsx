
import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageSquare, Heart, Eye, Megaphone, Ticket, Users, User, CheckCircle } from 'lucide-react';
import { MOCK_COMMUNITY_POSTS, MOCK_TEAMS } from '../../constants';

function CommunityPage({ sportMode }) {
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';
  
  // 상태 관리
  const [activeTab, setActiveTab] = useState('free'); // 'free' (통합), 'ticket' (티켓), 'companion' (동행)
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'likes', 'views', 'comments'
  
  // 티켓 전용 필터 상태
  const [selectedLeague, setSelectedLeague] = useState('K1'); // K1, K2 (축구 전용)
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [showSellingOnly, setShowSellingOnly] = useState(false);

  // 드롭다운에 표시할 팀 목록 (리그 선택에 따라 달라짐)
  const dropdownTeams = useMemo(() => {
    if (sportMode === 'baseball') {
        return MOCK_TEAMS.filter(t => t.sport === 'baseball');
    }
    // 축구면 선택된 리그에 따라 필터링
    return MOCK_TEAMS.filter(t => t.league === selectedLeague);
  }, [sportMode, selectedLeague]);

  // 데이터 필터링 로직
  const getFilteredPosts = () => {
    let posts = MOCK_COMMUNITY_POSTS;

    // 1. 탭에 따른 필터링 (공지사항은 별도 처리하므로 여기선 제외할 수도 있으나, 아래에서 noticePosts 별도 추출함)
    // 여기서는 일반 리스트에 공지사항을 포함하지 않고 상단에 따로 보여주기 위해 type이 'notice'가 아닌 것 중에서 필터링
    // 혹은 탭에 맞는 글만 가져옴
    posts = posts.filter(post => post.type === activeTab);

    // 2. 검색 필터
    if (searchText) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchText.toLowerCase()) || 
        post.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // 3. 티켓 탭 전용 필터
    if (activeTab === 'ticket') {
      if (selectedTeam !== 'all') {
        posts = posts.filter(post => post.teamId === selectedTeam);
      } else {
        // 전체 구단 선택 시
        if (sportMode === 'soccer') {
            // 선택된 리그의 팀에 해당하는 글만 보여주기
            const leagueTeamIds = MOCK_TEAMS
                .filter(t => t.league === selectedLeague)
                .map(t => t.id);
            posts = posts.filter(post => leagueTeamIds.includes(post.teamId));
        } else {
            // 야구 모드면 야구 팀 글만
            const baseballTeamIds = MOCK_TEAMS.filter(t => t.sport === 'baseball').map(t => t.id);
            posts = posts.filter(post => baseballTeamIds.includes(post.teamId));
        }
      }

      if (showSellingOnly) {
        posts = posts.filter(post => post.status === 'selling');
      }
    }

    // 4. 정렬 (세분화)
    posts.sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'comments') return (b.comments || 0) - (a.comments || 0);
      // latest (날짜 문자열 비교)
      return b.date.localeCompare(a.date);
    });

    return posts;
  };

  // 공지사항 가져오기 (항상 최상단 노출)
  const noticePosts = MOCK_COMMUNITY_POSTS.filter(post => post.type === 'notice');
  const filteredPosts = getFilteredPosts();

  // 팀 이름 찾기 헬퍼
  const getTeamName = (id) => {
    const team = MOCK_TEAMS.find(t => t.id === id);
    return team ? team.name : '알 수 없음';
  };

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

      {/* 컨트롤 바 (검색, 정렬, 필터) */}
      <div className="card p-3 mb-4 border-0 shadow-sm rounded-4 bg-white">
        <div className="row g-3 align-items-center">
            
            {/* 왼쪽: 검색 및 정렬 */}
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
                    <button 
                        className={`btn btn-sm ${sortBy === 'latest' ? 'btn-outline-dark active' : 'btn-outline-secondary'}`}
                        onClick={() => setSortBy('latest')}
                    >최신순</button>
                    <button 
                        className={`btn btn-sm ${sortBy === 'likes' ? 'btn-outline-dark active' : 'btn-outline-secondary'}`}
                        onClick={() => setSortBy('likes')}
                    >좋아요순</button>
                    <button 
                        className={`btn btn-sm ${sortBy === 'views' ? 'btn-outline-dark active' : 'btn-outline-secondary'}`}
                        onClick={() => setSortBy('views')}
                    >조회순</button>
                    <button 
                        className={`btn btn-sm ${sortBy === 'comments' ? 'btn-outline-dark active' : 'btn-outline-secondary'}`}
                        onClick={() => setSortBy('comments')}
                    >댓글순</button>
                </div>
            </div>

            {/* 오른쪽: 티켓 전용 필터 */}
            <div className="col-lg-7 d-flex justify-content-lg-end align-items-center flex-wrap gap-2">
                {activeTab === 'ticket' && (
                    <>
                        {/* 리그 선택 (축구일 때만) */}
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
        
        {/* 공지사항 (항상 상단 고정) */}
        {noticePosts.map(post => (
            <div key={post.id} className="card border-0 shadow-sm bg-light-subtle border-start border-4 border-primary">
                <div className="card-body py-3 px-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3 overflow-hidden">
                        <span className="badge bg-primary">공지</span>
                        <span className="fw-bold text-truncate">{post.title}</span>
                    </div>
                    <div className="text-muted small text-nowrap ms-3">
                        {post.date}
                    </div>
                </div>
            </div>
        ))}

        {/* 일반 게시글 */}
        {filteredPosts.length > 0 ? (
            filteredPosts.map(post => {
                // 티켓 게시글 디자인
                if (post.type === 'ticket') {
                    return (
                        <div key={post.id} className="card border-0 shadow-sm p-0 overflow-hidden hover-shadow transition-all">
                            <div className="card-body p-4 d-flex align-items-center">
                                {/* 상태 뱃지 & 팀 */}
                                <div className="me-4 text-center" style={{minWidth: '80px'}}>
                                    {post.status === 'selling' ? (
                                        <span className="badge bg-success mb-2">판매중</span>
                                    ) : (
                                        <span className="badge bg-secondary mb-2">판매완료</span>
                                    )}
                                    <div className="small text-muted fw-bold">{getTeamName(post.teamId)}</div>
                                </div>

                                {/* 제목 & 가격 */}
                                <div className="flex-grow-1">
                                    <h5 className="fw-bold mb-1 text-truncate">{post.title}</h5>
                                    <div className="text-primary fw-bold fs-5">
                                        {post.price.toLocaleString()}원
                                    </div>
                                    <div className="d-flex gap-3 mt-2 small text-muted">
                                        <span className="d-flex align-items-center gap-1"><User size={14}/> {post.author}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                {/* 메타 정보 */}
                                <div className="d-flex gap-3 text-muted small ms-3">
                                    <span className="d-flex align-items-center gap-1"><Eye size={14}/> {post.views}</span>
                                    <span className="d-flex align-items-center gap-1"><Heart size={14}/> {post.likes}</span>
                                    <span className="d-flex align-items-center gap-1"><MessageSquare size={14}/> {post.comments}</span>
                                </div>
                            </div>
                        </div>
                    );
                }

                // 일반/동행 게시글 디자인
                return (
                    <div key={post.id} className="card border-0 shadow-sm p-0 hover-shadow transition-all">
                        <div className="card-body p-3 px-4 d-flex align-items-center justify-content-between">
                            <div className="d-flex flex-column overflow-hidden">
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    {post.type === 'companion' && <span className="badge bg-info text-dark">동행</span>}
                                    <span className="fw-medium text-dark text-truncate" style={{fontSize: '1.05rem'}}>{post.title}</span>
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
                                <div className="d-flex flex-column align-items-center" style={{minWidth: '40px'}}>
                                    <MessageSquare size={16} className="mb-1"/>
                                    <span>{post.comments || 0}</span>
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
        >
            <Megaphone size={20}/> 글쓰기
        </button>
      </div>

    </div>
  );
}

export default CommunityPage;
