
import { ViewData, TrackActivityParams } from './types';
import { addViewRecord } from './storage';
import { recordActivity } from "../sheets/api/trackActivity";

/**
 * Track IP address when a resume is viewed or interacted with
 * @param candidateId The ID of the candidate
 * @param action The type of action (e.g., 'view', 'download', 'click')
 * @param userId Optional user ID if available
 * @param metadata Optional additional data to track
 */
export const trackIpAddress = async (
  candidateId: string, 
  action: string = 'view',
  userId?: string,
  metadata?: Record<string, any>
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
    
    // Get agreement name if available
    const agreementName = localStorage.getItem('contract-name') || 'Unknown';
    
    // Store the view data locally
    const viewData: ViewData = {
      candidateId,
      timestamp,
      ipAddress: simulatedIp,
      action,
      userId: storedUserId,
      userAgent,
      agreementName,
      ...metadata
    };
    
    addViewRecord(viewData);
    
    console.log(`Candidate interaction tracked - Candidate ID: ${candidateId}, Action: ${action}, User: ${storedUserId}, Name: ${agreementName}, IP: ${simulatedIp}, Timestamp: ${timestamp}`);
    
    // Record to Google Sheets
    await recordActivity('view', { 
      candidateId,
      action,
      userId: storedUserId,
      agreementName,
      ...metadata
    });
    
    // Track to Supabase if available
    await trackToSupabase(viewData);
    
    return true;
  } catch (error) {
    console.error("Error tracking IP address:", error);
    return false;
  }
};

/**
 * Track to Supabase analytics table
 */
const trackToSupabase = async (viewData: ViewData) => {
  try {
    const { supabase, isSupabaseAvailable } = await import('../supabase/config');
    
    if (!isSupabaseAvailable()) {
      return false;
    }
    
    const { error } = await supabase
      .from('analytics')
      .insert({
        candidate_id: viewData.candidateId,
        user_id: viewData.userId,
        action: viewData.action,
        timestamp: viewData.timestamp,
        ip_address: viewData.ipAddress,
        user_agent: viewData.userAgent,
        agreement_name: viewData.agreementName,
        metadata: viewData.metadata || {}
      });
    
    if (error) {
      console.error("Error saving to Supabase analytics:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error with Supabase analytics tracking:", error);
    return false;
  }
};

/**
 * Track resume download
 */
export const trackDownload = async (candidateId: string, userId?: string, metadata?: Record<string, any>) => {
  try {
    // Get candidate info for better tracking
    let candidateInfo = {};
    try {
      const { fetchCandidateById } = await import('../hybrid-data-provider');
      const candidate = await fetchCandidateById(candidateId);
      if (candidate) {
        candidateInfo = {
          candidateHeadline: candidate.headline,
          candidateTitle: candidate.title,
          candidateCategory: candidate.category
        };
      }
    } catch (e) {
      console.warn("Couldn't fetch candidate details for tracking", e);
    }
    
    // Add download timestamp
    const downloadTimestamp = new Date().toISOString();
    
    // Track with enhanced metadata
    return await trackIpAddress(
      candidateId, 
      'download', 
      userId,
      {
        downloadTimestamp,
        ...candidateInfo,
        ...metadata
      }
    );
  } catch (error) {
    console.error("Error tracking download:", error);
    return false;
  }
};

