import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, MessageSquare, Bell, Users, HelpCircle, Settings, X, Loader2 } from 'lucide-react';

function MainPage({ sportMode }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ nickname: "TestUser", email: "test@example.com" });
    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState('news');

    // 테마 색상 (Soccer: 파랑, Baseball: 빨강)
    const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

    // --- Mock Data ---
    const matchSchedule = [
        { id: 1, time: "01:30", home: "아스날", away: "토트넘", homeLogo: "🔴", awayLogo: "⚪" },
        { id: 2, time: "01:30", home: "프랑크", away: "우니온", homeLogo: "🦅", awayLogo: "🐻" },
        { id: 3, time: "04:30", home: "인터밀란", away: "AC밀란", homeLogo: "🔵", awayLogo: "🔴" },
        { id: 4, time: "05:00", home: "엘체", away: "레알마드", homeLogo: "🟢", awayLogo: "👑" },
    ];
    const popularPosts = [
        { id: 1, title: "진짜 역대급 미친 경기력ㄷㄷ... 어제 맨시티 경기 하이라이트", views: 100 },
        { id: 2, title: "아스날의 새로운 유니폼 디자인 보셨나요? 바코드 논란이네요", views: 100 },
        { id: 3, title: "여러분은 현재 첼시 포체티노 감독의 전술 운영에 만족하시나요?", views: 100 },
        { id: 4, title: "(속보) 음바페, 다음 이적 시장에서 사우디 알 힐랄과 접촉 중...", views: 100 },
        { id: 5, title: "제가 직관 가서 찍은 이강인 선수의 팬 서비스 사진입니다.", views: 100 },
    ];
    const newsData = [
        { id: 1, text: "새로운 이벤트 'All-in-One 페스티벌'이 시작되었습니다!", date: "2025-11-20" },
        { id: 2, text: "시스템 업데이트 공지: 2025년 12월 1일 새벽 2시", date: "2025-11-15" },
        { id: 3, text: "쪽지 3건이 도착했습니다.", date: "2025-11-10" },
    ];
    const messageData = [
        { id: 1, sender: "운영팀", text: "가입을 환영합니다! 이용 가이드 확인해주세요.", date: "2025-11-20" },
        { id: 2, sender: "김철수", text: "오늘 경기 같이 보러 가실래요?", date: "2025-11-18" },
    ];

    const panelContent = useMemo(() => {
        if (panelType === 'news') {
            return { title: "새 소식", Icon: Bell, list: newsData.map(d => ({ ...d, label: d.text, sub: d.date })) };
        }
        return { title: "쪽지함", Icon: MessageSquare, list: messageData.map(d => ({ ...d, label: d.sender, sub: d.text, date: d.date })) };
    }, [panelType]);

    const openPanel = (type) => { setPanelType(type); setShowPanel(true); };
    const closePanel = () => { setShowPanel(false); };
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event('login-status-change'));
        navigate('/login');
    };
    const handleAccountManage = () => navigate('/account');

    const styles = {
        glassCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(4px)',
        },
        profileAvatar: {
            width: '80px', height: '80px', borderRadius: '50%',
            background: `linear-gradient(45deg, ${themeColor}, #BCD9FF)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '2rem', marginBottom: '1rem',
            transition: 'background 0.5s ease'
        },
        actionButton: {
            border: 'none', background: 'transparent', padding: '10px 0',
            display: 'flex', alignItems: 'center', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: '600', color: '#333'
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="container" style={{ paddingTop: '150px', paddingBottom: '80px' }}>

                {/* 상단 섹션 (타이틀 + 내정보 카드) */}
                <div className="row align-items-center mb-5">
                    <div className="col-lg-7 d-flex flex-column justify-content-center mb-4 mb-lg-0">
                        <h1 className="display-3 fw-bold mb-4" style={{ color: themeColor, lineHeight: '1.2', transition: 'color 0.5s ease' }}>
                            All Your <br />
                            Sports, All In <br />
                            One Place
                        </h1>
                        <p className="text-muted fs-5 mb-0">Check Schedules, Book Tickets,</p>
                        <p className="text-muted fs-5">And Join The Fan Community For KBO And K-League</p>
                    </div>

                    <div className="col-lg-5">
                        <div className="card p-4 h-100" style={styles.glassCard}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold m-0">My Page</h4>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="로그아웃">
                                    <LogOut size={16} />
                                </button>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-4">
                                <div style={styles.profileAvatar}>
                                    {userInfo.nickname ? userInfo.nickname[0] : <User />}
                                </div>
                                <h5 className="fw-bold">{userInfo.nickname}</h5>
                            </div>

                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <div onClick={() => openPanel('news')} style={styles.actionButton}>
                                        <Bell className="me-2" size={20} style={{color: themeColor}}/> 새 소식 (3)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={() => openPanel('message')} style={styles.actionButton}>
                                        <MessageSquare className="me-2" size={20} style={{color: themeColor}}/> 쪽지 (5)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={handleAccountManage} style={styles.actionButton}>
                                        <Settings className="me-2" size={20} style={{color: themeColor}}/> 내 정보 관리
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div style={styles.actionButton}>
                                        <Users className="me-2" size={20} style={{color: themeColor}}/> 팀 팔로우
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-3 border-top">
                                <div style={styles.actionButton}>
                                    <HelpCircle className="me-2" size={20} /> 고객 센터
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 섹션 (경기일정, 인기글) - 복구됨 */}
                <div className="row g-4">
                    {/* 경기 일정 카드 */}
                    <div className="col-lg-5">
                        <div className="card p-4 border-0 shadow-sm" style={{ ...styles.glassCard, minHeight: '400px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                             <h4 className="fw-bold mb-4">경기일정</h4>
                             <div className="d-flex flex-column gap-3">
                                {matchSchedule.map((match) => (
                                    <div key={match.id} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                        <div className="d-flex align-items-center gap-2" style={{width: '35%'}}>
                                            <span className="fs-5">{match.homeLogo}</span>
                                            <span className="fw-semibold text-truncate">{match.home}</span>
                                        </div>
                                        <div className="text-center text-muted small" style={{width: '30%'}}>
                                            <span className="fw-bold text-dark">{match.time}</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end gap-2" style={{width: '35%'}}>
                                            <span className="fw-semibold text-truncate">{match.away}</span>
                                            <span className="fs-5">{match.awayLogo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 인기 게시글 카드 */}
                    <div className="col-lg-7">
                        <div className="card p-4 border-0 shadow-sm" style={{ ...styles.glassCard, minHeight: '400px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                            <h4 className="fw-bold mb-4">인기 게시글</h4>
                            <div className="d-flex flex-column gap-3">
                                {popularPosts.map((post, index) => (
                                    <div key={post.id} className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center text-truncate">
                                            <span className="fw-bold me-3 text-muted">{index + 1}.</span>
                                            <span className="text-truncate fw-medium">{post.title}</span>
                                        </div>
                                        <span className="text-muted small ms-2">{post.views}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Panel (사이드바) - 복구됨 */}
            <div className={`position-fixed top-0 start-0 w-100 h-100 bg-dark ${showPanel ? 'visible' : 'invisible'}`}
                style={{ zIndex: 1050, opacity: showPanel ? 0.5 : 0, transition: 'opacity 0.3s' }}
                onClick={closePanel}></div>

            <div className="position-fixed top-0 h-100 bg-white shadow-lg p-4"
                style={{ width: 'min(100%, 400px)', right: showPanel ? '0' : '-100%', transition: 'right 0.3s cubic-bezier(0.25, 1, 0.5, 1)', zIndex: 1060, overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="m-0 fw-bold d-flex align-items-center" style={{ color: themeColor }}>
                        <panelContent.Icon size={24} className="me-2" />
                        {panelContent.title}
                    </h5>
                    <button className="btn btn-link p-0 text-dark" onClick={closePanel}><X size={24} /></button>
                </div>
                <div className="list-group list-group-flush">
                    {panelContent.list.map((item, index) => (
                        <div key={index} className="list-group-item border-0 p-3 rounded-3 mb-2 bg-light">
                            <div className="d-flex justify-content-between mb-1">
                                <span className="fw-bold text-truncate">{item.label}</span>
                                <small className="text-muted">{item.date}</small>
                            </div>
                            {item.sub && <small className="text-muted">{item.sub}</small>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;