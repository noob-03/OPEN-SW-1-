import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, Bell, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import './CalendarPage.css';

function CalendarPage({ sportMode }) {
    const navigate = useNavigate();

    // 현재 기준 날짜
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDates, setWeekDates] = useState([]);

    // 슬라이드 패널 상태 관리
    const [showPanel, setShowPanel] = useState(false);

    // 테마 색상 (축구/야구)
    const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

    // --- 날짜 계산 로직 ---
    useEffect(() => {
        const dates = [];
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay(); // 0(일) ~ 6(토)
        startOfWeek.setDate(startOfWeek.getDate() - day);

        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            dates.push(d);
        }
        setWeekDates(dates);
    }, [currentDate]);

    // [월 단위 이동]
    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    // [주 단위 이동]
    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    // [클릭 핸들러]
    const handleNewsClick = () => setShowPanel(true);      // 새 소식 패널 열기
    const handleMessageClick = () => navigate('/message'); // 쪽지함 이동
    const closePanel = () => setShowPanel(false);          // 패널 닫기

    // YYYY-MM-DD 형식 변환
    const formatDateKey = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // --- Mock Data ---
    const allMatches = [
        { id: 1, date: formatDateKey(new Date()), type: 'baseball', time: '18:30', home: 'LG', away: 'KIA', homeLogo: '⚾', awayLogo: '🐯', stadium: '광주-기아 챔피언스필드' },
        { id: 2, date: formatDateKey(new Date()), type: 'soccer', time: '19:00', home: 'FC서울', away: '울산HD', homeLogo: '⚫🔴', awayLogo: '🔵', stadium: '서울 월드컵 경기장', isLive: true },
        { id: 3, date: formatDateKey(new Date(new Date().setDate(new Date().getDate() + 1))), type: 'baseball', time: '18:30', home: '삼성', away: 'KIA', homeLogo: '🦁', awayLogo: '🐯', stadium: '대구 라이온즈 파크' },
        { id: 4, date: formatDateKey(new Date(new Date().setDate(new Date().getDate() + 2))), type: 'soccer', time: '20:00', home: '토트넘', away: '아스날', homeLogo: '⚪', awayLogo: '🔴', stadium: '토트넘 홋스퍼 스타디움' },
    ];

    const filteredMatches = allMatches.filter(m =>
        (sportMode === 'soccer' ? m.type === 'soccer' : m.type === 'baseball')
    );

    const communityPosts = [
        { id: 1, title: "[공지] 커뮤니티 이용 규칙 안내", author: "관리자", date: "05.01", isNotice: true },
        { id: 2, title: "오늘 경기 직관 가시는 분 계신가요?", author: "야구광", date: "05.20" },
        { id: 3, title: "5/21 기아 vs LG 3루 응원석 양도합니다", author: "티켓요정", date: "05.19" },
        { id: 4, title: "어제 경기 하이라이트 영상 좌표", author: "축구도사", date: "05.18" },
    ];

    const newsList = [
        { id: 1, text: "새로운 이벤트 'All-in-One 페스티벌' 시작!", date: "2025-11-20" },
        { id: 2, text: "시스템 점검 안내 (12/01 02:00~06:00)", date: "2025-11-15" },
        { id: 3, text: "내가 쓴 글에 새로운 댓글이 달렸습니다.", date: "2025-11-10" },
    ];

    const displayYear = weekDates.length > 0 ? weekDates[0].getFullYear() : currentDate.getFullYear();
    const displayMonth = weekDates.length > 0 ? weekDates[0].getMonth() + 1 : currentDate.getMonth() + 1;

    return (
        <div className="container-fluid py-5" style={{ marginTop: '80px', maxWidth: '1600px', position: 'relative' }}>
            <div className="row g-4">

                {/* --- [Left: 70%] Calendar Section --- */}
                <div className="col-lg-9">
                    <div className="card border-0 shadow-sm p-4 bg-white rounded-4 h-100" style={{minHeight: '600px'}}>

                        {/* 상단 월 이동 헤더 */}
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                            <h3 className="fw-bold m-0 text-dark">경기 일정</h3>

                            <div className="d-flex align-items-center gap-4 bg-light px-4 py-2 rounded-pill shadow-sm">
                                <button onClick={handlePrevMonth} className="btn btn-link p-0 text-secondary hover-scale" title="이전 달">
                                    <ChevronsLeft size={24} />
                                </button>
                                <span className="fw-bold fs-4 text-dark" style={{minWidth: '140px', textAlign: 'center'}}>
                                    {displayYear}년 {displayMonth}월
                                </span>
                                <button onClick={handleNextMonth} className="btn btn-link p-0 text-secondary hover-scale" title="다음 달">
                                    <ChevronsRight size={24} />
                                </button>
                            </div>
                            <div style={{width: '100px'}}></div>
                        </div>

                        {/* 메인 달력 영역 */}
                        <div className="d-flex align-items-stretch">
                            <button onClick={handlePrevWeek} className="week-nav-btn">
                                <ChevronLeft size={40} strokeWidth={2.5} />
                            </button>

                            <div className="calendar-grid flex-grow-1 mx-2">
                                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                                    <div key={day} className={`text-center fw-bold mb-3 fs-5 ${index === 0 ? 'text-danger' : index === 6 ? 'text-primary' : 'text-secondary'}`}>
                                        {day}
                                    </div>
                                ))}

                                {weekDates.map((dateObj) => {
                                    const dateKey = formatDateKey(dateObj);
                                    const matchesForDay = filteredMatches.filter(m => m.date === dateKey);
                                    const isToday = dateKey === formatDateKey(new Date());

                                    return (
                                        <div key={dateKey} className="calendar-cell border-top pt-3 px-1" style={{ minHeight: '400px' }}>
                                            <div className={`text-center fw-bold mb-3 fs-5 ${isToday ? 'today-badge' : ''}`}>
                                                {dateObj.getDate()}
                                            </div>

                                            <div className="d-flex flex-column gap-2">
                                                {matchesForDay.length > 0 ? (
                                                    matchesForDay.map(match => (
                                                        <div key={match.id} className="match-card p-3 rounded-3 border shadow-sm">
                                                            <div className="d-flex justify-content-between text-muted mb-2 small">
                                                                <span className="fw-bold text-dark">{match.time}</span>
                                                                <span>{match.stadium}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="text-center" style={{width: '35%'}}>
                                                                    <div className="fs-3 mb-1">{match.homeLogo}</div>
                                                                    <div className="fw-bold text-truncate small">{match.home}</div>
                                                                </div>
                                                                <div className="fw-bold text-muted small">VS</div>
                                                                <div className="text-center" style={{width: '35%'}}>
                                                                    <div className="fs-3 mb-1">{match.awayLogo}</div>
                                                                    <div className="fw-bold text-truncate small">{match.away}</div>
                                                                </div>
                                                            </div>
                                                            {match.isLive && (
                                                                <div className="mt-2 text-center bg-danger text-white rounded-pill py-1 px-2 fw-bold small shadow-sm">
                                                                    LIVE ON
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-center text-muted small mt-5 pt-3 opacity-50">경기 없음</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={handleNextWeek} className="week-nav-btn">
                                <ChevronRight size={40} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- [Right: 30%] Sidebar Section --- */}
                <div className="col-lg-3">
                    <div className="d-flex flex-column gap-4 h-100">

                        {/* 1. 프로필 카드 */}
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div className="rounded-circle d-flex justify-content-center align-items-center bg-light text-secondary"
                                     style={{ width: '60px', height: '60px' }}>
                                    <User size={30} />
                                </div>
                                <div>
                                    <h5 className="fw-bold m-0">스포츠팬</h5>
                                    <small className="text-muted">팔로우 중인 팀: 1개</small>
                                </div>
                            </div>
                            <div className="d-flex border-top pt-3 text-center">
                                <div
                                    className="w-50 border-end hover-bg-light rounded-start p-1"
                                    onClick={handleNewsClick}
                                    style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                >
                                    <span className="d-block text-muted small mb-1">새 소식</span>
                                    <span className="fw-bold text-primary fs-5">{newsList.length}</span>
                                </div>
                                <div
                                    className="w-50 hover-bg-light rounded-end p-1"
                                    onClick={handleMessageClick}
                                    style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                >
                                    <span className="d-block text-muted small mb-1">쪽지</span>
                                    <span className="fw-bold text-primary fs-5">2</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. 커뮤니티 글 */}
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold m-0">최신 커뮤니티 글</h5>
                                <Bell size={20} className="text-muted" />
                            </div>
                            <div className="d-flex flex-column gap-3">
                                {communityPosts.map(post => (
                                    <div key={post.id} className="border-bottom pb-3">
                                        <div className="fw-medium text-dark text-truncate mb-2 fs-6">
                                            {post.isNotice && <span className="text-danger fw-bold me-2">[공지]</span>}
                                            {post.title}
                                        </div>
                                        <div className="d-flex justify-content-between small text-muted">
                                            <span>{post.author}</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* [수정] 더보기 버튼: 클릭 시 /community 이동 */}
                            <div className="text-center mt-auto pt-3">
                                <button
                                    className="btn btn-light w-100 py-2 text-muted fw-bold"
                                    onClick={() => navigate('/community')}
                                >
                                    더보기
                                </button>
                            </div>
                        </div>

                        {/* 3. 티켓 버튼 */}
                        <div
                            className="card border-0 shadow-sm p-4 rounded-4 text-white text-center cursor-pointer hover-scale"
                            style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #007bff 100%)', cursor: 'pointer' }}
                            onClick={() => navigate('/ticket')}
                        >
                            <h5 className="fw-bold mb-2">티켓 양도 구하시나요?</h5>
                            <div className="d-flex justify-content-center align-items-center gap-2 fs-5 fw-bold">
                                티켓 장터 바로가기 <ChevronRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Slide Panel (새 소식) --- */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 bg-dark ${showPanel ? 'visible' : 'invisible'}`}
                style={{ zIndex: 1050, opacity: showPanel ? 0.5 : 0, transition: 'opacity 0.3s' }}
                onClick={closePanel}
            ></div>

            <div
                className="position-fixed top-0 h-100 bg-white shadow-lg p-4"
                style={{
                    width: 'min(100%, 400px)',
                    right: showPanel ? '0' : '-100%',
                    transition: 'right 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    zIndex: 1060,
                    overflowY: 'auto'
                }}
            >
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="m-0 fw-bold d-flex align-items-center text-primary">
                        <Bell size={24} className="me-2" />새 소식
                    </h5>
                    <button className="btn btn-link p-0 text-dark" onClick={closePanel}>
                        <X size={24} />
                    </button>
                </div>
                <div className="list-group list-group-flush">
                    {newsList.map((item, index) => (
                        <div key={index} className="list-group-item border-0 p-3 rounded-3 mb-2 bg-light">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="fw-bold text-truncate" style={{maxWidth: '220px'}}>{item.text}</span>
                            </div>
                            <small className="text-muted d-block text-end">{item.date}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;