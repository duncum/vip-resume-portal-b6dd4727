
import { recordActivity } from "./sheets/api/trackActivity";

// Define types for tracking data
interface ViewData {
  candidateId: string;
  timestamp: string;
  ipAddress?: string;
}

// In-memory storage for tracked views (used alongside Google Sheets)
const viewsHistory: ViewData[] = [];

/**
 * Track IP address when a resume is viewed
 */
export const trackIpAddress = async (candidateId: string) => {
  try {
    // Get the current timestamp
    const timestamp = new Date().toISOString();
    
    // In a real implementation, you would get the IP address from a server call
    // For this demo, we'll create a simulated IP address
    const simulatedIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    // Store the view data locally
    const viewData: ViewData = {
      candidateId,
      timestamp,
      ipAddress: simulatedIp
    };
    
    viewsHistory.push(viewData);
    
    console.log(`Resume view tracked - Candidate ID: ${candidateId}, IP: ${simulatedIp}, Timestamp: ${timestamp}`);
    
    // Record to Google Sheets
    await recordActivity('view', { candidateId });
    
    return true;
  } catch (error) {
    console.error("Error tracking IP address:", error);
    return false;
  }
};

/**
 * Track resume download
 */
export const trackDownload = async (candidateId: string) => {
  try {
    // Get the current timestamp
    const timestamp = new Date().toISOString();
    
    // In a real implementation, you would get the IP address from a server call
    // For this demo, we'll create a simulated IP address
    const simulatedIp = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    console.log(`Resume download tracked - Candidate ID: ${candidateId}, IP: ${simulatedIp}, Timestamp: ${timestamp}`);
    
    // Record to Google Sheets
    await recordActivity('print', { candidateId });
    
    return true;
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
  
  return {
    totalViews,
    uniqueViewers,
    recentViews,
    topCandidates
  };
};
