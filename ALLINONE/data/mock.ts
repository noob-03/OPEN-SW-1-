import { SportType, MatchStatus, PickSelection, PickResult, UserRole, League, Team, Player, Match, MatchEvent, User, Post, Comment, Pick, Notification, TicketTradePost, Report, ReportStatus } from '../types';

export const leagues: League[] = [
  { id: 1, sportType: SportType.SOCCER, name: 'K리그 1', country: '대한민국' },
  { id: 2, sportType: SportType.BASEBALL, name: 'KBO 리그', country: '대한민국' },
];

export const teams: Team[] = [
  { id: 1, leagueId: 1, name: '울산 HD FC', shortName: '울산', logoUrl: 'https://picsum.photos/seed/ulsan/100/100' },
  { id: 2, leagueId: 1, name: '전북 현대 모터스', shortName: '전북', logoUrl: 'https://picsum.photos/seed/jeonbuk/100/100' },
  { id: 3, leagueId: 2, name: 'LG 트윈스', shortName: 'LG', logoUrl: 'https://picsum.photos/seed/lgtwins/100/100' },
  { id: 4, leagueId: 2, name: '두산 베어스', shortName: '두산', logoUrl: 'https://picsum.photos/seed/doosan/100/100' },
];

export const players: Player[] = [
    { id: 1, teamId: 1, name: '홍명보', position: '수비수', number: 20, profileUrl: 'https://picsum.photos/seed/player1/100/100' },
    { id: 2, teamId: 1, name: '이청용', position: '미드필더', number: 7, profileUrl: 'https://picsum.photos/seed/player2/100/100' },
    { id: 3, teamId: 2, name: '송범근', position: '골키퍼', number: 1, profileUrl: 'https://picsum.photos/seed/player3/100/100' },
    { id: 4, teamId: 3, name: '김현수', position: '외야수', number: 22, profileUrl: 'https://picsum.photos/seed/player4/100/100' },
    { id: 5, teamId: 4, name: '양의지', position: '포수', number: 25, profileUrl: 'https://picsum.photos/seed/player5/100/100' },
];

export const matches: Match[] = [
  { id: 1, leagueId: 1, homeTeamId: 1, awayTeamId: 2, startAt: new Date(new Date().setHours(19, 0, 0)).toISOString(), status: MatchStatus.LIVE, venue: '울산 문수 축구경기장', homeScore: 2, awayScore: 1 },
  { id: 2, leagueId: 2, homeTeamId: 3, awayTeamId: 4, startAt: new Date(new Date().setHours(18, 30, 0)).toISOString(), status: MatchStatus.SCHEDULED, venue: '잠실 야구장', homeScore: 0, awayScore: 0 },
  { id: 3, leagueId: 1, homeTeamId: 2, awayTeamId: 1, startAt: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), status: MatchStatus.SCHEDULED, venue: '전주 월드컵 경기장', homeScore: 0, awayScore: 0 },
  { id: 4, leagueId: 2, homeTeamId: 4, awayTeamId: 3, startAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), status: MatchStatus.FINISHED, venue: '잠실 야구장', homeScore: 5, awayScore: 3 },
];

export const matchEvents: MatchEvent[] = [
    {id: 1, matchId: 1, time: "25'", type: '골', playerName: '이청용'},
    {id: 2, matchId: 1, time: "48'", type: '자책골', playerName: '송범근'},
    {id: 3, matchId: 1, time: "72'", type: '골', playerName: '홍명보'},
    {id: 4, matchId: 4, time: "3회초", type: '홈런', playerName: '김현수'},
];

export const users: User[] = [
    {id: 1, email: 'admin@sportify.com', nickname: '관리자', avatarUrl: 'https://picsum.photos/seed/admin/100/100', role: UserRole.ADMIN, favoriteTeamId: 1},
    {id: 2, email: 'user1@sportify.com', nickname: '축구팬', avatarUrl: 'https://picsum.photos/seed/user1/100/100', role: UserRole.USER, favoriteTeamId: 2},
    {id: 3, email: 'user2@sportify.com', nickname: '야구왕', avatarUrl: 'https://picsum.photos/seed/user2/100/100', role: UserRole.USER, favoriteTeamId: 3},
    {id: 4, email: 'user3@sportify.com', nickname: '스포츠러버', avatarUrl: 'https://picsum.photos/seed/user3/100/100', role: UserRole.USER, favoriteTeamId: 4},
];

