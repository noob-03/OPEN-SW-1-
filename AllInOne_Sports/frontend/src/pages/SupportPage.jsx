import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Paperclip, Send } from 'lucide-react';

function SupportPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // 폼 상태
    const [isMember, setIsMember] = useState(false); // false: 비회원, true: 회원
    const [formData, setFormData] = useState({
        name: '',
        emailUser: '',
        emailDomain: 'naver.com',
        category: '',
        title: '',
        content: '',
        file: null
    });

    // 요청하신 문의 분류 옵션
    const categories = [
        '스포츠 데이터 문의',
        '제휴 및 문의하기',
        '장애 및 오류 문의',
        '사용자 신고하기'
    ];

    // 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 유효성 검사
        if (!formData.name || !formData.emailUser || !formData.category || !formData.title || !formData.content) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        // API 호출 시뮬레이션
        console.log('문의 접수 데이터:', {
            ...formData,
            email: `${formData.emailUser}@${formData.emailDomain}`,
            memberType: isMember ? '회원' : '비회원'
        });

        alert('문의가 성공적으로 접수되었습니다.\n빠른 시일 내에 답변 드리겠습니다.');
        navigate(-1); // 뒤로 가기
    };

    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
            
            {/* 헤더 */}
            <div className="d-flex align-items-center gap-3 mb-5 border-bottom pb-3">
                <button onClick={() => navigate(-1)} className="btn btn-link p-0 text-dark">
                    <ArrowLeft size={28} />
                </button>
                <h2 className="fw-bold m-0">문의하기</h2>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                
                <div className="mb-4">
                    <ul className="small text-muted ps-3 mb-4">
                        <li>(필수) 항목은 반드시 입력해주셔야 문의 접수가 가능합니다.</li>
                        <li>적어주신 정보는 문의처리를 위한 용도로만 이용됩니다.</li>
                        <li>접수된 문의는 평일 기준 24시간 이내에 순차적으로 답변 드립니다.</li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit}>
                    
                    {/* 회원 여부 */}
                    <div className="row mb-4 align-items-center">
                        <label className="col-sm-3 col-form-label fw-bold">회원 여부</label>
                        <div className="col-sm-9 d-flex gap-4">
                            <div className="form-check">
                                <input 
                                    className="form-check-input" type="radio" name="memberType" id="member" 
                                    checked={isMember} onChange={() => setIsMember(true)} 
                                />
                                <label className="form-check-label" htmlFor="member">회원</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" type="radio" name="memberType" id="nonMember" 
                                    checked={!isMember} onChange={() => setIsMember(false)} 
                                />
                                <label className="form-check-label" htmlFor="nonMember">비회원</label>
                            </div>
                        </div>
                    </div>

                    {/* 이름 (필수) */}
                    <div className="row mb-4">
                        <label className="col-sm-3 col-form-label fw-bold text-primary">이름(필수)</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" className="form-control" placeholder="이름을 입력해주세요."
                                name="name" value={formData.name} onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* 이메일 (필수) */}
                    <div className="row mb-4">
                        <label className="col-sm-3 col-form-label fw-bold text-primary">답변 받을 이메일(필수)</label>
                        <div className="col-sm-9">
                            <div className="input-group">
                                <input 
                                    type="text" className="form-control" 
                                    name="emailUser" value={formData.emailUser} onChange={handleChange}
                                />
                                <span className="input-group-text bg-white border-start-0 border-end-0">@</span>
                                <input 
                                    type="text" className="form-control" 
                                    name="emailDomain" value={formData.emailDomain} onChange={handleChange}
                                />
                                <select 
                                    className="form-select" style={{maxWidth: '140px'}}
                                    onChange={(e) => setFormData(prev => ({...prev, emailDomain: e.target.value}))}
                                    value={formData.emailDomain}
                                >
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="">직접입력</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="my-5 text-muted opacity-25" />

                    {/* 문의 분류 (필수) */}
                    <div className="row mb-4">
                        <label className="col-sm-3 col-form-label fw-bold text-primary">문의 분류(필수)</label>
                        <div className="col-sm-9">
                            <select 
                                className="form-select" 
                                name="category" value={formData.category} onChange={handleChange}
                            >
                                <option value="">선택해 주세요</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 제목 (필수) */}
                    <div className="row mb-4">
                        <label className="col-sm-3 col-form-label fw-bold text-primary">제목(필수)</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" className="form-control" placeholder="제목을 입력하세요."
                                name="title" value={formData.title} onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* 내용 (필수) */}
                    <div className="row mb-4">
                        <label className="col-sm-3 col-form-label fw-bold text-primary">내용(필수)</label>
                        <div className="col-sm-9">
                            <textarea 
                                className="form-control" rows="10" 
                                placeholder="문의하실 내용을 자세히 적어주세요."
                                style={{ resize: 'none' }}
                                name="content" value={formData.content} onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    {/* 첨부파일 (선택) */}
                    <div className="row mb-5">
                        <label className="col-sm-3 col-form-label fw-bold">첨부</label>
                        <div className="col-sm-9">
                            <div 
                                className="border rounded-3 p-2 text-center cursor-pointer hover-bg-light transition-all"
                                onClick={() => fileInputRef.current.click()}
                                style={{ borderStyle: 'dashed !important', borderColor: '#ced4da' }}
                            >
                                {formData.file ? (
                                    <div className="text-primary fw-bold">{formData.file.name}</div>
                                ) : (
                                    <div className="text-muted d-flex align-items-center justify-content-center gap-2 py-2">
                                        <Paperclip size={18}/> + 첨부파일 추가 (선택)
                                    </div>
                                )}
                                <input 
                                    type="file" className="d-none" ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                />
                            </div>
                            <div className="form-text small mt-2">
                                첨부한 파일의 전체 크기는 10Mbyte 미만이어야 합니다.<br/>
                                이미지(jpg, png) 또는 문서(pdf) 파일만 업로드 가능합니다.
                            </div>
                        </div>
                    </div>

                    {/* 버튼 */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-dark btn-lg px-5 rounded-pill fw-bold">
                            문의 접수
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default SupportPage;