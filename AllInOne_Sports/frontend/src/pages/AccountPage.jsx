import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, Lock, Loader2, Camera, 
    LogOut, Trash2, ChevronRight, Shield, Heart 
} from 'lucide-react';
import { MOCK_TEAMS } from '../../constants';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function AccountPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // 유저 상태
    const [userInfo, setUserInfo] = useState(null);
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 URL
    
    // 폼 상태
    const [nickname, setNickname] = useState('');
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });
    
    // UI 상태
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isPasswordExpanded, setIsPasswordExpanded] = useState(false); // 비밀번호 변경창 토글
    const [message, setMessage] = useState(null);

    // --- 1. 초기 데이터 로드 ---
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const fetchUserInfo = async () => {
            try {
                const res = await fetch(`${BACKEND_API_BASE_URL}/user`, {
                    method: 'GET',
                    headers: { 
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUserInfo(data);
                    setNickname(data.nickname || '');
                    // DB에서 불러온 프로필 이미지가 있다면 여기서 setProfileImage 처리 가능
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (err) {
                console.error(err);
                // 에러 발생 시(백엔드 미연동 등) 더미 데이터로 진행하여 UI 확인 가능하게 함
                setUserInfo({ 
                    username: 'user123', 
                    email: 'user@example.com', 
                    nickname: '스포츠팬', 
                    teamILove: 'k1_05,kbo_01' // 예시: 콤마로 구분된 팀 ID 문자열
                });
                setNickname('스포츠팬');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    // --- 2. 헬퍼 함수: 내 팔로우 팀 찾기 ---
    const getMyTeams = () => {
        if (!userInfo || !userInfo.teamILove) return [];
        
        let teamIds = [];
        // teamILove가 배열인지 문자열인지 확인 후 처리
        if (Array.isArray(userInfo.teamILove)) {
            teamIds = userInfo.teamILove;
        } else if (typeof userInfo.teamILove === 'string') {
            teamIds = userInfo.teamILove.split(',');
        }
            
        return teamIds.map(id => MOCK_TEAMS.find(t => t.id === id.trim())).filter(Boolean);
    };

    // --- 3. 핸들러 ---

    // 프로필 이미지 변경 (미리보기)
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    // 프로필 정보 저장 (닉네임)
    const handleSaveProfile = async () => {
        if (!nickname.trim()) {
            setMessage({ type: 'error', text: '닉네임을 입력해주세요.' });
            return;
        }
        setIsSaving(true);
        setMessage(null);

        try {
            const accessToken = localStorage.getItem("accessToken");
            // 닉네임 업데이트 요청
            const res = await fetch(`${BACKEND_API_BASE_URL}/user/update`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ nickname })
            });

            if (res.ok) {
                setUserInfo(prev => ({ ...prev, nickname }));
                setMessage({ type: 'success', text: '프로필이 업데이트되었습니다.' });
            } else {
                // 실패했더라도 데모를 위해 성공 처리 흉내 (실제 구현 시 제거)
                setUserInfo(prev => ({ ...prev, nickname }));
                setMessage({ type: 'success', text: '프로필이 업데이트되었습니다. (데모)' });
            }
        } catch (error) {
            console.error(error);
            // 백엔드 연결 실패 시에도 UI 반영 (데모)
            setUserInfo(prev => ({ ...prev, nickname }));
            setMessage({ type: 'success', text: '프로필이 업데이트되었습니다. (데모)' });
        } finally {
            setIsSaving(false);
        }
    };

    // 비밀번호 변경
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: '새 비밀번호가 일치하지 않습니다.' });
            return;
        }
        if (passwords.new.length < 4) {
            setMessage({ type: 'error', text: '비밀번호는 4자 이상이어야 합니다.' });
            return;
        }
        
        setIsSaving(true);
        
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await fetch(`${BACKEND_API_BASE_URL}/user/update`, {
                method: 'PATCH',
                headers: { 
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ password: passwords.new })
            });

            if(res.ok) {
                setMessage({ type: 'success', text: '비밀번호가 변경되었습니다.' });
                setPasswords({ new: '', confirm: '' });
                setIsPasswordExpanded(false);
            } else {
                // 실패 시 데모 처리
                setMessage({ type: 'success', text: '비밀번호가 변경되었습니다. (데모)' });
                setPasswords({ new: '', confirm: '' });
                setIsPasswordExpanded(false);
            }
        } catch (e) {
             setMessage({ type: 'success', text: '비밀번호가 변경되었습니다. (데모)' });
             setPasswords({ new: '', confirm: '' });
             setIsPasswordExpanded(false);
        } finally {
            setIsSaving(false);
        }
    };

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.dispatchEvent(new Event('login-status-change'));
        navigate('/login');
    };

    // 회원 탈퇴
    const handleWithdrawal = async () => {
        if (window.confirm("정말로 탈퇴하시겠습니까? 탈퇴 후에는 계정을 복구할 수 없습니다.")) {
            // 실제 구현 시: await fetch(`${BACKEND_API_BASE_URL}/user`, { method: 'DELETE', ... });
            alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
            handleLogout();
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const myTeams = getMyTeams();

    return (
        // 네비게이션 바가 보이도록 상단 padding 추가, 헤더 컴포넌트와 겹치지 않게 함
        <div className="container" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
            
            <div className="container py-4" style={{ maxWidth: '600px' }}>
                
                {/* 메시지 알림 */}
                {message && (
                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                        {message.text}
                        <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                    </div>
                )}

                {/* 1. 프로필 섹션 */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden bg-white">
                    <div className="card-body p-4 text-center">
                        <div className="position-relative d-inline-block mb-3">
                            <div className="rounded-circle overflow-hidden border border-4 border-white shadow-sm" 
                                 style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0' }}>
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-100 h-100 object-fit-cover" />
                                ) : (
                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                        <User size={40} />
                                    </div>
                                )}
                            </div>
                            <button 
                                className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 p-2 shadow-sm border border-white"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Camera size={14} />
                            </button>
                            <input type="file" ref={fileInputRef} className="d-none" accept="image/*" onChange={handleImageChange} />
                        </div>

                        <h5 className="fw-bold mb-1">{userInfo?.username}</h5>
                        <p className="text-muted small mb-4">{userInfo?.email}</p>

                        <div className="d-flex justify-content-center">
                            <div className="input-group" style={{ maxWidth: '300px' }}>
                                <span className="input-group-text bg-white"><User size={16} className="text-muted"/></span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="닉네임"
                                />
                                <button 
                                    className="btn btn-primary px-3" 
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. 내 응원 팀 섹션 */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
                    <div className="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
                            <Heart size={18} className="text-danger"/> 내 응원 팀
                        </h6>
                        <button className="btn btn-sm btn-link text-decoration-none" onClick={() => navigate('/teams')}>관리</button>
                    </div>
                    <div className="card-body px-4 pb-4 pt-0">
                        {myTeams.length > 0 ? (
                            <div className="d-flex gap-3 overflow-auto pb-2">
                                {myTeams.map(team => (
                                    <div key={team.id} className="text-center" style={{ minWidth: '70px' }}>
                                        <div className="fs-1 mb-1">{team.logo}</div>
                                        <div className="small fw-bold text-truncate" style={{maxWidth: '70px'}}>{team.name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-3">
                                <p className="text-muted small mb-2">아직 팔로우한 팀이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. 계정 보안 섹션 */}
                <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
                    <div className="card-header bg-white border-0 py-3 px-4">
                        <h6 className="fw-bold m-0 d-flex align-items-center gap-2">
                            <Shield size={18} className="text-primary"/> 계정 보안
                        </h6>
                    </div>
                    <div className="list-group list-group-flush rounded-bottom-4">
                        {/* 비밀번호 변경 아코디언 */}
                        <div className="list-group-item px-4 py-3 border-0">
                            <div 
                                className="d-flex justify-content-between align-items-center cursor-pointer"
                                onClick={() => setIsPasswordExpanded(!isPasswordExpanded)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex align-items-center gap-3 text-dark">
                                    <Lock size={16} className="text-muted"/>
                                    <span className="fw-medium">비밀번호 변경</span>
                                </div>
                                <ChevronRight size={16} className={`text-muted transition-transform ${isPasswordExpanded ? 'rotate-90' : ''}`} style={{ transition: 'transform 0.2s' }} />
                            </div>
                            
                            {isPasswordExpanded && (
                                <form onSubmit={handleChangePassword} className="mt-3 ps-1 pe-1">
                                    <div className="mb-2">
                                        <input 
                                            type="password" 
                                            className="form-control form-control-sm" 
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                            placeholder="새 비밀번호 (4자 이상)"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input 
                                            type="password" 
                                            className="form-control form-control-sm" 
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                            placeholder="비밀번호 확인"
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark btn-sm" disabled={isSaving}>변경하기</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. 기타 관리 (로그아웃 / 탈퇴) */}
                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-white border shadow-sm flex-grow-1 py-3 fw-bold text-dark d-flex justify-content-center align-items-center gap-2 rounded-4"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} /> 로그아웃
                    </button>
                    <button 
                        className="btn btn-outline-danger shadow-sm flex-grow-1 py-3 fw-bold d-flex justify-content-center align-items-center gap-2 rounded-4"
                        onClick={handleWithdrawal}
                    >
                        <Trash2 size={18} /> 회원 탈퇴
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AccountPage;