
  // 팀 데이터 (KBO, K리그1, K리그2)
  export const MOCK_TEAMS = [
    // --- KBO (야구) ---
    { id: 'kbo_01', name: 'KIA 타이거즈', league: 'KBO', sport: 'baseball', logo: '🐯' },
    { id: 'kbo_02', name: '삼성 라이온즈', league: 'KBO', sport: 'baseball', logo: '🦁' },
    { id: 'kbo_03', name: 'LG 트윈스', league: 'KBO', sport: 'baseball', logo: '👯' },
    { id: 'kbo_04', name: '두산 베어스', league: 'KBO', sport: 'baseball', logo: '🐻' },
    { id: 'kbo_05', name: 'KT 위즈', league: 'KBO', sport: 'baseball', logo: '🧙' },
    { id: 'kbo_06', name: 'SSG 랜더스', league: 'KBO', sport: 'baseball', logo: '🛸' },
    { id: 'kbo_07', name: '롯데 자이언츠', league: 'KBO', sport: 'baseball', logo: '🦆' },
    { id: 'kbo_08', name: '한화 이글스', league: 'KBO', sport: 'baseball', logo: '🦅' },
    { id: 'kbo_09', name: 'NC 다이노스', league: 'KBO', sport: 'baseball', logo: '🦕' },
    { id: 'kbo_10', name: '키움 히어로즈', league: 'KBO', sport: 'baseball', logo: '🦸' },

    // --- K리그 1 (12개팀) ---
    { id: 'k1_01', name: '울산 HD', league: 'K1', sport: 'soccer', logo: '🐯' },
    { id: 'k1_02', name: '김천 상무', league: 'K1', sport: 'soccer', logo: '💂' },
    { id: 'k1_03', name: '강원 FC', league: 'K1', sport: 'soccer', logo: '🐻' },
    { id: 'k1_04', name: '포항 스틸러스', league: 'K1', sport: 'soccer', logo: '🤖' },
    { id: 'k1_05', name: 'FC 서울', league: 'K1', sport: 'soccer', logo: '🔴' }, // 상세 데이터 보유
    { id: 'k1_06', name: '수원 FC', league: 'K1', sport: 'soccer', logo: '🏰' },
    { id: 'k1_07', name: '제주 유나이티드', league: 'K1', sport: 'soccer', logo: '🍊' },
    { id: 'k1_08', name: '대전 하나시티즌', league: 'K1', sport: 'soccer', logo: '👽' },
    { id: 'k1_09', name: '광주 FC', league: 'K1', sport: 'soccer', logo: '🦅' },
    { id: 'k1_10', name: '전북 현대', league: 'K1', sport: 'soccer', logo: '💚' },
    { id: 'k1_11', name: '대구 FC', league: 'K1', sport: 'soccer', logo: '☀️' },
    { id: 'k1_12', name: '인천 유나이티드', league: 'K1', sport: 'soccer', logo: '⚓' },

    // --- K리그 2 (14개팀 - 요청 반영) ---
    { id: 'k2_01', name: '수원 삼성', league: 'K2', sport: 'soccer', logo: '🔵' },
    { id: 'k2_02', name: '서울 이랜드', league: 'K2', sport: 'soccer', logo: '🐆' },
    { id: 'k2_03', name: '전남 드래곤즈', league: 'K2', sport: 'soccer', logo: '🐉' },
    { id: 'k2_04', name: '부산 아이파크', league: 'K2', sport: 'soccer', logo: '🛡️' },
    { id: 'k2_05', name: 'FC 안양', league: 'K2', sport: 'soccer', logo: '🟣' },
    { id: 'k2_06', name: '김포 FC', league: 'K2', sport: 'soccer', logo: '⚡' },
    { id: 'k2_07', name: '부천 FC 1995', league: 'K2', sport: 'soccer', logo: '🅱️' },
    { id: 'k2_08', name: '충남 아산', league: 'K2', sport: 'soccer', logo: '🐢' },
    { id: 'k2_09', name: '천안 시티', league: 'K2', sport: 'soccer', logo: '🏙️' },
    { id: 'k2_10', name: '충북 청주', league: 'K2', sport: 'soccer', logo: '🔴' },
    { id: 'k2_11', name: '성남 FC', league: 'K2', sport: 'soccer', logo: '🐦' },
    { id: 'k2_12', name: '안산 그리너스', league: 'K2', sport: 'soccer', logo: '🐺' },
    { id: 'k2_13', name: '경남 FC', league: 'K2', sport: 'soccer', logo: '🔴' },
    { id: 'k2_14', name: '화성 FC', league: 'K2', sport: 'soccer', logo: '🟠' }
  ];

  // 선수 데이터 (FC 서울 위주)
  export const MOCK_PLAYERS = [
    // 공격수 (FW)
    { id: 10, name: '린가드', number: 10, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lingard' },
    { id: 9, name: '조영욱', number: 9, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Cho' },
    { id: 7, name: '임상협', number: 7, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lim' },
    { id: 90, name: '일류첸코', number: 90, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Illu' },
    { id: 19, name: '강주혁', number: 19, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Kang' },
    { id: 45, name: '룩스', number: 45, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lux' },
    { id: 77, name: '루카스', number: 77, position: 'FW', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lucas' },
    
    // 미드필더 (MF)
    { id: 6, name: '기성용', number: 6, position: 'MF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Ki' },
    { id: 29, name: '류재문', number: 29, position: 'MF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Ryu' },
    { id: 8, name: '이승모', number: 8, position: 'MF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lee' },
    { id: 66, name: '한승규', number: 66, position: 'MF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Han' },
    { id: 16, name: '최준', number: 16, position: 'MF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Choi' },

    // 수비수 (DF)
    { id: 22, name: '김진수', number: 22, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Kim' },
    { id: 4, name: '이상민', number: 4, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lee' },
    { id: 30, name: '김주성', number: 30, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Kim' },
    { id: 5, name: '야잔', number: 5, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Yazan' },
    { id: 88, name: '이태석', number: 88, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lee' },
    { id: 20, name: '이한도', number: 20, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Lee' },
    { id: 18, name: '정태욱', number: 18, position: 'DF', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Jung' },

    // 골키퍼 (GK)
    { id: 21, name: '최철원', number: 21, position: 'GK', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Choi' },
    { id: 31, name: '강현무', number: 31, position: 'GK', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Kang' },
    { id: 1, name: '백종범', number: 1, position: 'GK', teamId: 'k1_05', image: 'https://via.placeholder.com/100?text=Baek' }
  ];

  // 2025 경기 일정 (K리그1, K리그2 - 7월~11월 데이터)
  export const MOCK_MATCHES = [
    // --- 7월 ---
    { id: 'm_0705_1', date: '2025-07-05', time: '19:00', league: 'K2', homeId: 'k2_03', awayId: 'k1_12', homeScore: 2, awayScore: 1, status: 'FINISHED', stadium: '광양 전용' },
    { id: 'm_0705_2', date: '2025-07-05', time: '19:00', league: 'K2', homeId: 'k2_13', awayId: 'k2_12', homeScore: 1, awayScore: 1, status: 'FINISHED', stadium: '창원 축구센터' },
    { id: 'm_0705_3', date: '2025-07-05', time: '19:00', league: 'K2', homeId: 'k2_08', awayId: 'k2_01', homeScore: 2, awayScore: 3, status: 'FINISHED', stadium: '아산 이순신' },
    
    { id: 'm_0712_1', date: '2025-07-12', time: '19:00', league: 'K1', homeId: 'k1_01', awayId: 'k1_11', homeScore: 2, awayScore: 2, status: 'FINISHED', stadium: '울산 문수' },
    { id: 'm_0712_2', date: '2025-07-12', time: '19:00', league: 'K2', homeId: 'k2_01', awayId: 'k2_10', homeScore: 1, awayScore: 0, status: 'FINISHED', stadium: '수원 월드컵' },

    { id: 'm_0718_1', date: '2025-07-18', time: '19:30', league: 'K1', homeId: 'k1_11', awayId: 'k1_02', homeScore: 2, awayScore: 3, status: 'FINISHED', stadium: 'DGB대구은행파크' },
    { id: 'm_0718_2', date: '2025-07-18', time: '19:30', league: 'K1', homeId: 'k1_06', awayId: 'k1_09', homeScore: 2, awayScore: 1, status: 'FINISHED', stadium: '수원 종합' },

    { id: 'm_0719_1', date: '2025-07-19', time: '19:00', league: 'K1', homeId: 'k1_04', awayId: 'k1_10', homeScore: 2, awayScore: 3, status: 'FINISHED', stadium: '포항 스틸야드' },
    { id: 'm_0719_2', date: '2025-07-19', time: '19:00', league: 'K1', homeId: 'k1_07', awayId: 'k2_05', homeScore: 2, awayScore: 0, status: 'FINISHED', stadium: '제주 월드컵' },
    
    { id: 'm_0720_1', date: '2025-07-20', time: '19:00', league: 'K1', homeId: 'k1_05', awayId: 'k1_01', homeScore: 1, awayScore: 0, status: 'FINISHED', stadium: '서울 월드컵' },

    // --- 8월 ---
    { id: 'm_0802_1', date: '2025-08-02', time: '19:00', league: 'K1', homeId: 'k1_01', awayId: 'k1_06', homeScore: 2, awayScore: 3, status: 'FINISHED', stadium: '울산 문수' },
    { id: 'm_0802_2', date: '2025-08-02', time: '19:00', league: 'K2', homeId: 'k2_03', awayId: 'k2_08', homeScore: 2, awayScore: 2, status: 'FINISHED', stadium: '광양 전용' },

    { id: 'm_0808_1', date: '2025-08-08', time: '19:30', league: 'K1', homeId: 'k1_10', awayId: 'k2_05', homeScore: 2, awayScore: 1, status: 'FINISHED', stadium: '전주 월드컵' },
    { id: 'm_0808_2', date: '2025-08-08', time: '19:30', league: 'K1', homeId: 'k1_05', awayId: 'k1_11', homeScore: 2, awayScore: 2, status: 'FINISHED', stadium: '서울 월드컵' },

    // --- 9월 ---
    { id: 'm_0913_1', date: '2025-09-13', time: '19:00', league: 'K1', homeId: 'k1_04', awayId: 'k1_01', homeScore: 1, awayScore: 1, status: 'FINISHED', stadium: '포항 스틸야드' },
    { id: 'm_0913_2', date: '2025-09-13', time: '19:00', league: 'K1', homeId: 'k1_10', awayId: 'k1_08', homeScore: 1, awayScore: 0, status: 'FINISHED', stadium: '전주 월드컵' },
    
    { id: 'm_0921_1', date: '2025-09-21', time: '16:30', league: 'K1', homeId: 'k1_01', awayId: 'k2_05', homeScore: 0, awayScore: 0, status: 'FINISHED', stadium: '울산 문수' },
    { id: 'm_0921_2', date: '2025-09-21', time: '19:00', league: 'K1', homeId: 'k1_05', awayId: 'k1_09', homeScore: 3, awayScore: 0, status: 'FINISHED', stadium: '서울 월드컵' },

    // --- 10월 ---
    { id: 'm_1005_1', date: '2025-10-05', time: '14:00', league: 'K1', homeId: 'k1_04', awayId: 'k1_08', homeScore: 1, awayScore: 3, status: 'FINISHED', stadium: '포항 스틸야드' },
    { id: 'm_1005_2', date: '2025-10-05', time: '16:30', league: 'K1', homeId: 'k1_06', awayId: 'k1_05', homeScore: 1, awayScore: 1, status: 'FINISHED', stadium: '수원 종합' },

    { id: 'm_1026_1', date: '2025-10-26', time: '14:00', league: 'K1', homeId: 'k1_01', awayId: 'k1_11', homeScore: 1, awayScore: 1, status: 'FINISHED', stadium: '울산 문수' },
    { id: 'm_1026_2', date: '2025-10-26', time: '14:00', league: 'K1', homeId: 'k1_05', awayId: 'k1_03', homeScore: 4, awayScore: 2, status: 'FINISHED', stadium: '서울 월드컵' },

    // --- 11월 (예정 경기 포함) ---
    { id: 'm_1109_1', date: '2025-11-09', time: '14:00', league: 'K1', homeId: 'k1_04', awayId: 'k1_05', homeScore: 0, awayScore: 0, status: 'FINISHED', stadium: '포항 스틸야드' },
    
    { id: 'm_1122_1', date: '2025-11-22', time: '14:00', league: 'K1', homeId: 'k1_05', awayId: 'k1_02', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '서울 월드컵' },
    { id: 'm_1122_2', date: '2025-11-22', time: '14:00', league: 'K1', homeId: 'k1_08', awayId: 'k1_03', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '대전 월드컵' },
    { id: 'm_1122_3', date: '2025-11-22', time: '16:30', league: 'K1', homeId: 'k1_09', awayId: 'k1_01', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '광주 축구전용' },

    { id: 'm_1123_1', date: '2025-11-23', time: '14:00', league: 'K2', homeId: 'k2_01', awayId: 'k2_06', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '수원 월드컵' },
    { id: 'm_1123_2', date: '2025-11-23', time: '14:00', league: 'K2', homeId: 'k2_11', awayId: 'k2_04', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '탄천 종합' },

    { id: 'm_1130_1', date: '2025-11-30', time: '16:30', league: 'K1', homeId: 'k1_10', awayId: 'k1_05', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '전주 월드컵' },
    { id: 'm_1130_2', date: '2025-11-30', time: '14:00', league: 'K1', homeId: 'k1_01', awayId: 'k1_07', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '울산 문수' }
  ];

  // --- 커뮤니티 더미 데이터 (MOCK_COMMUNITY_POSTS) ---
  // type: 'notice' | 'free' | 'ticket' | 'companion'
  export const MOCK_COMMUNITY_POSTS = [
    // 공지사항
    { 
      id: 1, type: 'notice', title: '[공지] 커뮤니티 이용 규칙 안내', author: '관리자', date: '2025.05.01', views: 1200, likes: 50, comments: 0, isPinned: true,
      content: '커뮤니티 이용 규칙입니다.\n1. 욕설 금지\n2. 도배 금지\n3. 상호 존중 필수\n위반 시 제재될 수 있습니다.',
      commentsList: []
    },
    { 
      id: 2, type: 'notice', title: '[필독] 티켓 양도 시 주의사항', author: '관리자', date: '2025.05.02', views: 980, likes: 42, comments: 2, isPinned: true,
      content: '티켓 양도 시 사기 피해에 주의하세요.\n안전거래를 권장하며, 개인정보 노출에 유의하시기 바랍니다.',
      commentsList: [
        { id: 1, author: '유저1', text: '확인했습니다.', date: '2025.05.02', likes: 1 },
        { id: 2, author: '유저2', text: '조심해야겠네요.', date: '2025.05.03', likes: 0 }
      ]
    },

    // 통합(자유) 게시판
    { 
      id: 3, type: 'free', title: '오늘 경기 직관 가시는 분?', author: '야구광', date: '2025.05.20', views: 342, likes: 12, comments: 8,
      content: '오늘 잠실 경기 혼자 가는데 같이 응원하실 분 계신가요?\n맥주 한잔 하면서 보면 좋을 것 같아요!',
      commentsList: [
        { id: 3, author: '김철수', text: '저도 혼자 가는데!', date: '2025.05.20', likes: 2 }
      ]
    },
    { id: 4, type: 'free', title: '린가드 폼 미쳤다 ㄷㄷ', author: '서울팬', date: '2025.05.19', views: 510, likes: 88, comments: 24, content: '오늘 경기 보셨나요? 진짜 클래스는 영원하네요 ㄷㄷ', commentsList: [] },
    { id: 5, type: 'free', title: '수원FC 이번 시즌 기대되네요', author: '축구도사', date: '2025.05.18', views: 205, likes: 5, comments: 3, content: '선수 보강도 잘됐고 분위기 좋은듯', commentsList: [] },

    // 기존 티켓 양도 게시판 (수정없이 유지)
    { id: 6, type: 'ticket', title: '5/21 기아 vs LG 3루 응원석 양도합니다', author: '티켓요정', date: '2025.05.19', views: 150, likes: 2, comments: 1, teamId: 'kbo_01', price: 25000, status: 'selling', content: '3루 응원석 2연석입니다. 쪽지 주세요.', commentsList: [] },
    { id: 7, type: 'ticket', title: 'FC서울 vs 전북 S석 2연석 팝니다', author: '상암지박령', date: '2025.05.18', views: 220, likes: 4, comments: 5, teamId: 'k1_05', price: 18000, status: 'sold', content: '사정이 생겨 못가게 되었습니다. 정가 양도합니다.', commentsList: [] },
    { id: 8, type: 'ticket', title: '두산 베어스 테이블석 정가 양도', author: '곰돌이', date: '2025.05.17', views: 300, likes: 10, comments: 2, teamId: 'kbo_04', price: 45000, status: 'selling', content: '1루 테이블석입니다. 빠른 거래 원해요.', commentsList: [] },
    
    // 동행 구하기 게시판
    { id: 9, type: 'companion', title: '이번주 토요일 수원 원정 같이 가실 분!', author: '블루윙즈', date: '2025.05.20', views: 80, likes: 1, comments: 0, content: '수원 팬입니다! 원정 같이 응원가실 분 구해요.', commentsList: [] },
    { id: 10, type: 'companion', title: '야구장 처음 가보는데 같이 가주실 분 계신가요 ㅠㅠ', author: '뉴비', date: '2025.05.19', views: 120, likes: 3, comments: 4, content: '룰도 잘 모르는데 가서 배우면서 보고 싶어요', commentsList: [] },

    // --- 추가 데이터 (30개) ---
    // K리그 1 (10개)
    { id: 11, type: 'ticket', title: '울산 HD 문수구장 S석 2연석 양도합니다', author: '울산호랑이', date: '2025.05.21', views: 45, likes: 1, comments: 0, teamId: 'k1_01', price: 18000, status: 'selling', content: '직관 못가게 되어서 팝니다.', commentsList: [] },
    { id: 12, type: 'ticket', title: '김천 상무 홈경기 일반석 급처', author: '군인정신', date: '2025.05.20', views: 32, likes: 0, comments: 1, teamId: 'k1_02', price: 12000, status: 'selling', content: '급하게 팝니다 연락주세요', commentsList: [] },
    { id: 13, type: 'ticket', title: '강원FC 홈경기 W석 1장 팝니다', author: '감자국', date: '2025.05.22', views: 55, likes: 2, comments: 0, teamId: 'k1_03', price: 20000, status: 'selling', content: 'W석 좋은 자리입니다.', commentsList: [] },
    { id: 14, type: 'ticket', title: '포항 스틸야드 원정석 정가 양도', author: '스틸러', date: '2025.05.19', views: 88, likes: 3, comments: 2, teamId: 'k1_04', price: 15000, status: 'sold', content: '판매 완료되었습니다.', commentsList: [] },
    { id: 15, type: 'ticket', title: 'FC서울 상암 S석 통로석', author: '수호신', date: '2025.05.21', views: 120, likes: 5, comments: 3, teamId: 'k1_05', price: 22000, status: 'selling', content: '통로석이라 편해요', commentsList: [] },
    { id: 16, type: 'ticket', title: '수원FC 캐슬파크 일반석 양도', author: '리얼크루', date: '2025.05.18', views: 40, likes: 1, comments: 0, teamId: 'k1_06', price: 14000, status: 'selling', content: '일반석 2장 일괄 양도합니다.', commentsList: [] },
    { id: 17, type: 'ticket', title: '제주 유나이티드 홈경기 E석', author: '감귤타임', date: '2025.05.20', views: 25, likes: 0, comments: 0, teamId: 'k1_07', price: 13000, status: 'selling', content: '제주 홈경기 티켓입니다.', commentsList: [] },
    { id: 18, type: 'ticket', title: '대전 하나시티즌 S석 스탠딩', author: '대전러버', date: '2025.05.17', views: 90, likes: 2, comments: 1, teamId: 'k1_08', price: 15000, status: 'sold', content: '스탠딩석입니다.', commentsList: [] },
    { id: 19, type: 'ticket', title: '전북 현대 전주성 N석 양도', author: '녹색전사', date: '2025.05.19', views: 110, likes: 4, comments: 2, teamId: 'k1_10', price: 17000, status: 'selling', content: '전주성 N석 직관 가실분', commentsList: [] },
    { id: 20, type: 'ticket', title: '대구FC DGB대구은행파크 테이블석', author: '대구짱', date: '2025.05.21', views: 200, likes: 10, comments: 5, teamId: 'k1_11', price: 40000, status: 'selling', content: '2인 테이블석입니다.', commentsList: [] },

    // K리그 2 (10개)
    { id: 21, type: 'ticket', title: '수원 삼성 빅버드 N석 양도해요', author: '프렌테', date: '2025.05.21', views: 130, likes: 6, comments: 4, teamId: 'k2_01', price: 16000, status: 'selling', content: 'N석 응원석입니다.', commentsList: [] },
    { id: 22, type: 'ticket', title: '서울 이랜드 목동 레울파크 테이블석', author: '서울E팬', date: '2025.05.20', views: 60, likes: 2, comments: 1, teamId: 'k2_02', price: 25000, status: 'sold', content: '테이블석 팝니다', commentsList: [] },
    { id: 23, type: 'ticket', title: '전남 드래곤즈 광양 홈경기 일반석', author: '용가리', date: '2025.05.19', views: 30, likes: 0, comments: 0, teamId: 'k2_03', price: 10000, status: 'selling', content: '광양 홈경기입니다.', commentsList: [] },
    { id: 24, type: 'ticket', title: '부산 아이파크 구덕운동장 티켓', author: '부산갈매기', date: '2025.05.18', views: 45, likes: 1, comments: 0, teamId: 'k2_04', price: 12000, status: 'selling', content: '구덕운동장 경기입니다.', commentsList: [] },
    { id: 25, type: 'ticket', title: 'FC안양 홈경기 가변석 2매', author: '보라돌이', date: '2025.05.22', views: 70, likes: 3, comments: 2, teamId: 'k2_05', price: 15000, status: 'selling', content: '가변석이라 시야 좋아요', commentsList: [] },
    { id: 26, type: 'ticket', title: '김포FC 솔터축구장 테이블석 양도', author: '골드라인', date: '2025.05.21', views: 50, likes: 2, comments: 1, teamId: 'k2_06', price: 20000, status: 'selling', content: '테이블석 양도합니다', commentsList: [] },
    { id: 27, type: 'ticket', title: '부천FC 헤르메스석 1장', author: '부천토박이', date: '2025.05.20', views: 40, likes: 1, comments: 0, teamId: 'k2_07', price: 13000, status: 'selling', content: '헤르메스석입니다', commentsList: [] },
    { id: 28, type: 'ticket', title: '성남FC 탄천종합운동장 W석', author: '까치', date: '2025.05.19', views: 35, likes: 0, comments: 0, teamId: 'k2_11', price: 15000, status: 'sold', content: 'W석 시야 좋습니다.', commentsList: [] },
    { id: 29, type: 'ticket', title: '경남FC 창원축구센터 일반석 급처', author: '도민구단', date: '2025.05.18', views: 25, likes: 0, comments: 0, teamId: 'k2_13', price: 9000, status: 'selling', content: '일반석 싸게 넘깁니다.', commentsList: [] },
    { id: 30, type: 'ticket', title: '안산 그리너스 와스타디움 티켓', author: '그린울프', date: '2025.05.22', views: 20, likes: 0, comments: 0, teamId: 'k2_12', price: 10000, status: 'selling', content: '와스타디움 직관 가실분', commentsList: [] },

    // KBO (10개)
    { id: 31, type: 'ticket', title: 'KIA 타이거즈 챔피언스필드 3루 K3석', author: '호랑이팬', date: '2025.05.21', views: 250, likes: 15, comments: 8, teamId: 'kbo_01', price: 18000, status: 'selling', content: '챔필 3루 K3석 팝니다', commentsList: [] },
    { id: 32, type: 'ticket', title: '삼성 라이온즈 라팍 블루존 2연석', author: '최강삼성', date: '2025.05.20', views: 300, likes: 20, comments: 12, teamId: 'kbo_02', price: 30000, status: 'sold', content: '블루존 2연석입니다.', commentsList: [] },
    { id: 33, type: 'ticket', title: 'LG 트윈스 잠실 오렌지석 구해요', author: '무적LG', date: '2025.05.22', views: 180, likes: 5, comments: 3, teamId: 'kbo_03', price: 25000, status: 'selling', content: '오렌지석 구합니다 ㅠㅠ', commentsList: [] },
    { id: 34, type: 'ticket', title: '두산 베어스 1루 네이비석 양도', author: '허슬두', date: '2025.05.19', views: 150, likes: 4, comments: 2, teamId: 'kbo_04', price: 15000, status: 'selling', content: '1루 네이비석 통로입니다.', commentsList: [] },
    { id: 35, type: 'ticket', title: 'KT 위즈 수원 위즈파크 응원지정석', author: '마법사', date: '2025.05.21', views: 120, likes: 3, comments: 1, teamId: 'kbo_05', price: 18000, status: 'selling', content: '응지석 1장 팝니다', commentsList: [] },
    { id: 36, type: 'ticket', title: 'SSG 랜더스필드 프렌들리존 1장', author: '쓱팬', date: '2025.05.18', views: 100, likes: 2, comments: 0, teamId: 'kbo_06', price: 35000, status: 'selling', content: '프렌들리존 1열입니다.', commentsList: [] },
    { id: 37, type: 'ticket', title: '롯데 자이언츠 사직 내야상단', author: '부산갈매기', date: '2025.05.20', views: 200, likes: 8, comments: 4, teamId: 'kbo_07', price: 15000, status: 'sold', content: '사직 내야상단 2연석', commentsList: [] },
    { id: 38, type: 'ticket', title: '한화 이글스파크 1루 응원석', author: '독수리', date: '2025.05.19', views: 280, likes: 12, comments: 6, teamId: 'kbo_08', price: 20000, status: 'selling', content: '1루 응원석 양도합니다.', commentsList: [] },
    { id: 39, type: 'ticket', title: 'NC 다이노스 엔팍 내야석 양도', author: '공룡', date: '2025.05.21', views: 90, likes: 2, comments: 1, teamId: 'kbo_09', price: 16000, status: 'selling', content: '엔팍 내야석입니다.', commentsList: [] },
    { id: 40, type: 'ticket', title: '키움 히어로즈 고척돔 버건디석', author: '영웅', date: '2025.05.22', views: 80, likes: 1, comments: 0, teamId: 'kbo_10', price: 18000, status: 'selling', content: '고척 버건디석 팝니다.', commentsList: [] }
  ];
