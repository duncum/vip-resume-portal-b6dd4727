
import { AnalyticsData, CandidateInteractionSummary, UserInteractionSummary, ViewData } from './types';
import { getAllViewRecords, getCandidateViewRecords } from './storage';

/**
 * Get analytics data from stored views
 */
export const getAnalyticsData = (): AnalyticsData => {
  const viewsHistory = getAllViewRecords();
  
  // Calculate total views
  const totalViews = viewsHistory.length;
  
  // Calculate unique viewers (by IP)
  const uniqueViewers = new Set(viewsHistory.map(view => view.ipAddress)).size;
  
  // Get recent views (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentViews = viewsHistory.filter(view => 
    new Date(view.timestamp) > sevenDaysAgo
  );
  
  // Group views by candidate
  const viewsByCandidate: Record<string, number> = {};
  viewsHistory.forEach(view => {
    if (viewsByCandidate[view.candidateId]) {
      viewsByCandidate[view.candidateId]++;
    } else {
      viewsByCandidate[view.candidateId] = 1;
    }
  });
  
  // Top viewed candidates
  const topCandidates = Object.entries(viewsByCandidate)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, views]) => ({ id, views }));
    
  // Get user interaction data
  const userInteractions = viewsHistory.reduce((acc, curr) => {
    const userId = curr.userId || 'anonymous';
    if (!acc[userId]) {
      acc[userId] = {
        userId,
        totalActions: 0,
        views: 0,
        downloads: 0,
        clicks: 0,
        candidates: new Set(),
        lastActivity: curr.timestamp
      };
    }
    
    acc[userId].totalActions++;
    acc[userId].candidates.add(curr.candidateId);
    
    if (curr.action === 'view' || curr.action === 'view-profile') {
      acc[userId].views++;
    } else if (curr.action === 'download') {
      acc[userId].downloads++;
    } else if (curr.action.includes('click')) {
      acc[userId].clicks++;
    }
    
    // Update last activity if more recent
    if (new Date(curr.timestamp) > new Date(acc[userId].lastActivity)) {
      acc[userId].lastActivity = curr.timestamp;
    }
    
    return acc;
  }, {} as Record<string, UserInteractionSummary>);
  
  // Convert to array and add candidateCount
  const userInteractionsArray = Object.values(userInteractions).map(user => ({
    ...user,
    candidateCount: user.candidates.size,
    candidates: Array.from(user.candidates)
  }));
  
  return {
    totalViews,
    uniqueViewers,
    recentViews,
    topCandidates,
    userInteractions: userInteractionsArray
  };
};

/**
 * Get detailed interactions for a specific candidate
 */
export const getCandidateInteractions = (candidateId: string): CandidateInteractionSummary => {
  const interactions = getCandidateViewRecords(candidateId);
  
  // Group by user
  const userInteractions = interactions.reduce((acc, curr) => {
    const userId = curr.userId || 'anonymous';
    if (!acc[userId]) {
      acc[userId] = {
        userId,
        actions: [],
        firstInteraction: curr.timestamp,
        lastInteraction: curr.timestamp
      };
    }
    
    acc[userId].actions.push({
      action: curr.action,
      timestamp: curr.timestamp
    });
    
    // Update first/last interaction
    if (new Date(curr.timestamp) < new Date(acc[userId].firstInteraction)) {
      acc[userId].firstInteraction = curr.timestamp;
    }
    if (new Date(curr.timestamp) > new Date(acc[userId].lastInteraction)) {
      acc[userId].lastInteraction = curr.timestamp;
    }
    
    return acc;
  }, {} as Record<string, any>);
  
  return {
    candidateId,
    totalInteractions: interactions.length,
    uniqueUsers: Object.keys(userInteractions).length,
    userInteractions: Object.values(userInteractions)
  };
};
