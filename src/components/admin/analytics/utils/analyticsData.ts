
import { supabase } from "@/utils/supabase/config";
import type { AnalyticsProps } from "../types";
import { getDownloadAnalytics } from "@/utils/tracking/analytics";

export const fetchAnalyticsData = async (): Promise<AnalyticsProps["analyticsData"]> => {
  try {
    // Check if Supabase is available
    if (!supabase) {
      console.warn('Supabase client not available for analytics');
      return {
        totalViews: 0,
        uniqueViewers: 0,
        recentViews: [],
        topCandidates: [],
        userInteractions: [],
        downloads: getDownloadAnalytics() // Include download data from local storage
      };
    }

    // Try to fetch analytics data from Supabase
    try {
      // Check if the analytics table exists
      const { count: analyticsCount, error: analyticsCheckError } = await supabase
        .from('analytics')
        .select('*', { count: 'exact', head: true })
        .eq('action', 'download');
        
      // Get download records from Supabase if table exists and has data
      if (!analyticsCheckError && analyticsCount && analyticsCount > 0) {
        const { data: downloadRecords, error: downloadsError } = await supabase
          .from('analytics')
          .select('*')
          .eq('action', 'download')
          .order('timestamp', { ascending: false });
          
        if (!downloadsError && downloadRecords && downloadRecords.length > 0) {
          console.log(`Found ${downloadRecords.length} download records in Supabase`);
          // Process and use these records
        }
      }
    } catch (analyticsError) {
      console.warn('Analytics table may not exist yet:', analyticsError);
    }

    // Get total candidates count
    const { count: candidateCount, error: countError } = await supabase
      .from('candidates')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // Get updated candidates (simulate recent views)
    const { data: recentCandidates, error: recentError } = await supabase
      .from('candidates')
      .select('id, headline, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5);
      
    if (recentError) throw recentError;
    
    // This is a simple example - in a real app, you'd have a dedicated analytics table
    // Let's format the data for our UI
    const recentViews = recentCandidates?.map(candidate => ({
      id: candidate.id,
      headline: candidate.headline || 'No headline',
      viewedAt: candidate.updated_at,
      viewCount: 1
    })) || [];
    
    // Calculate unique viewers (this is a mock - in real app, you'd track actual users)
    const uniqueViewers = Math.min(Math.floor(candidateCount * 0.7), 100);
    
    // Mock top candidates based on available data
    const topCandidates = recentCandidates?.slice(0, 3).map(candidate => ({
      id: candidate.id,
      headline: candidate.headline || 'No headline',
      viewCount: Math.floor(Math.random() * 20) + 1
    })) || [];
    
    // Get download data from tracking system
    const downloadData = getDownloadAnalytics();
    
    return {
      totalViews: candidateCount ? candidateCount * 3 : 0, // Mock: Each candidate viewed ~3 times
      uniqueViewers,
      recentViews,
      topCandidates,
      userInteractions: [], // This would require a dedicated tracking table
      downloads: downloadData
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    // Return download data even if other analytics fail
    return {
      totalViews: 0,
      uniqueViewers: 0,
      recentViews: [],
      topCandidates: [],
      userInteractions: [],
      downloads: getDownloadAnalytics()
    };
  }
};
