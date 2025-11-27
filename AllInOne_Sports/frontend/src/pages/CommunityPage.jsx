
import React from 'react';

function CommunityPage({ sportMode }) {
  const themeColor = sportMode === 'soccer' ? '#5C67F2' : '#E03131';

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <h2 className="fw-bold mb-4" style={{ color: themeColor }}>커뮤니티</h2>
      <div className="card p-5 border-0 shadow-sm rounded-4 text-center">
        <p className="fs-4 text-muted">준비 중인 페이지입니다.</p>
        <p>다양한 팬들과 소통할 수 있는 공간이 곧 열립니다!</p>
      </div>
    </div>
  );
}

export default CommunityPage;
