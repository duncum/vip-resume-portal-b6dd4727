
/**
 * Types for tracking user interactions with candidates
 */

export interface ViewData {
  candidateId: string;
  timestamp: string;
  ipAddress?: string;
  action: string;
  userId?: string;
  userAgent?: string;
  agreementName?: string;
  metadata?: Record<string, any>;
}

export interface UserInteractionSummary {
  userId: string;
  totalActions: number;
  views: number;
  downloads: number;
  clicks: number;
  candidates: Set<string>;
  lastActivity: string;
  agreementName?: string;
}

export interface CandidateInteractionSummary {
  candidateId: string;
  totalInteractions: number;
  uniqueUsers: number;
  userInteractions: any[];
}

export interface AnalyticsData {
  totalViews: number;
  uniqueViewers: number;
  recentViews: ViewData[];
  topCandidates: {id: string, views: number}[];
  userInteractions: any[];
  downloads: DownloadRecord[];
}

export interface DownloadRecord {
  id: string;
  candidateId: string;
  candidateHeadline?: string;
  downloadTime: string;
  userName: string;
  userId: string;
}

export interface TrackActivityParams {
  candidateId: string;
  action: string;
  userId?: string;
  agreementName?: string;
}

