
import { recordActivity } from "./sheets/api/trackActivity";

// Define types for tracking data
interface ViewData {
  candidateId: string;
  timestamp: string;
  ipAddress?: string;
  action: string;
  userId?: string;
  userAgent?: string;
}

// In-memory storage for tracked views (used alongside Google Sheets)
const viewsHistory: ViewData[] = [];

/**
 * Track IP address when a resume is viewed or interacted with
 * @param candidateId The ID of the candidate
 * @param action The type of action (e.g., 'view', 'download', 'click')
 * @param userId Optional user ID if available
 */
export const trackIpAddress = async (
  candidateId: string, 
  action: string = 'view',
  userId?: string
) => {
  try {
    // Get the current timestamp
    const timestamp = new Date().toISOString();
    
    // In a real implementation, you would get the IP address from a server call
    // For this demo, we'll create a simulated IP address
    const simulatedIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    // Get user agent
    const userAgent = navigator.userAgent;
    
    // Try to get user ID from localStorage if not provided
    const storedUserId = userId || localStorage.getItem('user_id') || 'anonymous';
    
    // Store the view data locally
    const viewData: ViewData = {
      candidateId,
      timestamp,
      ipAddress: simulatedIp,
      action,
      userId: storedUserId,
      userAgent
    };
    
    viewsHistory.push(viewData);
    
    console.log(`Candidate interaction tracked - Candidate ID: ${candidateId}, Action: ${action}, User: ${storedUserId}, IP: ${simulatedIp}, Timestamp: ${timestamp}`);
    
    // Record to Google Sheets
    await recordActivity('view', { 
      candidateId,
      action,
      userId: storedUserId
    });
    
    return true;
  } catch (error) {
    console.error("Error tracking IP address:", error);
    return false;
  }
};

/**
 * Track resume download
 */
export const trackDownload = async (candidateId: string, userId?: string) => {
  try {
    return await trackIpAddress(candidateId, 'download', userId);
  } catch (error) {
    console.error("Error tracking download:", error);
    return false;
  }
};

/**
 * Get analytics data from stored views
 */
export const getAnalyticsData = () => {
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
  }, {} as Record<string, any>);
  
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
export const getCandidateInteractions = (candidateId: string) => {
  const interactions = viewsHistory.filter(view => view.candidateId === candidateId);
  
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
