
import { ViewData, TrackActivityParams } from './types';
import { addViewRecord } from './storage';
import { recordActivity } from "../sheets/api/trackActivity";

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
    
    addViewRecord(viewData);
    
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
