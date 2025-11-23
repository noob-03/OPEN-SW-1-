import React, { useState, useEffect } from 'react'; // 💡 useState, useEffect 임포트 추가
import { useNavigate } from 'react-router-dom';

// .env로 부터 백엔드 URL 받아오기 (HomePage에서 사용하셨던 환경 변수 정의)
// ⚠️ 실제 프로젝트에서는 이 변수를 사용하는 컴포넌트에서만 정의하거나, 
//    Global Config 파일에서 가져와야 합니다.
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function JoinPage() {

  const navigate = useNavigate();

  // 로그인 페이지로 돌아가는 함수
  const handleSignIn = () => {
    navigate('/'); // 루트 경로로 이동 (로그인 페이지)
  };

  const rightColumnStyle = {
    backgroundImage: 'linear-gradient(to left, #FFFFFF 0%, #BCD9FF 100%)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '300px',
    minHeight: '100vh'
  };

  const leftColumnStyle = {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '5rem',
    paddingTop: '350px',
    minHeight: '100vh'
  };

    // 회원가입 변수
    const [username, setUsername] = useState("");
    const [isUsernameValid, setIsUsernameValid] = useState(null); // null: 검사 전, true: 사용 가능, false: 중복
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // username 입력창 변경 이벤트
    useEffect(() => {
        // ID 입력이 없으면 중복 확인을 건너뜁니다.
        if (username.length === 0) {
            setIsUsernameValid(null);
            return;
        }

        // username 중복 확인 함수
        const checkUsername = async () => {

            if (username.length < 4) {
                setIsUsernameValid(null);
                return;
            }

            try {
                // Spring Boot 백엔드의 사용자 존재 여부 확인 API 호출
                const res = await fetch(`${BACKEND_API_BASE_URL}/user/exist`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ username }),
                });

                // 응답 처리
                const exists = await res.json();
                setIsUsernameValid(!exists); // exists가 true면 (존재하면) !exists는 false (사용 불가)
            } catch (err) {
                // 네트워크 오류 또는 서버 응답 실패 시
                console.error("ID 중복 확인 중 오류 발생:", err);
                // 오류 발생 시 중복 확인 상태를 일시적으로 비활성화
                setIsUsernameValid(false); 
            }
        };

        // 300ms 지연 후 중복 확인 (디바운싱)
        const delay = setTimeout(checkUsername, 300);
        return () => clearTimeout(delay); // 이전 타이머 클리어
    }, [username]);

    // 회원 가입 이벤트 핸들러
    const handleSignUp = async (e) => {

        e.preventDefault();
        setError("");

        if (!isUsernameValid) {
             setError("아이디 중복 확인이 필요하거나, 아이디를 사용할 수 없습니다.");
             return;
        }
        
        // 간단한 클라이언트 측 유효성 검사
        if (
            password.length < 4 ||
            nickname.trim() === "" ||
            email.trim() === ""
        ) {
            setError("입력값을 다시 확인해주세요. (비밀번호는 최소 4자, 나머지 항목은 필수)");
            return;
        }

        try {
            // Spring Boot 백엔드로 회원가입 요청
            const res = await fetch(`${BACKEND_API_BASE_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password, nickname, email }),
            });

            if (res.status === 409) { // 409 Conflict: 중복 에러 등
                setError("이미 사용 중인 정보(아이디/이메일)가 존재합니다.");
            } else if (!res.ok) {
                 throw new Error(`회원가입 실패: 상태 코드 ${res.status}`);
            } else {
                 // 회원가입 성공
                 navigate("/"); // 성공 시 로그인 페이지로 이동
            }
            
        } catch (err) {
            console.error("회원가입 API 호출 오류:", err);
            setError("회원가입 중 서버 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };


  return (
    // 전체 레이아웃 (HomePage와 동일)
    <section className="container-fluid p-0 overflow-hidden">
      <div className="row g-0">

        {/* 왼쪽: 텍스트 영역 (HomePage와 동일한 디자인 요소) */}
        <div className="col-lg-6" style={leftColumnStyle}>
          <div>
            <h1 className="hero-title">All Your Sports,<br/>All In One Place</h1>
            <p className="lead hero-subtitle">
              Check Schedules, Book Tickets,<br/>
              And Join The Fan Community<br/>
              For KBO And K-League
            </p>
          </div>
        </div>

        {/* 오른쪽: 회원가입 폼 영역 (Sign In 폼 대체) */}
        <div className="col-lg-6" style={rightColumnStyle}>
          <div className="card shadow-lg border-0 rounded-4" style={{ width: '80%', maxWidth: '450px' }}>
            <div className="card-body p-4 p-md-5">
              
              <h3 className="text-center mb-4 fw-bold">Sign Up</h3>
              
              {/* 오류 메시지 표시 */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Spring Boot 백엔드와 연동될 폼 */}
              <form onSubmit={handleSignUp}>
                
                {/* 1. 아이디 입력 필드 (중복 확인 피드백 추가) */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="username" 
                    className={`form-control form-control-lg ${isUsernameValid === true ? 'is-valid' : isUsernameValid === false ? 'is-invalid' : ''}`}
                    placeholder="아이디 (최소 4자)" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={4}
                    style={{backgroundColor: '#F0F4F8', border: 'none'}} />
                    
                    {/* 피드백 메시지 */}
                    {username.length > 0 && isUsernameValid === false && username.length >= 4 && (
                        <div className="invalid-feedback">
                            이미 사용 중인 아이디입니다.
                        </div>
                    )}
                    {username.length > 0 && isUsernameValid === true && (
                        <div className="valid-feedback">
                            사용 가능한 아이디입니다.
                        </div>
                    )}
                    {username.length > 0 && username.length < 4 && (
                        <div className="invalid-feedback d-block">
                            아이디는 최소 4자 이상이어야 합니다.
                        </div>
                    )}

                </div>
                
                {/* 2. 비밀번호 입력 필드 */}
                <div className="mb-3">
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control form-control-lg" 
                    placeholder="비밀번호 (최소 4자)" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={4}
                    style={{backgroundColor: '#F0F4F8', border: 'none'}} />
                </div>
                
                {/* 3. 닉네임 입력 필드 */}
                <div className="mb-3">
                  <input 
                    type="text" 
                    name="nickname" 
                    className="form-control form-control-lg" 
                    placeholder="닉네임" 
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    style={{backgroundColor: '#F0F4F8', border: 'none'}} />
                </div>
                
                {/* 4. 이메일 입력 필드 */}
                <div className="mb-4">
                  <input 
                    type="email" 
                    name="email" 
                    className="form-control form-control-lg" 
                    placeholder="이메일" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{backgroundColor: '#F0F4F8', border: 'none'}} />
                </div>

                {/* Submit 버튼 (Sign Up) */}
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg fw-semibold" 
                    style={{backgroundColor: '#6C80FF', borderColor: '#6C80FF'}}
                    // 💡 ID 사용 가능(true) 상태일 때만 버튼 활성화
                    disabled={isUsernameValid !== true} 
                    >
                    Sign Up
                  </button>
                </div>
              </form>
              
              <div className="text-center text-muted small my-3">
                이미 계정이 있으신가요? 
                <a href="#" onClick={handleSignIn} className="fw-semibold ms-1" style={{color: '#6C80FF', textDecoration: 'none'}}>
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinPage;