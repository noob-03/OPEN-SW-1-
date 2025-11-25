import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAccess } from "../util/fetchUtil";
import { LogOut, User, MessageSquare, Bell, Users, HelpCircle, Settings, X, Loader2 } from 'lucide-react';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function MainPage({ sportMode }) {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState('news');

    const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

    /* 🔹 사용자 정보 불러오기 */
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
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) throw new Error("유저 정보 불러오기 실패");

                const data = await res.json();
                setUserInfo(data);
            } catch (err) {
                setError("유저 정보를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    /* 🔹 Mock Data */
    const matchSchedule = [
        { id: 1, time: "01:30", home: "아스날", away: "토트넘", homeLogo: "🔴", awayLogo: "⚪" },
        { id: 2, time: "01:30", home: "프랑크", away: "우니온", homeLogo: "🦅", awayLogo: "🐻" },
        { id: 3, time: "04:30", home: "인터밀란", away: "AC밀란", homeLogo: "🔵", awayLogo: "🔴" },
        { id: 4, time: "05:00", home: "엘체", away: "레알마드", homeLogo: "🟢", awayLogo: "👑" },
    ];

    const popularPosts = [
        { id: 1, title: "진짜 역대급 미친 경기력ㄷㄷ...", views: 100 },
        { id: 2, title: "아스날 새 유니폼 바코드 논란", views: 100 },
        { id: 3, title: "첼시 포체티노 전술 만족하나요?", views: 100 },
        { id: 4, title: "(속보) 음바페 사우디 접촉 중...", views: 100 },
        { id: 5, title: "이강인 팬서비스 직찍 공유합니다", views: 100 },
    ];

    const newsData = [
        { id: 1, text: "All-in-One 페스티벌이 시작되었습니다!", date: "2025-11-20" },
        { id: 2, text: "12/1 시스템 업데이트 예정", date: "2025-11-15" },
        { id: 3, text: "쪽지 3건이 도착했습니다.", date: "2025-11-10" },
    ];

    /* 🔹 알림/새 소식 패널 */
    const panelContent = useMemo(() => {
        if (panelType === 'news') {
            return {
                title: "새 소식",
                Icon: Bell,
                list: newsData.map(d => ({ label: d.text, sub: d.date }))
            };
        }
        return { title: "알림", Icon: Bell, list: [] };
    }, [panelType]);

    const openPanel = (type) => {
        setPanelType(type);
        setShowPanel(true);
    };

    const closePanel = () => setShowPanel(false);

    /* 🔹 핸들러 */
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new Event('login-status-change'));
        navigate('/login');
    };

    const handleAccountManage = () => navigate('/account');

    const handleMessagePage = () => navigate('/message');

    /* 🔹 스타일 오브젝트 */
    const styles = {
        glassCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '1.5rem',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(4px)',
        },
        profileAvatar: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${themeColor}, #BCD9FF)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            marginBottom: '1rem',
            transition: 'background 0.5s ease',
        },
        actionButton: {
            border: 'none',
            background: 'transparent',
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#333',
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* 배경 */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: -1,
                background:
                    sportMode === 'soccer'
                        ? 'radial-gradient(circle at top left, #FFFFFF, #BCD9FF)'
                        : 'radial-gradient(circle at top left, #FFFFFF, #FFC2C2)',
                transition: 'background 0.5s ease-in-out'
            }} />

            <div className="container" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
                <div className="row align-items-center mb-5">
                    <div className="col-lg-7">
                        <h1 className="display-3 fw-bold mb-4" style={{ color: themeColor }}>
                            All Your <br /> Sports, All In <br /> One Place
                        </h1>
                        <p className="text-muted fs-5 mb-0">Check Schedules, Book Tickets,</p>
                        <p className="text-muted fs-5">And Join The Fan Community</p>
                    </div>

                    {/* My Page */}
                    <div className="col-lg-5">
                        <div className="card p-4" style={styles.glassCard}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-bold m-0">My Page</h4>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2">
                                    <LogOut size={16} />
                                </button>
                            </div>

                            <div className="d-flex flex-column align-items-center mb-4">
                                <div style={styles.profileAvatar}>
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        userInfo.nickname ? userInfo.nickname[0].toUpperCase() : <User />
                                    )}
                                </div>

                                <h5 className="fw-bold">
                                    {isLoading ? "Loading..." : (userInfo.nickname || "User")}
                                </h5>
                            </div>

                            {/* 버튼 리스트 */}
                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <div onClick={() => openPanel('news')} style={styles.actionButton}>
                                        <Bell className="me-2" size={20} style={{ color: themeColor }} /> 새 소식 (3)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={handleMessagePage} style={styles.actionButton}>
                                        <MessageSquare className="me-2" size={20} style={{ color: themeColor }} /> 쪽지 (5)
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div onClick={handleAccountManage} style={styles.actionButton}>
                                        <Settings className="me-2" size={20} style={{ color: themeColor }} /> 내 정보 관리
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div style={styles.actionButton}>
                                        <Users className="me-2" size={20} style={{ color: themeColor }} /> 팀 팔로우
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

                {/* 경기 일정 + 인기 게시글 */}
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="card p-4 border-0 shadow-sm" style={styles.glassCard}>
                            <h4 className="fw-bold mb-4">경기일정</h4>
                            <div className="d-flex flex-column gap-3">
                                {matchSchedule.map(match => (
                                    <div key={match.id} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                                        <div className="d-flex align-items-center gap-2" style={{ width: '35%' }}>
                                            <span className="fs-5">{match.homeLogo}</span>
                                            <span className="fw-semibold text-truncate">{match.home}</span>
                                        </div>
                                        <div className="text-center text-muted small" style={{ width: '30%' }}>
                                            <span className="fw-bold text-dark">{match.time}</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end gap-2" style={{ width: '35%' }}>
                                            <span className="fw-semibold text-truncate">{match.away}</span>
                                            <span className="fs-5">{match.awayLogo}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card p-4 border-0 shadow-sm" style={styles.glassCard}>
                            <h4 className="fw-bold mb-4">인기 게시글</h4>
                            <div className="d-flex flex-column gap-3">
                                {popularPosts.map((post, index) => (
                                    <div key={post.id} className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center text-truncate">
                                            <span className="fw-bold me-3 text-muted">{index + 1}.</span>
                                            <span className="text-truncate fw-medium">{post.title}</span>
                                        </div>
                                        <span className="text-muted small">{post.views}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 오른쪽 패널 */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 bg-dark ${showPanel ? 'visible' : 'invisible'}`}
                style={{ zIndex: 1050, opacity: showPanel ? 0.5 : 0, transition: 'opacity 0.3s' }}
                onClick={closePanel}
            />

            <div className="position-fixed top-0 h-100 bg-white shadow-lg p-4"
                style={{
                    width: 'min(100%, 400px)',
                    right: showPanel ? '0' : '-100%',
                    transition: 'right 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    zIndex: 1060,
                    overflowY: 'auto'
                }}>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="fw-bold m-0 d-flex align-items-center" style={{ color: themeColor }}>
                        <panelContent.Icon size={24} className="me-2" />
                        {panelContent.title}
                    </h5>
                    <button className="btn btn-link p-0" onClick={closePanel}>
                        <X size={24} />
                    </button>
                </div>

                <div className="list-group list-group-flush">
                    {panelContent.list.map((item, index) => (
                        <div key={index} className="list-group-item border-0 p-3 mb-2 bg-light rounded-3">
                            <span className="fw-bold">{item.label}</span>
                            <div className="text-muted small mt-1">{item.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
