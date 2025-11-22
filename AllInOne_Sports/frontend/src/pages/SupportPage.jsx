import React from 'react';

const SupportPage = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow border">
       <div className="mb-8 border-b pb-4">
           <h2 className="text-3xl font-bold text-gray-800 mb-2">문의하기</h2>
           <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
               <li>음란, 불법 게시물 또는 권리 침해 신고는 '신고하기' 메뉴를 이용해주세요.</li>
               <li>(필수) 항목은 반드시 입력해주셔야 문의 접수가 가능합니다.</li>
           </ul>
       </div>

       <form className="space-y-6">
           <div className="flex items-center">
               <label className="w-32 font-bold text-gray-700">문의 분류</label>
               <select className="flex-1 border p-2.5 rounded bg-gray-50 outline-none">
                   <option>선택</option>
                   <option>계정 관련</option>
                   <option>티켓/결제</option>
                   <option>오류 신고</option>
                   <option>기타</option>
               </select>
           </div>

           <div className="flex items-center">
               <label className="w-32 font-bold text-gray-700">제목 (필수)</label>
               <input type="text" className="flex-1 border p-2.5 rounded bg-gray-50 focus:bg-white outline-none transition" placeholder="제목을 입력하세요" />
           </div>

           <div>
               <label className="block font-bold text-gray-700 mb-2">내용 (필수)</label>
               <textarea className="w-full h-64 border p-4 rounded bg-gray-50 resize-none focus:bg-white outline-none transition" placeholder="문의 내용을 상세히 적어주세요."></textarea>
           </div>

           <div className="pt-6 text-center">
               <button type="submit" className="px-12 py-3 bg-gray-900 text-white font-bold rounded hover:bg-black transition">문의하기</button>
           </div>
       </form>
    </div>
  );
};

export default SupportPage;