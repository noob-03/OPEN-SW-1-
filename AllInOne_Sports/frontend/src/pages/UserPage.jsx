import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAccess } from "../util/fetchUtil";
import { LogOut, User, MessageSquare, Bell, Users, HelpCircle, ArrowLeft, Loader2 } from 'lucide-react'; 

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

/**
 * MyPage 컴포넌트
 * 로그인된 사용자의 상세 정보를 백엔드에서 불러와 표시합니다.
 */
function MyPage() {
    const navigate = useNavigate();
    // userInfo 상태가 API 응답 구조를 따르도록 변경 (username, nickname, email 포함)
    const [userInfo, setUserInfo] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // --- API 요청 로직 통합 ---
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        
        if (!accessToken) {
            // 토큰이 없으면 로그인 페이지로 리다이렉트
            navigate('/');
            return;
        }

        const fetchUserInfo = async () => {
            setIsLoading(true);
            setError('');

            try {
                const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error("유저 정보 불러오기 실패");
                }

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
    
    // 로그아웃 이벤트
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // 로그아웃 후 로그인 페이지로 이동
      navigate('/login'); 
    };
    
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
        transition: 'color 0.2s, transform 0.2s',
    };
    
    const avatarStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #6C80FF, #BCD9FF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    };
    // --- 스타일 정의 끝 ---

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#F0F4F8' }}>
                <div className="text-center p-5 rounded-4 shadow-sm bg-white">
                    <Loader2 size={48} className="text-primary animate-spin" style={{ color: '#6C80FF' }} />
                    <p className="mt-3 fw-semibold text-muted">사용자 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#F0F4F8' }}>
                <div className="text-center p-5 rounded-4 shadow-lg bg-white">
                    <h5 className="text-danger fw-bold">오류 발생</h5>
                    <p className="text-muted">{error}</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary mt-3" style={{backgroundColor: '#6C80FF', borderColor: '#6C80FF'}}>로그인 페이지로 돌아가기</button>
                </div>
            </div>
        );
    }

    if (!userInfo) {
        // 이미 useEffect에서 리다이렉트 처리했지만, 데이터가 없는 경우를 대비
        return <div className="text-center mt-5">로그인이 필요합니다.</div>;
    }
    
    // API에서 받은 실제 데이터만 사용하도록 메뉴 항목을 조정
    const menuItems = [
        { icon: Bell, label: "새 소식", link: "#" },
        { icon: MessageSquare, label: "쪽지 함", link: "#" },
        { icon: User, label: "내 정보 관리", link: "#" },
        { icon: Users, label: "팀 팔로우", link: "#" },
    ];

    return (
        <div className="container-fluid p-0" style={{ backgroundColor: '#F0F4F8', minHeight: '100vh' }}>
            
            {/* 상단 헤더 영역 */}
            <div className="bg-white shadow-sm p-4 d-flex justify-content-between align-items-center">
                <button onClick={() => navigate(-1)} className="btn btn-link p-0" style={{ color: '#333' }}>
                    <ArrowLeft size={24} />
                </button>
                <h4 className="m-0 fw-bold">My Page</h4>
                <div style={{ width: '24px' }}></div> {/* 정렬을 위한 더미 요소 */}
            </div>

            <div className="d-flex justify-content-center py-5">
                <div className="card shadow-lg border-0" style={{ width: '90%', maxWidth: '600px', borderRadius: '1.5rem', padding: '2rem' }}>
                    
                    {/* 프로필 섹션 */}
                    <div className="card-body text-center p-0 mb-4">
                        <div className="d-flex flex-column align-items-center mb-4">
                            <div style={avatarStyle}>
                                {/* 닉네임의 첫 글자를 아바타에 표시 */}
                                <span className="fw-bold">{userInfo.nickname ? userInfo.nickname[0] : <User size={60} strokeWidth={2} />}</span>
                            </div>
                            <h2 className="fw-bold mb-1">{userInfo.nickname}</h2>
                            <p className="text-muted small">{userInfo.email}</p>
                        </div>
                    </div>

                    {/* 메뉴 섹션 (4개 그리드) */}
                    <div className="row row-cols-2 row-cols-sm-4 g-0 text-center border-top border-bottom py-3 mb-4">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div className="col" key={index}>
                                    <a href={item.link} style={iconButtonStyle}>
                                        <Icon size={32} className="mb-2" style={{ color: '#6C80FF' }} />
                                        <span>{item.label}</span>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* 기타 옵션 및 로그아웃 */}
                    <div className="list-group list-group-flush">
                        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center fw-semibold">
                            <span className='d-flex align-items-center'><HelpCircle size={20} className="me-3 text-muted" /> 고객 센터</span>
                            <span className="text-muted">&gt;</span>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center fw-semibold">
                            <span className='d-flex align-items-center'><Bell size={20} className="me-3 text-muted" /> 알림 설정</span>
                            <span className="text-muted">&gt;</span>
                        </a>
                    </div>
                    
                    {/* 로그아웃 버튼 */}
                    <div className="d-grid mt-4">
                        <button onClick={handleLogout} className="btn btn-outline-secondary fw-semibold" 
                            style={{ borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                            <LogOut size={18} className="me-2" style={{ verticalAlign: 'middle' }} />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;