
export interface AnalyticsProps {
  analyticsData: {
    totalViews: number;
    uniqueViewers: number;
    recentViews: any[];
    topCandidates: any[];
    userInteractions: any[];
  };
  hasData: boolean;
}
