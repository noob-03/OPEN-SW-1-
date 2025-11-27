
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

  // 2025 경기 일정 (K리그1, K리그2, KBO - 7월~11월 데이터)
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
    { id: 'm_1130_2', date: '2025-11-30', time: '14:00', league: 'K1', homeId: 'k1_01', awayId: 'k1_07', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '울산 문수' },

    // --- KBO (야구) 예시 경기 ---
    { id: 'b_0701_1', date: '2025-07-01', time: '18:30', league: 'KBO', homeId: 'kbo_01', awayId: 'kbo_02', homeScore: 5, awayScore: 3, status: 'FINISHED', stadium: '광주챔피언스필드' },
    { id: 'b_0703_1', date: '2025-07-03', time: '18:30', league: 'KBO', homeId: 'kbo_03', awayId: 'kbo_04', homeScore: 2, awayScore: 2, status: 'FINISHED', stadium: '잠실야구장' },
    { id: 'b_0810_1', date: '2025-08-10', time: '18:30', league: 'KBO', homeId: 'kbo_05', awayId: 'kbo_06', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '수원 KT위즈파크' },
    { id: 'b_0812_1', date: '2025-08-12', time: '18:30', league: 'KBO', homeId: 'kbo_07', awayId: 'kbo_08', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '사직야구장' },
    { id: 'b_1101_1', date: '2025-11-01', time: '18:30', league: 'KBO', homeId: 'kbo_09', awayId: 'kbo_10', homeScore: null, awayScore: null, status: 'SCHEDULED', stadium: '창원NC파크' }
  ];
