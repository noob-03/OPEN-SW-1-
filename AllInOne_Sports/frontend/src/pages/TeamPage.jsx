import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import axios from 'axios';

function TeamPage({ sportMode }) {
  // 1. 데이터를 관리할 State
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 탭 상태 (초기값 'K1')
  const [selectedLeague, setSelectedLeague] = useState('K1');
  
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  // 2. 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);

        // API 호출: sportMode에 따라 1차적으로 DB에서 가져옴
        // (Controller에서 이미 야구/축구를 구분해서 주지만, 프론트에서 league값으로 확실히 처리)
        const response = await axios.get(`http://localhost:8080/api/teams`, {
            params: { sport: sportMode }
        });
        
        setTeams(response.data);
      } catch (err) {
        console.error("팀 정보를 불러오는데 실패했습니다:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [sportMode]);

  // 3. DB 데이터('K리그1', 'K리그2', 'KBO')에 맞춘 필터링 로직
  const filteredTeams = teams.filter(team => {
    // [야구] DB의 league가 'KBO'인 경우
    if (sportMode === 'baseball') {
        return team.league === 'KBO';
    }
    
    // [축구] 탭 선택에 따라 'K리그1' 또는 'K리그2' 구분
    if (selectedLeague === 'K1') return team.league === 'K리그1';
    if (selectedLeague === 'K2') return team.league === 'K리그2';
    
    return false;
  });

  if (loading) {
      return (
          <div className="container text-center" style={{ paddingTop: '200px' }}>
              <div className="spinner-border" role="status" style={{ color: themeColor }}>
                  <span className="visually-hidden">Loading...</span>
              </div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="container text-center text-danger" style={{ paddingTop: '200px' }}>
              <p>데이터를 불러오지 못했습니다.</p>
          </div>
      );
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2">Team Information</h2>
        <p className="text-muted">응원하는 구단을 팔로우하고 소식을 받아보세요.</p>
      </div>

      {/* 축구일 때만 리그 선택 탭 표시 */}
      {sportMode === 'soccer' && (
        <div className="d-flex justify-content-center mb-5">
            <div className="btn-group" role="group">
                <button 
                    type="button" 
                    className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K1' ? 'text-white' : 'text-dark'}`}
                    style={{ backgroundColor: selectedLeague === 'K1' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K1' ? themeColor : '#ddd'}` }}
                    onClick={() => setSelectedLeague('K1')}
                >
                    K리그 1
                </button>
                <button 
                    type="button" 
                    className={`btn px-4 py-2 fw-bold ${selectedLeague === 'K2' ? 'text-white' : 'text-dark'}`}
                    style={{ backgroundColor: selectedLeague === 'K2' ? themeColor : '#f8f9fa', border: `1px solid ${selectedLeague === 'K2' ? themeColor : '#ddd'}` }}
                    onClick={() => setSelectedLeague('K2')}
                >
                    K리그 2
                </button>
            </div>
        </div>
      )}

      <div className="row g-4">
        {filteredTeams.map(team => (
            <div key={team.teamId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center position-relative hover-scale" 
                     style={{ transition: 'transform 0.2s' }}>
                    
                    <button className="btn btn-link position-absolute top-0 end-0 p-3 text-muted hover-red">
                        <Heart />
                    </button>

                    <Link to={`/teams/${team.teamId}`} className="text-decoration-none text-dark">
                        <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                             {team.logoUrl ? (
                                 <img 
                                    src={team.logoUrl} 
                                    alt={team.name} 
                                    style={{ maxHeight: '100%', maxWidth: '80%', objectFit: 'contain' }}
                                    referrerPolicy="no-referrer" // ◀ 네이버 등 외부 이미지 차단 방지용 코드 추가
                                 />
                             ) : (
                                 // 로고가 없을 경우 대체 텍스트
                                 <div className="fw-bold text-muted">{team.name}</div>
                             )}
                        </div>
                        <h5 className="fw-bold mb-1">{team.name}</h5>
                        <p className="text-muted small mb-3">홈구장 정보 없음</p>
                    </Link>

                    <div className="bg-light rounded-3 p-2 d-flex justify-content-around small">
                        <div>
                            <div className="text-muted">순위</div>
                            <div className="fw-bold">-위</div>
                        </div>
                        <div className="vr"></div>
                        <div>
                            <div className="text-muted">승점</div>
                            <div className="fw-bold">-pts</div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        
        {filteredTeams.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">
                해당 리그에 등록된 팀이 없습니다.
            </div>
        )}
      </div>
    </div>
  );
}

export default TeamPage;