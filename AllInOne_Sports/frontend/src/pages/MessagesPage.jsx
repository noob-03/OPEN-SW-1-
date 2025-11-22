import React, { useState } from 'react';
import { MOCK_MESSAGES } from '../constants';
import { Send, Inbox, Send as SendIcon } from 'lucide-react';

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('RECEIVED'); // RECEIVED or SENT
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 메시지 필터링
  const messages = MOCK_MESSAGES.filter(m => m.type === activeTab);

  return (
    <div className="bg-white rounded-xl shadow border h-[700px] flex overflow-hidden">
       {/* 왼쪽 사이드바 (메시지 목록) */}
       <div className="w-1/3 border-r bg-white flex flex-col">
           <div className="p-4 border-b">
               <h2 className="font-bold text-lg mb-4">쪽지함</h2>
               <div className="flex bg-gray-100 p-1 rounded-lg">
                   <button 
                     onClick={() => { setActiveTab('RECEIVED'); setSelectedMessage(null); }}
                     className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${activeTab === 'RECEIVED' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                   >
                       <Inbox size={16}/> 받은 쪽지
                   </button>
                   <button 
                     onClick={() => { setActiveTab('SENT'); setSelectedMessage(null); }}
                     className={`flex-1 py-1.5 text-sm font-medium rounded-md flex items-center justify-center gap-2 ${activeTab === 'SENT' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                   >
                       <SendIcon size={16}/> 보낸 쪽지
                   </button>
               </div>
           </div>
           
           <div className="flex-1 overflow-y-auto divide-y">
               {messages.length === 0 ? (
                   <div className="p-8 text-center text-gray-400 text-sm">메시지가 없습니다.</div>
               ) : (
                   messages.map(msg => (
                       <div 
                         key={msg.Messageid} 
                         onClick={() => setSelectedMessage(msg)}
                         className={`p-4 cursor-pointer hover:bg-gray-50 transition ${selectedMessage?.Messageid === msg.Messageid ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                       >
                           <div className="flex justify-between items-baseline mb-1">
                               <span className="font-bold text-gray-800 text-sm">
                                   {activeTab === 'RECEIVED' ? msg.sender_name : msg.receiver_name}
                               </span>
                               <span className="text-xs text-gray-400">{msg.sent_at.split(' ')[1]}</span>
                           </div>
                           <p className="font-medium text-sm truncate mb-1">{msg.title}</p>
                           <p className="text-xs text-gray-500 truncate">{msg.content}</p>
                       </div>
                   ))
               )}
           </div>
       </div>

       {/* 오른쪽 메인 (메시지 내용) */}
       <div className="flex-1 bg-gray-50 flex flex-col">
           {selectedMessage ? (
               <>
                   <div className="p-6 bg-white border-b shadow-sm">
                       <h3 className="text-xl font-bold mb-2">{selectedMessage.title}</h3>
                       <div className="flex justify-between items-center text-sm text-gray-500">
                           <div>
                               <span className="font-bold text-gray-700 mr-2">
                                   {activeTab === 'RECEIVED' ? `From: ${selectedMessage.sender_name}` : `To: ${selectedMessage.receiver_name}`}
                               </span>
                               <span>{selectedMessage.sent_at}</span>
                           </div>
                       </div>
                   </div>

                   <div className="flex-1 p-8 overflow-y-auto">
                       <div className="bg-white p-6 rounded-lg border shadow-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                           {selectedMessage.content}
                       </div>
                   </div>

                   {activeTab === 'RECEIVED' && (
                       <div className="p-4 bg-white border-t flex justify-end">
                           <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 flex items-center gap-2">
                               <Send size={18} /> 답장하기
                           </button>
                       </div>
                   )}
               </>
           ) : (
               <div className="flex-1 flex items-center justify-center flex-col text-gray-400">
                   <div className="w-20 h-20 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
                       <Inbox size={32} />
                   </div>
                   <p>쪽지를 선택하여 내용을 확인하세요</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default MessagesPage;