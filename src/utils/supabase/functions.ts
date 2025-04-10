
import { supabase } from './config';

/**
 * Check if a table exists in the database
 * This is used to safely check for tables that might not exist yet
 * to prevent TypeScript errors
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    if (!supabase) return false;
    
    // Use explicit type assertion for the function parameters
    const { data, error } = await supabase.rpc('check_table_exists', { 
      table_name: tableName 
    } as Record<string, string>);
    
    if (error) {
      console.error("Error checking if table exists:", error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error("Error in checkTableExists:", error);
    return false;
  }
};

/**
 * Insert data into the analytics table using a stored procedure
 * This avoids TypeScript errors with tables that don't exist yet in the type system
 */
export const insertAnalyticsEvent = async (
  candidateId: string,
  userId: string,
  action: string,
  timestamp: string,
  ipAddress: string,
  userAgent: string,
  agreementName: string,
  metadata: Record<string, any>
): Promise<boolean> => {
  try {
    if (!supabase) return false;
    
    // Use explicit type assertion for the function parameters 
    const { error } = await supabase.rpc('insert_analytics_event', {
      p_candidate_id: candidateId,
      p_user_id: userId,
      p_action: action,
      p_timestamp: timestamp,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
      p_agreement_name: agreementName,
      p_metadata: metadata
    } as Record<string, any>);
    
    if (error) {
      console.error("Error inserting analytics event:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in insertAnalyticsEvent:", error);
    return false;
  }
};
