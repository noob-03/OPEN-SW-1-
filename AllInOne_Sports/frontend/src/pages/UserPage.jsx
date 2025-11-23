import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, MessageSquare, Bell, Users, HelpCircle, ArrowLeft, Loader2, Settings, X } from 'lucide-react';

// .env로 부터 백엔드 URL 받아오기 (실제 환경에 맞게 조정하세요)
const BACKEND_API_BASE_URL = 'http://localhost:8080';

/**
 * MyPage 컴포넌트
 * 로그인된 사용자의 상세 정보를 백엔드에서 불러와 표시하며, 사이드 패널 기능을 제공합니다.
 */
function MyPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // --- 사이드 패널 상태 관리 ---
    const [showPanel, setShowPanel] = useState(false);
    const [panelType, setPanelType] = useState('news'); // 'news' 또는 'message'

    // --- 목업 데이터 (패널 내용) ---
    const newsData = [
        { id: 1, text: "새로운 이벤트 'All-in-One 페스티벌'이 시작되었습니다!", date: "2025-11-20" },
        { id: 2, text: "시스템 업데이트 공지: 2025년 12월 1일 새벽 2시", date: "2025-11-15" },
        { id: 3, text: "쪽지 3건이 도착했습니다.", date: "2025-11-10" },
    ];
    const messageData = [
        { id: 1, sender: "운영팀", text: "가입을 환영합니다! 이용 가이드 확인해주세요.", date: "2025-11-20" },
        { id: 2, sender: "김철수", text: "오늘 경기 같이 보러 가실래요?", date: "2025-11-18" },
        { id: 3, sender: "이영희", text: "팀 팔로우 요청이 도착했습니다.", date: "2025-11-17" },
    ];

    const panelContent = useMemo(() => {
        if (panelType === 'news') {
            return {
                title: "새 소식",
                Icon: Bell,
                list: newsData.map(d => ({ ...d, label: d.text, sub: d.date }))
            };
        }
        return {
            title: "쪽지함",
            Icon: MessageSquare,
            list: messageData.map(d => ({ ...d, label: d.sender, sub: d.text, date: d.date }))
        };
    }, [panelType]);

    // --- 패널 열기/닫기 핸들러 ---
    const openPanel = (type) => {
        setPanelType(type);
        setShowPanel(true);
    };
    const closePanel = () => {
        setShowPanel(false);
    };

    // --- API 요청 로직 통합 ---
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigate('/', { replace: true });
            return;
        }

        const fetchUserInfo = async () => {
            setIsLoading(true);
            setError('');

            try {
                const res = await fetch(`${BACKEND_API_BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (res.status === 401) { // 토큰 만료 등 인증 오류
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate('/', { state: { message: '세션이 만료되었습니다.' }, replace: true });
                    return;
                }

                if (!res.ok) {
                    throw new Error("유저 정보 불러오기 실패");
                }

                const data = await res.json();
                setUserInfo(data);

            } catch (err) {
                console.error("User Info Fetch Error:", err);
                setError("유저 정보를 불러오지 못했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();

    }, [navigate]);

    // --- 로그아웃 및 페이지 이동 ---
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // App.jsx에서 리다이렉트되도록 새로고침 (가장 안전한 방식)
      window.location.href = '/';
    };

    // ✅ 내 정보 관리 페이지로 이동
    const handleAccountManage = () => {
        navigate('/account');
    }

    // --- 스타일 정의 ---
    const iconButtonStyle = {
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer', // 버튼처럼 보이게
        transition: 'background-color 0.2s',
    };

    const avatarStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #6C80FF, #BCD9FF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '1rem',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    };
    // --- 스타일 정의 끝 ---

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#F0F4F8' }}>
                {/* 로딩 UI */}
            </div>
        );
    }

    if (error) {
         return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#F0F4F8' }}>
                {/* 에러 UI */}
            </div>
        );
    }

    const MyPageCard = (
        <div className="card shadow-lg border-0" style={{ maxWidth: '350px', borderRadius: '1.5rem', padding: '1.5rem' }}>
            <h4 className="fw-bold mb-3 text-center">My Page</h4>
            <div className="card-body text-center p-0 mb-4">
                <div className="d-flex flex-column align-items-center mb-4">
                    <div style={avatarStyle}>
                        <span className="fw-bold">{userInfo.nickname ? userInfo.nickname[0] : <User size={50} strokeWidth={2} />}</span>
                    </div>
                    <h5 className="fw-bold mb-1">{userInfo.nickname || "사용자명"}</h5>
                </div>
            </div>

            {/* 메뉴 섹션 (2x2 그리드) */}
            <div className="row row-cols-2 g-0 text-center border-top border-bottom py-2">

                {/* 새 소식 버튼 */}
                <div className="col" onClick={() => openPanel('news')}>
                    <div style={iconButtonStyle}>
                        <Bell size={24} className="mb-2" style={{ color: '#6C80FF' }} />
                        <span>새 소식 (3)</span>
                    </div>
                </div>

                {/* 쪽지함 버튼 */}
                <div className="col" onClick={() => openPanel('message')}>
                    <div style={iconButtonStyle}>
                        <MessageSquare size={24} className="mb-2" style={{ color: '#6C80FF' }} />
                        <span>쪽지 (6)</span>
                    </div>
                </div>

                {/* 내 정보 관리 버튼 */}
                <div className="col" onClick={handleAccountManage}>
                    <div style={iconButtonStyle}>
                        <Settings size={24} className="mb-2" style={{ color: '#6C80FF' }} /> {/* ✅ Settings 아이콘으로 변경 */}
                        <span>내 정보 관리</span>
                    </div>
                </div>

                {/* 팀 팔로우 버튼 */}
                <div className="col">
                    <div style={iconButtonStyle}>
                        <Users size={24} className="mb-2" style={{ color: '#6C80FF' }} />
                        <span>팀 팔로우</span>
                    </div>
                </div>
            </div>

            {/* 고객센터 */}
            <div className="list-group list-group-flush mt-3">
                <a href="#" className="list-group-item list-group-item-action d-flex align-items-center fw-semibold py-2" style={{border: 'none'}}>
                    <HelpCircle size={18} className="me-2 text-muted" />
                    고객 센터
                </a>
            </div>

        </div>
    );

    // --- 슬라이드 패널 렌더링 ---
    const SidePanel = (
        <>
            {/* 오버레이 (배경 어둡게) */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 bg-dark transition-opacity ${showPanel ? 'opacity-50 visible' : 'opacity-0 invisible'}`}
                style={{ zIndex: 1050, transition: 'opacity 0.3s' }}
                onClick={closePanel}
            ></div>

            {/* 실제 슬라이드 패널 */}
            <div
                className="position-fixed top-0 h-100 bg-white shadow-lg p-4"
                style={{
                    width: 'min(100%, 400px)',
                    right: showPanel ? '0' : '-400px',
                    transition: 'right 0.3s ease-out',
                    zIndex: 1060,
                }}
            >
                <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="m-0 fw-bold d-flex align-items-center">
                        <panelContent.Icon size={24} className="me-2" style={{ color: '#6C80FF' }} />
                        {panelContent.title}
                    </h5>
                    <button className="btn btn-link p-0" onClick={closePanel} style={{ color: '#333' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* 패널 내용 */}
                <div className="list-group list-group-flush">
                    {panelContent.list.map((item, index) => (
                        <div key={index} className="list-group-item list-group-item-action border-0 p-3" style={{ cursor: 'pointer' }}>
                            <div className="d-flex justify-content-between">
                                <p className="mb-1 fw-semibold text-truncate">{item.label}</p>
                                <small className="text-muted ms-3">{item.date}</small>
                            </div>
                            <small className="text-muted text-truncate">{item.sub}</small>
                        </div>
                    ))}
                    {panelContent.list.length === 0 && (
                        <p className="text-center text-muted mt-5">받은 내용이 없습니다.</p>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <div className="container-fluid p-0" style={{ minHeight: '100vh', paddingTop: '50px' }}>
            {/* ... (이전 메인 콘텐츠는 생략) ... */}

            {/* MyPage 카드 위치 */}
            <div className="position-absolute top-0 end-0 me-5 mt-5">
                {MyPageCard}
            </div>

            {/* 슬라이드 패널 */}
            {SidePanel}

            {/* 임시 메인 콘텐츠 표시 (원래의 All Your Sports...) */}
            <div className="row g-0">
                <div className="col-lg-6 p-5">
                    <h1 className="display-4 fw-bold" style={{ color: '#2B3990' }}>All Your Sports,<br/>All In One Place</h1>
                    {/* ... (나머지 콘텐츠) ... */}
                </div>
                <div className="col-lg-6 bg-light" style={{ minHeight: '80vh' }}>
                    {/* 우측 배경 */}
                </div>
            </div>
        </div>
    );
}

export default MyPage;