export const posts: Post[] = [
    {id: 1, userId: 2, sportType: SportType.SOCCER, title: '울산이 최고!', content: '오늘 경기 정말 멋졌어요! 우리가 우승까지 간다!', createdAt: new Date().toISOString(), commentCount: 2, likes: 15, targetType: 'TEAM', targetId: 1},
    {id: 2, userId: 3, sportType: SportType.BASEBALL, title: '내일 KBO 경기 예측', content: '저는 LG가 이길 것 같아요. 타선이 요즘 불붙었네요.', createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), commentCount: 1, likes: 8, targetType: 'GENERAL'},
    {id: 3, userId: 4, sportType: SportType.SOCCER, title: '이청용 선수 환상적인 골', content: '정말 월드클래스 골이었어요. 지금 다시 보고 있습니다!', createdAt: new Date().toISOString(), commentCount: 0, likes: 22, targetType: 'MATCH', targetId: 1},
];

export const comments: Comment[] = [
    {id: 1, postId: 1, userId: 4, content: '완전 동감합니다! 선수들 정말 잘했어요.', createdAt: new Date().toISOString(), likes: 5},
    {id: 2, postId: 1, userId: 3, content: '전북 팬으로서, 아쉽지만 인정합니다.', createdAt: new Date().toISOString(), likes: 2},
    {id: 3, postId: 2, userId: 2, content: '아니죠, 두산이 이길 겁니다.', createdAt: new Date().toISOString(), likes: 0},
    {id: 4, postId: 101, userId: 3, content: '구매하고 싶습니다. 연락주세요!', createdAt: new Date().toISOString(), likes: 1},
];

export const ticketTradePosts: TicketTradePost[] = [
    {
        id: 101,
        userId: 2,
        sportType: SportType.SOCCER,
        matchId: 1,
        title: '[판매] 울산 vs 전북 1등석 2연석',
        content: 'E-N 구역 5열 10, 11번 자리입니다. 개인 사정으로 못 가게 되어 판매합니다.',
        price: 50000,
        status: 'AVAILABLE',
        createdAt: new Date().toISOString(),
        likes: 10,
        commentCount: 1,
    },
    {
        id: 102,
        userId: 3,
        sportType: SportType.BASEBALL,
        matchId: 2,
        title: '[구매] 잠실 LG vs 두산 블루석 2연석 구합니다',
        content: '블루석이면 어디든 좋습니다. 연락 주세요!',
        price: 80000,
        status: 'AVAILABLE',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        likes: 3,
        commentCount: 0,
    },
    {
        id: 103,
        userId: 4,
        sportType: SportType.BASEBALL,
        matchId: 4,
        title: '[판매완료] 두산 vs LG 테이블석',
        content: '좋은 분께 양도했습니다.',
        price: 120000,
        status: 'SOLD',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        likes: 5,
        commentCount: 0,
    }
];

export const picks: Pick[] = [
    {id: 1, userId: 2, matchId: 3, selection: PickSelection.AWAY, result: PickResult.PENDING},
    {id: 2, userId: 3, matchId: 4, selection: PickSelection.AWAY, result: PickResult.LOSE},
    {id: 3, userId: 4, matchId: 4, selection: PickSelection.HOME, result: PickResult.WIN},
];

export const notifications: Notification[] = [
    {id: 1, userId: 2, type: 'COMMENT', payload: {postId: 1, postTitle: '울산이 최고!', commenter: '스포츠러버'}, read: false, createdAt: new Date().toISOString()},
    {id: 2, userId: 3, type: 'PICK_RESULT', payload: {matchId: 4, result: 'LOSE'}, read: true, createdAt: new Date().toISOString()},
];

export const reports: Report[] = [
    { id: 1, reporterId: 3, targetType: 'POST', targetId: 2, reason: "스팸 콘텐츠", status: ReportStatus.PENDING, createdAt: new Date().toISOString() },
    { id: 2, reporterId: 4, targetType: 'COMMENT', targetId: 2, reason: "부적절한 언어", status: ReportStatus.PENDING, createdAt: new Date().toISOString() },
    { id: 3, reporterId: 2, targetType: 'TICKET_TRADE_POST', targetId: 103, reason: "거래 완료 후에도 게시글이 남아있음", status: ReportStatus.RESOLVED, createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
];