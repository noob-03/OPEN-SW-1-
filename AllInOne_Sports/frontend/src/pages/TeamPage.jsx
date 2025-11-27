
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MOCK_TEAMS } from '../../constants';

function TeamPage({ sportMode }) {
  const [selectedLeague, setSelectedLeague] = useState('K1'); // K1, K2 (축구일때만)
  
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  const filteredTeams = MOCK_TEAMS.filter(team => {
    if (sportMode === 'baseball') return team.sport === 'baseball';
    return team.league === selectedLeague;
  });

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2">Team Information</h2>
        <p className="text-muted">응원하는 구단을 팔로우하고 소식을 받아보세요.</p>
      </div>

      {/* 리그 선택 탭 (축구 모드일 때만) */}
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
            <div key={team.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center position-relative hover-scale" 
                     style={{ transition: 'transform 0.2s' }}>
                    
                    <button className="btn btn-link position-absolute top-0 end-0 p-3 text-muted hover-red">
                        <Heart />
                    </button>

                    <Link to={`/teams/${team.id}`} className="text-decoration-none text-dark">
                        <div className="mb-3" style={{ fontSize: '4rem' }}>{team.logo}</div>
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
      </div>
    </div>
  );
}

export default TeamPage;
