import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Loader2, ArrowLeft, Settings, Save, CheckCircle } from 'lucide-react'; // Settings 아이콘 추가

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

/**
 * AccountPage 컴포넌트
 * 사용자 정보를 조회하고, 비밀번호/닉네임을 수정할 수 있는 페이지입니다.
 */
function AccountPage() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        nickname: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: '...' }

    // --- 1. 초기 사용자 정보 불러오기 ---
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            navigate('/login');
            return;
        }

        const fetchUserInfo = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${BACKEND_API_BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (res.status === 401) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate('/login', { state: { message: '세션이 만료되었습니다.' } });
                    return;
                }

                if (!res.ok) {
                    throw new Error("유저 정보 불러오기 실패");
                }

                const data = await res.json();
                setUserInfo(data);
                setFormData(prev => ({ ...prev, nickname: data.nickname || '' }));

            } catch (err) {
                console.error("User Info Fetch Error:", err);
                setMessage({ type: 'error', text: "정보를 불러오지 못했습니다. 다시 시도해 주세요." });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();

    }, [navigate]);

    // --- 2. 폼 입력값 변경 핸들러 ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage(null); // 입력 시 메시지 초기화
    };

    // --- 3. 정보 수정 (닉네임/비밀번호) 요청 핸들러 ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsSaving(true);

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', text: "비밀번호 확인이 일치하지 않습니다." });
            setIsSaving(false);
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        const updates = {};

        // 닉네임 변경 요청 데이터 구성
        if (formData.nickname && userInfo && formData.nickname !== userInfo.nickname) {
            updates.nickname = formData.nickname;
        }

        // 비밀번호 변경 요청 데이터 구성
        if (formData.newPassword) {
            if (formData.newPassword.length < 8) {
                 setMessage({ type: 'error', text: "비밀번호는 최소 8자 이상이어야 합니다." });
                 setIsSaving(false);
                 return;
            }
            updates.password = formData.newPassword;
        }

        if (Object.keys(updates).length === 0) {
             setMessage({ type: 'info', text: "수정할 내용이 없습니다." });
             setIsSaving(false);
             return;
        }

        try {
            const res = await fetch(`${BACKEND_API_BASE_URL}/user/update`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updates),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "정보 수정 실패");
            }

            // 성공 시 닉네임 업데이트 및 비밀번호 초기화
            if (updates.nickname) {
                setUserInfo(prev => ({ ...prev, nickname: updates.nickname }));
            }
            setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));


            setMessage({ type: 'success', text: "정보가 성공적으로 수정되었습니다!" });

        } catch (err) {
            console.error("Update Error:", err);
            setMessage({ type: 'error', text: err.message || "수정 중 오류가 발생했습니다. 다시 시도해 주세요." });
        } finally {
            setIsSaving(false);
        }
    };


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


    return (
        <div className="container-fluid p-0" style={{ backgroundColor: '#F0F4F8', minHeight: '100vh' }}>

            {/* 상단 헤더 영역 */}
            <div className="bg-white shadow-sm p-4 d-flex justify-content-between align-items-center sticky-top">
                <button onClick={() => navigate(-1)} className="btn btn-link p-0" style={{ color: '#333' }}>
                    <ArrowLeft size={24} />
                </button>
                <h4 className="m-0 fw-bold d-flex align-items-center">
                    <Settings size={20} className="me-2 text-muted" /> 내 정보 관리
                </h4>
                <div style={{ width: '24px' }}></div>
            </div>

            <div className="d-flex justify-content-center py-5">
                <div className="card shadow-lg border-0" style={{ width: '90%', maxWidth: '700px', borderRadius: '1.5rem', padding: '2rem' }}>

                    <h5 className="mb-4 text-center fw-bold text-primary" style={{ color: '#6C80FF' }}>계정 정보 수정</h5>

                    {/* 메시지 영역 */}
                    {message && (
                        <div className={`alert alert-${message.type === 'success' ? 'success' : message.type === 'error' ? 'danger' : 'info'} small d-flex align-items-center`} role="alert">
                            {message.type === 'success' && <CheckCircle size={20} className="me-2" />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        {/* 1. 아이디 (수정 불가) */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-muted small">아이디 (수정 불가)</label>
                            <div className="input-group">
                                <span className="input-group-text"><User size={20} /></span>
                                <input
                                    type="text"
                                    className="form-control bg-light"
                                    value={userInfo.username || 'N/A'}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* 2. 이메일 (수정 불가) */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold text-muted small">이메일 (수정 불가)</label>
                            <div className="input-group">
                                <span className="input-group-text"><Mail size={20} /></span>
                                <input
                                    type="email"
                                    className="form-control bg-light"
                                    value={userInfo.email || 'N/A'}
                                    disabled
                                />
                            </div>
                        </div>

                        <hr className="my-4"/>

                        {/* 3. 닉네임 수정 */}
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label fw-semibold">닉네임</label>
                            <div className="input-group">
                                <span className="input-group-text"><User size={20} /></span>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    className="form-control"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                />
                            </div>
                            <small className="form-text text-muted">다른 사용자가 볼 닉네임을 설정합니다.</small>
                        </div>

                        {/* 4. 비밀번호 수정 */}
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label fw-semibold">새 비밀번호</label>
                            <div className="input-group">
                                <span className="input-group-text"><Lock size={20} /></span>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-control"
                                    placeholder="변경하려면 입력하세요 (8자 이상)"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* 5. 비밀번호 확인 */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label fw-semibold">새 비밀번호 확인</label>
                            <div className="input-group">
                                <span className="input-group-text"><Lock size={20} /></span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="새 비밀번호를 다시 입력하세요"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* 저장 버튼 */}
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg fw-semibold d-flex justify-content-center align-items-center"
                                style={{ backgroundColor: '#6C80FF', borderColor: '#6C80FF' }}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin me-2" />
                                        정보 저장 중...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} className="me-2" />
                                        변경 사항 저장
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* 성공 시 돌아가기 버튼 (UX 개선) */}
                    {message && message.type === 'success' && (
                        <div className="d-grid mt-4">
                            <button onClick={() => navigate(-1)} className="btn btn-outline-secondary fw-semibold">
                                My Page로 돌아가기
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AccountPage;