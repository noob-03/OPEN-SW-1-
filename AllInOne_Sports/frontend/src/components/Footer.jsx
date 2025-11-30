import React from 'react';

function Footer() {
  return (
    // bg-dark, text-white: 어두운 배경, 흰색 글씨, p-5: 큰 패딩
    <footer className="bg-dark text-white p-5">
      <div className="container">
        <div className="row">
          {/* 푸터 왼쪽 */}
          <div className="col-md-6">
            <h5 className="fw-bold">ALL-IN_SPORTS</h5>
            <p className="text-white-50 small">
              CBNU Software<br />
              Opensource Project
            </p>
          </div>
          {/* 푸터 오른쪽 */}
          <div className="col-md-6 text-md-end">
            <h6 className="text-white-50">Quick Link's</h6>
            <ul className="list-unstyled">
                <li><a href="/teams" className="text-white text-decoration-none">Teams</a></li>
                <li><a href="/calendar" className="text-white text-decoration-none">Calendar</a></li>
                <li><a href="/community" className="text-white text-decoration-none">Community</a></li>
                <li><a href="/ticket" className="text-white text-decoration-none">Ticket</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;