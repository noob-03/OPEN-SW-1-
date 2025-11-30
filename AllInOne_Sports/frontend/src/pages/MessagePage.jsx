import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAccess } from "../util/fetchUtil";
import { ArrowLeft, Send, Search, MoreHorizontal, Phone, Video, Info, X} from 'lucide-react';

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

const WS_URL = BACKEND_API_BASE_URL.replace('http', 'ws');

// { id: UUID, name: string }
const INITIAL_ROOMS = []; 
// { sender: string, content: string, type: MessageType, timestamp: string }
const INITIAL_MESSAGES = []; 

const CreateRoomModal = ({ isOpen, onClose, onCreateRoom }) => {
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedName = roomName.trim();
        if (!trimmedName) {
            setError('채팅방 이름을 입력해주세요.');
            return;
        }
        if (trimmedName.length > 50) {
            setError('채팅방 이름은 50자 이내여야 합니다.');
            return;
        }
        
        onCreateRoom(trimmedName);
        setRoomName('');
        setError('');
        onClose();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
            <div className="bg-white p-4 rounded-3 shadow-lg" style={{ width: '90%', maxWidth: '400px' }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="modal-title fw-bold m-0">새로운 채팅방 만들기</h5>
                    <button type="button" className="btn-close p-0" onClick={onClose} aria-label="Close">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomNameInput" className="form-label small text-muted">채팅방 이름</label>
                        <input
                            type="text"
                            id="roomNameInput"
                            className="form-control"
                            placeholder="예: 프로젝트 팀 채팅"
                            value={roomName}
                            onChange={(e) => {
                                setRoomName(e.target.value);
                                setError('');
                            }}
                            maxLength={50}
                        />
                        {error && <div className="text-danger small mt-1">{error}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">
                        채팅방 생성
                    </button>
                </form>
            </div>
        </div>
    );
};

function MessagePage() {
  // 유저 관련
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });
  const [error, setError] = useState("");
  // 로딩상태 추가
  const [isLoading, setIsLoading] = useState(true);
  // 채팅방 생성 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false); 
  // 채팅 상태 관리
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  
  // WebSocket 및 Ref 관리
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const currentRoom = rooms.find(r => r.id === selectedRoomId);

  // 스크롤을 항상 최신 메시지로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // 1. 채팅방 목록 로드 유틸리티
  const fetchRooms = async (selectNewRoom = false, newRoomId = null) => {
    try {
        // fetchWithAccess 사용
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/v1/chat/rooms`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!res.ok) {
            // 401 Unauthorized 오류 처리: 토큰이 만료되었거나 유효하지 않음
            if (res.status === 401) {
                localStorage.removeItem("accessToken");
                navigate('/'); // 로그인 페이지로 리다이렉트
                return;
            }
            throw new Error("채팅방 목록 불러오기 실패");
        }
        const data = await res.json();
        
        if (data.length > 0) {
            setRooms(data);
            // 새 방을 만들었거나 (selectNewRoom이 true) ID가 지정된 경우 해당 방을 선택합니다.
            if (selectNewRoom && newRoomId) {
                setSelectedRoomId(newRoomId);
            } else if (!selectedRoomId) {
                // 선택된 방이 없을 때만 첫 번째 방을 기본으로 선택
                setSelectedRoomId(data[0].id);
            }
        }
        return data; // 새로운 채팅방 목록 반환
    } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("채팅방 목록을 불러오지 못했습니다.");
        return [];
    }
  };

  // 2. 메시지 히스토리 로드 유틸리티 (WebSocket onopen에서 사용)
  const fetchMessages = async (roomId) => {
    if (!roomId) return;
    try {
        // fetchWithAccess는 credentials: 'include'를 포함한 fetch 요청을 처리한다고 가정합니다.
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/v1/chat/rooms/${roomId}/history`, {
            method: 'GET',
            credentials: 'include', // 로컬 유틸리티 함수가 처리하도록 해도 명시적으로 추가
        });
        if (!res.ok) {
             // 401 오류 발생 시 토큰 만료로 간주하고 로그인 페이지로 리다이렉트
            if (res.status === 401) {
                 localStorage.removeItem("accessToken");
                 navigate('/');
                 return;
            }
            throw new Error("메시지 히스토리 불러오기 실패");
        }
        const data = await res.json();
        setMessages(data); 
    } catch (err) {
        console.error("Error fetching message history:", err);
        setError("메시지 히스토리를 불러오지 못했습니다.");
        setMessages([]);
    }
  };

  // 3. 채팅방 생성 로직
  const createChatRoom = async (roomName) => {
    try {
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/api/v1/chat/rooms`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: roomName })
        });
        
        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("accessToken");
                navigate('/'); 
                return;
            }
            throw new Error("채팅방 생성 실패");
        }
        
        const newRoom = await res.json();
        
        // 채팅방 목록을 새로고침하고 새로 생성된 방을 선택합니다.
        await fetchRooms(true, newRoom.id); 

    } catch (err) {
        console.error("Error creating chat room:", err);
        setError(`채팅방 생성 중 오류 발생: ${err.message}`);
    }
  };

  // 4. 초기 사용자 정보 로드 및 채팅방 목록 로드
  useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
          setIsLoading(false);
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

    // 두 비동기 함수를 순차적으로 호출
    (async () => {
        await fetchUserInfo();
        await fetchRooms();
        setIsLoading(false); // 로딩 종료
    })();
  }, []);

  // 5. 메시지 전송 유틸리티 함수
  const sendMessageToServer = (type, content = "") => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN || !selectedRoomId) {
        console.warn("[WS] Connection is not open or room is not selected. ReadyState:", ws.current?.readyState);
        return;
    }
    
    // 백엔드 ChatMessageEntity 형식에 맞게 JSON 객체 구성
    const message = {
        roomId: selectedRoomId,
        sender: userInfo.nickname,
        type: type, // 'ENTER', 'QUIT', 'TALK'
        content: content,
    };
    
    ws.current.send(JSON.stringify(message));
  };
  
  const sendEnterMessage = () => {
      sendMessageToServer('ENTER');
  };

  const sendQuitMessage = () => {
      sendMessageToServer('QUIT');
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    // 1. 서버로 TALK 메시지 전송 (브로드캐스트 및 DB 저장)
    sendMessageToServer('TALK', trimmedMessage);
    
    // 2. 입력창 초기화
    setInputMessage("");
  };

  // 6. WebSocket 연결 및 관리 (selectedRoomId 변경 시 재연결)
  useEffect(() => {
    if (!currentRoom) return;
    
    // 4-1. WebSocket 연결 설정
    const connectWS = () => {
      const url = `${WS_URL}/ws/chat`;
      
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          // 이미 연결되어 있으면 다시 연결하지 않고, 현재 방에 대한 ENTER 메시지 재전송
          sendEnterMessage();
          fetchMessages(selectedRoomId); 
          return;
      }
      
      ws.current = new WebSocket(url);

      // 연결이 열렸을 때
      ws.current.onopen = () => {
        console.log(`[WS] Connected to ${url}. Room: ${selectedRoomId}`);
        // 연결 후, 현재 선택된 방에 입장 메시지 전송 (ENTER)
        sendEnterMessage();
        // 메시지 히스토리 로드
        fetchMessages(selectedRoomId); 
      };

      // 서버로부터 메시지를 받았을 때
      ws.current.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        
        // 현재 선택된 방의 메시지만 처리
        if (receivedMessage.roomId === selectedRoomId) {
            // 수신된 메시지를 현재 메시지 목록에 추가
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        }
      };

      // 연결이 닫혔을 때
      ws.current.onclose = (event) => {
        console.log(`[WS] Disconnected. Code: ${event.code}, Reason: ${event.reason}`);
      };

      // 에러 발생 시
      ws.current.onerror = (error) => {
        console.error("[WS] Error:", error);
      };
    };

    // 4-2. WebSocket 연결 해제 로직 (cleanup)
    const disconnectWS = () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        // 방을 나가기 전 QUIT 메시지 전송
        sendQuitMessage();
        ws.current.close();
        ws.current = null; // 정리
      }
    };

    // 초기 연결 시도
    connectWS();

    // 컴포넌트 언마운트 또는 selectedRoomId 변경 시 연결 해제
    return () => {
      disconnectWS();
    };

  }, [selectedRoomId, userInfo.nickname, navigate]); 

  // 7. 방 선택 처리
  const handleSelectChat = (roomId) => {
    if (selectedRoomId !== roomId) {
      // selectedRoomId 변경 시 useEffect가 재실행되면서
      // 1. 이전 방에서 QUIT 메시지를 보내고 연결을 닫고 (cleanup)
      // 2. 새로운 방에 대한 연결을 시도하며 ENTER 메시지를 보냅니다. (connectWS)
      setSelectedRoomId(roomId); 
    }
  };

  // 8. 렌더링 형식 정의
  const messageFormat = (msg) => {
      // 메시지 타입에 따라 sender를 'me' 또는 'other'로 결정
      let senderType = 'other';
      if (msg.sender === userInfo.nickname) {
          senderType = 'me';
      } else if (msg.type === 'ENTER' || msg.type === 'QUIT') {
          // 입장/퇴장 메시지는 중앙 정렬을 위해 senderType을 null로 처리
          senderType = null;
          // 입장/퇴장 메시지의 content를 닉네임과 함께 구성
          return {
              id: msg.id || Math.random(),
              sender: senderType,
              text: `${msg.sender}님이 ${msg.type === 'ENTER' ? '입장' : '퇴장'}했습니다.`,
              time: msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '방금'
          };
      }

      return {
          id: msg.id || Math.random(), 
          sender: senderType,
          text: msg.content,
          // 시간 표시는 백엔드에서 받은 timestamp를 적절히 포맷
          time: msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '방금'
      };
  };

  // 로딩 중 스피너 표시
  if (isLoading) {
    return (
        <div className="d-flex align-items-center justify-content-center h-100" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
  }

  return (
    <div className="container-fluid p-0" style={{ height: '100vh', backgroundColor: '#FAFAFA' }}>
      {/* 채팅방 생성 모달 */}
      <CreateRoomModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateRoom={createChatRoom}
      />
      {/* 에러 메시지 표시 */}
      {error && <div className="alert alert-danger position-fixed w-100 z-10" role="alert">{error}</div>}
      
      <div className="row g-0 h-100">
        {/* 왼쪽 채팅 목록 (Conversation List) */}
        <div className="col-md-4 col-lg-3 border-end bg-white d-flex flex-column h-100">

          <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <button onClick={() => navigate(-1)} className="btn btn-link p-0 text-dark">
                    <ArrowLeft size={24} />
                </button>
                <h5 className="fw-bold m-0">{userInfo.nickname}</h5>
                <ChevronRight size={20} />
            </div>
          </div>
          <div className="p-3">
             <button 
                 onClick={() => setIsModalOpen(true)} 
                 className="btn btn-primary w-100 rounded-pill"
             >
                 + 새로운 채팅방
             </button>
          </div>
          <div className="flex-grow-1 overflow-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => handleSelectChat(room.id)}
                className={`d-flex align-items-center p-3 ${room.id === selectedRoomId ? 'bg-light' : 'bg-white'}`}
                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold me-3"
                     style={{ width: '56px', height: '56px', fontSize: '1.2rem', flexShrink: 0 }}>
                  {room.name.charAt(0)}
                </div>

                <div className="overflow-hidden">
                  <div className="fw-semibold text-dark">{room.name}</div>
                  <div className="text-muted text-truncate small">
                    채팅방입니다.
                  </div>
                </div>
              </div>
            ))}
            {rooms.length === 0 && (
                <div className="text-center p-5 text-muted">채팅방이 없습니다.</div>
            )}
          </div>
        </div>

        {/* 오른쪽 채팅창 (Chat View) */}
        <div className="col-md-8 col-lg-9 d-flex flex-column h-100 bg-white">
            {currentRoom ? (
                <>
                    {/* 채팅 헤더 */}
                    <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold me-3"
                                 style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                {currentRoom.name.charAt(0)}
                            </div>
                            <h5 className="fw-bold m-0">{currentRoom.name}</h5>
                        </div>
                        <div className="d-flex gap-3 text-dark">
                            <Info size={24} />
                        </div>
                    </div>

                    {/* 메시지 영역 */}
                    <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column gap-3">
                        <div className="text-center text-muted small my-3">
                            대화 시작
                        </div>

                        {messages.map((msg, index) => {
                            const formattedMsg = messageFormat(msg);
                            
                            // 입장/퇴장 메시지는 중앙 정렬
                            if (formattedMsg.sender === null) {
                                return (
                                    <div key={index} className="text-center text-muted small">
                                        {formattedMsg.text}
                                    </div>
                                );
                            }

                            // 일반 대화 메시지
                            return (
                                <div key={index} className={`d-flex ${formattedMsg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                                     {formattedMsg.sender !== 'me' && (
                                         <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white me-2 align-self-end"
                                              style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>
                                            {/* 메시지 발신자의 닉네임 첫 글자를 표시합니다. */}
                                            {msg.sender.charAt(0)}
                                         </div>
                                     )}

                                     <div
                                        className={`p-3 px-4 ${formattedMsg.sender === 'me' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                                        style={{
                                            borderRadius: '1.2rem',
                                            maxWidth: '70%',
                                            borderBottomRightRadius: formattedMsg.sender === 'me' ? '0.2rem' : '1.2rem',
                                            borderBottomLeftRadius: formattedMsg.sender !== 'me' ? '0.2rem' : '1.2rem'
                                        }}
                                     >
                                        {/* 메시지 내용 */}
                                        <div>{formattedMsg.text}</div>
                                        {/* 시간 표시 - 작게, 약간 투명하게 */}
                                        <div className={`mt-1 small ${formattedMsg.sender === 'me' ? 'text-white text-opacity-75' : 'text-muted'}`}>
                                            {formattedMsg.time}
                                        </div>
                                     </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} /> {/* 자동 스크롤을 위한 요소 */}
                        
                        {messages.length === 0 && (
                            <div className="text-center mt-5">
                                <div className="fw-bold fs-4 mb-2">{currentRoom.name}에게 메시지 보내기</div>
                                <p className="text-muted">첫 인사를 건네보세요!</p>
                            </div>
                        )}
                    </div>

                    {/* 메시지 입력창 */}
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
                                <button type="submit" className="btn btn-link text-primary fw-bold text-decoration-none p-0 mx-2">
                                    <Send size={20} />
                                </button>
                            )}
                        </form>
                        <div className="d-flex gap-3 ms-2 text-muted">
                            {/* 예시 아이콘: 이미지, 하트 */}
                            <i className="bi bi-image"></i> 
                            <i className="bi bi-heart"></i>
                        </div>
                    </div>
                </>
            ) : (
                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                    채팅방을 선택하거나 새로운 채팅방을 만드세요.
                </div>
            )}
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