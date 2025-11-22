import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEAMS } from '../constants';

const JoinPage = () => {
  const navigate = useNavigate();
  
  // 폼 상태
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    selectedSports: [],
    selectedTeams: []
  });

  const [errors, setErrors] = useState({});

  // 정규식 검증
  const validate = () => {
    const newErrors = {};
    const alphanumeric = /^[a-zA-Z0-9]+$/;

    // 1. 아이디 검증 (영문자+숫자, 공백X)
    if (!formData.id) newErrors.id = '아이디를 입력해주세요.';
    else if (!alphanumeric.test(formData.id)) newErrors.id = '아이디는 영문자와 숫자만 가능합니다.';

    // 2. 비밀번호 검증
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
    else if (!alphanumeric.test(formData.password)) newErrors.password = '비밀번호는 영문자와 숫자만 가능합니다.';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 3. 필수 선택
    if (formData.selectedSports.length === 0) newErrors.sports = '최소 하나의 선호 종목을 선택해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('회원가입이 완료되었습니다! 로그인 해주세요.');
      navigate('/');
    }
  };

  const toggleSport = (sport) => {
    setFormData(prev => {
      const exists = prev.selectedSports.includes(sport);
      return {
        ...prev,
        selectedSports: exists 
          ? prev.selectedSports.filter(s => s !== sport)
          : [...prev.selectedSports, sport]
      };
    });
  };

  const toggleTeam = (teamId) => {
    setFormData(prev => {
      const exists = prev.selectedTeams.includes(teamId);
      return {
        ...prev,
        selectedTeams: exists 
          ? prev.selectedTeams.filter(t => t !== teamId)
          : [...prev.selectedTeams, teamId]
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8">회원가입</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">아이디 (영문/숫자)</label>
            <input 
              type="text" 
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
              value={formData.id}
              onChange={e => setFormData({...formData, id: e.target.value})}
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">비밀번호</label>
              <input 
                type="password" 
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">비밀번호 확인</label>
              <input 
                type="password" 
                className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* 닉네임 & 이메일 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">닉네임</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nickname}
                onChange={e => setFormData({...formData, nickname: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">이메일</label>
              <input 
                type="email" 
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* 선호 종목 */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">선호 종목 (복수 선택 가능)</label>
            <div className="flex gap-4">
               <button 
                 type="button"
                 onClick={() => toggleSport('BASEBALL')}
                 className={`px-4 py-2 rounded-full border transition ${formData.selectedSports.includes('BASEBALL') ? 'bg-red-100 border-red-500 text-red-700 font-bold' : 'hover:bg-gray-50'}`}
               >
                 야구 (KBO)
               </button>
               <button 
                 type="button"
                 onClick={() => toggleSport('SOCCER')}
                 className={`px-4 py-2 rounded-full border transition ${formData.selectedSports.includes('SOCCER') ? 'bg-blue-100 border-blue-500 text-blue-700 font-bold' : 'hover:bg-gray-50'}`}
               >
                 축구 (K-League)
               </button>
            </div>
            {errors.sports && <p className="text-red-500 text-xs mt-1">{errors.sports}</p>}
          </div>

          {/* 선호 팀 (간단한 목록 표시) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">선호 팀 (복수 선택 가능)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded">
              {MOCK_TEAMS.map(team => (
                <div key={team.Teamid} 
                     onClick={() => toggleTeam(team.Teamid)}
                     className={`p-2 border rounded cursor-pointer text-sm flex items-center gap-2 ${formData.selectedTeams.includes(team.Teamid) ? 'bg-gray-100 border-gray-500 ring-1 ring-gray-500' : 'hover:bg-gray-50'}`}
                >
                  <img src={team.logo_url} alt="" className="w-6 h-6 rounded-full"/>
                  {team.name}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition mt-8">
            가입완료
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;