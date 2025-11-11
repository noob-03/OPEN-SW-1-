export enum SportType {
  SOCCER = 'SOCCER',
  BASEBALL = 'BASEBALL',
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
}

export enum PickSelection {
  HOME = 'HOME',
  DRAW = 'DRAW',
  AWAY = 'AWAY',
}

export enum PickResult {
  PENDING = 'PENDING',
  WIN = 'WIN',
  LOSE = 'LOSE',
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export enum ReportStatus {
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    DISMISSED = 'DISMISSED'
}

export interface Report {
  id: number;
  reporterId: number;
  targetType: 'POST' | 'COMMENT' | 'TICKET_TRADE_POST';
  targetId: number;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface League {
  id: number;
  sportType: SportType;
  name: string;
  country: string;
}

export interface Team {
  id: number;
  leagueId: number;
  name: string;
  shortName: string;
  logoUrl: string;
}

export interface Player {
  id: number;
  teamId: number;
  name: string;
  position: string;
  number: number;
  profileUrl: string;
}

export interface Match {
  id: number;
  leagueId: number;
  homeTeamId: number;
  awayTeamId: number;
  startAt: string;
  status: MatchStatus;
  venue: string;
  homeScore: number;
  awayScore: number;
}

export interface MatchEvent {
  id: number;
  matchId: number;
  time: string;
  type: string;
  playerName: string;
  meta?: Record<string, any>;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  avatarUrl: string;
  role: UserRole;
  favoriteTeamId?: number;
}

export interface Post {
  id: number;
  userId: number;
  sportType: SportType;
  targetType?: 'MATCH' | 'TEAM' | 'GENERAL';
  targetId?: number;
  title: string;
  content: string;
  images?: string[];
  createdAt: string;
  commentCount: number;
  likes: number;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  likes: number;
}

export interface TicketTradePost {
  id: number;
  userId: number;
  sportType: SportType;
  matchId: number;
  title: string;
  content: string; 
  price: number;
  status: 'AVAILABLE' | 'SOLD';
  createdAt: string;
  likes: number;
  commentCount: number;
}

export interface Pick {
  id: number;
  userId: number;
  matchId: number;
  selection: PickSelection;
  result: PickResult;
}

export interface Notification {
  id: number;
  userId: number;
  type: string;
  payload: Record<string, any>;
  read: boolean;
  createdAt: string;
}