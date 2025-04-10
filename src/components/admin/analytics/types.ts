
import { DownloadRecord } from "@/utils/tracking/types";

export interface AnalyticsProps {
  analyticsData: {
    totalViews: number;
    uniqueViewers: number;
    recentViews: {
      id: string;
      headline: string;
      viewedAt: string;
      viewCount: number;
    }[];
    topCandidates: {
      id: string;
      headline: string;
      viewCount: number;
    }[];
    userInteractions: {
      userId: string;
      views: number;
      downloads: number;
      candidateCount: number;
      lastActivity: string;
    }[];
    downloads?: DownloadRecord[];
    downloadsCount?: number;
  };
  hasData?: boolean;
  isLoading?: boolean;
}
