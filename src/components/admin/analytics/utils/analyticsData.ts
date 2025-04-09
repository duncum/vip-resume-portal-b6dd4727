
import { supabase } from "@/utils/supabase/config";
import type { AnalyticsProps } from "../types";

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
        userInteractions: []
      };
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
    
    return {
      totalViews: candidateCount ? candidateCount * 3 : 0, // Mock: Each candidate viewed ~3 times
      uniqueViewers,
      recentViews,
      topCandidates,
      userInteractions: [] // This would require a dedicated tracking table
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    // Return empty data structure on error
    return {
      totalViews: 0,
      uniqueViewers: 0,
      recentViews: [],
      topCandidates: [],
      userInteractions: []
    };
  }
};
