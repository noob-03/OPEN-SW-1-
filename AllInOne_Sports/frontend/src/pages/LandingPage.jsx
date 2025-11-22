import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { setIsLoggedIn, setSport } = useContext(AppContext);
  const [step, setStep] = useState('LOGIN'); // 'LOGIN' or 'SELECT'
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 간단한 로그인 검증 시뮬레이션
    if (loginId && password) {
      setError('');
      setStep('SELECT');
    } else {
      setError('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleSelectSport = (selectedSport) => {
    setSport(selectedSport);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full min-h-[600px]">
        
        {/* 왼쪽: 브랜딩 */}
        <div className="w-full md:w-1/2 bg-blue-600 p-12 flex flex-col justify-center text-white relative overflow-hidden">
          <h1 className="text-5xl font-extrabold italic mb-4 leading-tight z-10">
            All Your<br />
            Sports,<br />
            All In<br />
            <span className="text-yellow-300">One Place</span>
          </h1>
          <p className="text-blue-100 text-lg z-10 mb-8">
            KBO와 K리그의 모든 일정, 티켓, 커뮤니티를<br/>
            한 곳에서 확인하세요.
          </p>
        </div>

        {/* 오른쪽: 로그인 또는 선택 */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          {step === 'LOGIN' ? (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">로그인</h2>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">아이디</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                    placeholder="아이디 입력"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">비밀번호</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition"
                >
                  로그인
                </button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                계정이 없으신가요? <Link to="/join" className="text-blue-600 font-bold hover:underline">회원가입</Link>
              </div>

              <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm mb-4">소셜 로그인</p>
                  <div className="flex justify-center space-x-4">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition w-10 h-10 flex items-center justify-center text-green-600 font-bold">N</button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition w-10 h-10 flex items-center justify-center text-red-500 font-bold">G</button>
                  </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in text-center">
               <h2 className="text-3xl font-bold mb-2 text-gray-800">종목 선택</h2>
               <p className="text-gray-500 mb-8">어떤 종목을 주로 확인하시겠습니까?</p>
               
               <div className="grid grid-cols-2 gap-6">
                  <button 
                    onClick={() => handleSelectSport('BASEBALL')}
                    className="group relative h-48 rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-red-500 transition-all"
                  >
                    <div className="absolute inset-0 bg-red-600 flex items-center justify-center group-hover:bg-red-700">
                       <span className="text-2xl font-bold text-white">야구 (KBO)</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleSelectSport('SOCCER')}
                    className="group relative h-48 rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all"
                  >
                    <div className="absolute inset-0 bg-blue-600 flex items-center justify-center group-hover:bg-blue-700">
                       <span className="text-2xl font-bold text-white">축구 (K-League)</span>
                    </div>
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;