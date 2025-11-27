
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { MOCK_MATCHES, MOCK_TEAMS } from '../../constants';

function CalendarPage({ sportMode }) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 1)); // 2025년 11월 기준 시작
  const [selectedLeague, setSelectedLeague] = useState('K1'); // K1, K2
  const [filterMyTeam, setFilterMyTeam] = useState(false);

  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // 월 변경 핸들러
  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  // 날짜 포맷팅
  const formatMonth = (date) => {
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`;
  };

  // 해당 월의 경기 필터링
  const filteredMatches = MOCK_MATCHES.filter(match => {
    const matchDate = new Date(match.date);
    const isSameMonth = matchDate.getMonth() === currentDate.getMonth() && matchDate.getFullYear() === currentDate.getFullYear();

    // 야구 모드일 경우 KBO, 축구 모드일 경우 K1/K2 필터링
    if (sportMode === 'baseball') {
        return isSameMonth && match.league === 'KBO';
    } else {
        return isSameMonth && match.league === selectedLeague;
    }
  });

  // 팀 이름 찾기 헬퍼
  const getTeam = (id) => MOCK_TEAMS.find(t => t.id === id) || { name: 'Unknown', logo: '❓' };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold" style={{ color: themeColor }}>경기 일정</h2>

        {/* 축구 모드일 때만 리그 선택 탭 표시 */}
        {sportMode === 'soccer' && (
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className={`btn ${selectedLeague === 'K1' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedLeague('K1')}
                    style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K1' ? '#fff' : themeColor }}
                >
                    K리그 1
                </button>
                <button
                    type="button"
                    className={`btn ${selectedLeague === 'K2' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedLeague('K2')}
                    style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : 'transparent', borderColor: themeColor, color: selectedLeague === 'K2' ? '#fff' : themeColor }}
                >
                    K리그 2
                </button>
            </div>
        )}
      </div>

      {/* 컨트롤 바 */}
      <div className="card p-3 mb-4 shadow-sm border-0 bg-white rounded-4">
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={() => setFilterMyTeam(!filterMyTeam)}>
            <Filter size={18} /> {filterMyTeam ? '전체 경기 보기' : '내 팔로우 팀만 보기'}
          </button>

          <div className="d-flex align-items-center gap-3">
            <button onClick={() => changeMonth(-1)} className="btn btn-light rounded-circle p-2"><ChevronLeft /></button>
            <h4 className="m-0 fw-bold">{formatMonth(currentDate)}</h4>
            <button onClick={() => changeMonth(1)} className="btn btn-light rounded-circle p-2"><ChevronRight /></button>
          </div>

          <div style={{ width: '160px' }}></div> {/* 균형 맞추기용 공백 */}
        </div>
      </div>

      {/* 경기 리스트 (일별 그룹화) */}
      <div className="d-flex flex-column gap-4">
        {filteredMatches.length > 0 ? (
            filteredMatches.map((match, idx) => {
                const home = getTeam(match.homeId);
                const away = getTeam(match.awayId);
                const dayOfWeek = new Date(match.date).toLocaleDateString('ko-KR', { weekday: 'short' });

                return (
                    <div key={match.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        {/* 날짜 헤더 폰트 크기 확대: fs-5 클래스 추가 */}
                        <div className="card-header bg-light border-0 py-2 px-4 fw-bold text-secondary fs-5">
                            {match.date} ({dayOfWeek})
                        </div>
                        <div className="card-body p-4 d-flex align-items-center justify-content-between">
                            {/* 홈팀 */}
                            <div className="d-flex align-items-center gap-3 flex-1" style={{width: '30%'}}>
                                <span style={{fontSize: '2rem'}}>{home.logo}</span>
                                <span className="fw-bold fs-5">{home.name}</span>
                            </div>

                            {/* 스코어 / 시간 */}
                            <div className="text-center" style={{width: '20%'}}>
                                {match.status === 'FINISHED' ? (
                                    <div className="fs-2 fw-black font-monospace">
                                        {match.homeScore} : {match.awayScore}
                                        <div className="badge bg-secondary fs-6 mt-1">종료</div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="fs-3 fw-bold mb-1">{match.time}</div>
                                        <div className="badge bg-primary">{match.stadium}</div>
                                    </div>
                                )}
                            </div>

                            {/* 원정팀 */}
                            <div className="d-flex align-items-center justify-content-end gap-3 flex-1" style={{width: '30%'}}>
                                <span className="fw-bold fs-5">{away.name}</span>
                                <span style={{fontSize: '2rem'}}>{away.logo}</span>
                            </div>

                            {/* 버튼 영역 */}
                            <div style={{width: '10%'}} className="text-end">
                                <button className="btn btn-sm btn-outline-secondary">분석</button>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="text-center py-5 text-muted">
                <CalendarIcon size={48} className="mb-3 opacity-25" />
                <p>해당 월에 예정된 경기가 없습니다.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
