import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAccess } from "../util/fetchUtil";
import { ArrowLeft, Send, Search, MoreHorizontal, Phone, Video, Info } from 'lucide-react';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

// 가짜 대화 목록 데이터
const MOCK_CONVERSATIONS = [
  { id: 1, name: "운영팀", lastMessage: "환영합니다! 이용 가이드를 확인해주세요.", time: "1시간 전", unread: 2, avatar: "O" },
  { id: 2, name: "김철수", lastMessage: "오늘 경기 같이 보러 가실래요?", time: "5시간 전", unread: 0, avatar: "K" },
  { id: 3, name: "이영희", lastMessage: "티켓 예매 성공하셨나요?", time: "1일 전", unread: 0, avatar: "L" },
  { id: 4, name: "박지성", lastMessage: "다음 주 축구 모임 참석 가능하신가요?", time: "2일 전", unread: 0, avatar: "P" },
  { id: 5, name: "손흥민", lastMessage: "화이팅입니다!", time: "3일 전", unread: 0, avatar: "S" },
];

// 가짜 메시지 내용 데이터
const MOCK_MESSAGES = {
  1: [
    { id: 1, sender: "other", text: "안녕하세요! ALL-IN_SPORTS에 오신 것을 환영합니다.", time: "오전 10:00" },
    { id: 2, sender: "other", text: "서비스 이용 중 궁금한 점이 있으시면 언제든 문의해주세요.", time: "오전 10:01" },
    { id: 3, sender: "me", text: "네, 감사합니다!", time: "오전 10:05" },
  ],
  2: [
    { id: 1, sender: "me", text: "철수님, 오늘 경기 보러 가시나요?", time: "오후 1:00" },
    { id: 2, sender: "other", text: "네! 오늘 경기 같이 보러 가실래요?", time: "오후 1:15" },
  ]
};

function MessagePage() {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });
  const [error, setError] = useState("");

  const currentChat = MOCK_CONVERSATIONS.find(c => c.id === selectedChatId) || MOCK_CONVERSATIONS[0];
  const currentMessages = MOCK_MESSAGES[selectedChatId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    console.log("Send message:", inputMessage);
    setInputMessage("");
  };
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
          }
      };

      fetchUserInfo();
  }, []);

  return (
    <div className="container-fluid p-0" style={{ height: '100vh', backgroundColor: '#FAFAFA' }}>
      <div className="row g-0 h-100">
        <div className="col-md-4 col-lg-3 border-end bg-white d-flex flex-column h-100">

          <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <button onClick={() => navigate(-1)} className="btn btn-link p-0 text-dark">
                    <ArrowLeft size={24} />
                </button>
                <h5 className="fw-bold m-0">{userInfo.nickname}</h5>
                <ChevronRight size={20} />
            </div>
            <MoreHorizontal size={24} />
          </div>
          <div className="flex-grow-1 overflow-auto">
            {MOCK_CONVERSATIONS.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`d-flex align-items-center p-3 ${selectedChatId === chat.id ? 'bg-light' : 'bg-white'}`}
                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold me-3"
                     style={{ width: '56px', height: '56px', fontSize: '1.2rem', flexShrink: 0 }}>
                  {chat.avatar}
                </div>

                <div className="overflow-hidden">
                  <div className="fw-semibold text-dark">{chat.name}</div>
                  <div className="text-muted text-truncate small">
                    {chat.lastMessage} · <span className="text-secondary">{chat.time}</span>
                  </div>
                </div>

                {chat.unread > 0 && (
                    <div className="ms-auto bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-8 col-lg-9 d-flex flex-column h-100 bg-white">
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold me-3"
                         style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                        {currentChat.avatar}
                    </div>
                    <h5 className="fw-bold m-0">{currentChat.name}</h5>
                </div>
                <div className="d-flex gap-3 text-dark">
                    <Info size={24} />
                </div>
            </div>

            <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column gap-3">
                <div className="text-center text-muted small my-3">2025년 11월 20일</div>

                {currentMessages.map((msg) => (
                    <div key={msg.id} className={`d-flex ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                         {msg.sender !== 'me' && (
                             <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white me-2 align-self-end"
                                  style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>
                                {currentChat.avatar}
                             </div>
                         )}

                         <div
                            className={`p-3 px-4 ${msg.sender === 'me' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                            style={{
                                borderRadius: '1.2rem',
                                maxWidth: '70%',
                                borderBottomRightRadius: msg.sender === 'me' ? '0.2rem' : '1.2rem',
                                borderBottomLeftRadius: msg.sender !== 'me' ? '0.2rem' : '1.2rem'
                            }}
                         >
                            {msg.text}
                         </div>
                    </div>
                ))}

                {currentMessages.length === 0 && (
                    <div className="text-center mt-5">
                        <div className="fw-bold fs-4 mb-2">{currentChat.name}님에게 메시지 보내기</div>
                        <p className="text-muted">첫 인사를 건네보세요!</p>
                    </div>
                )}
            </div>

            <div className="p-3 m-3 border rounded-pill d-flex align-items-center bg-white">
                <div className="p-2 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                    <Search size={16} color="white" />
                </div>
                <form className="flex-grow-1 d-flex" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    {inputMessage.trim() && (
                        <button type="submit" className="btn btn-link text-primary fw-bold text-decoration-none">Send</button>
                    )}
                </form>
                <div className="d-flex gap-3 ms-2 text-muted">
                    <i className="bi bi-image"></i>
                    <i className="bi bi-heart"></i>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default MessagePage;
