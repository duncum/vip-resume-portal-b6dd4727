
import { supabase } from './config';

/**
 * Check if a table exists in the database
 * This is used to safely check for tables that might not exist yet
 * to prevent TypeScript errors
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    if (!supabase) return false;
    
    // Using any for the generic types to bypass TypeScript constraints
    const { data, error } = await supabase.rpc('check_table_exists', { 
      table_name: tableName 
    });
    
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
    
    // Define the parameters for better code readability
    const params = {
      p_candidate_id: candidateId,
      p_user_id: userId,
      p_action: action,
      p_timestamp: timestamp,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
      p_agreement_name: agreementName,
      p_metadata: metadata
    };
    
    // Using non-generic version to avoid TypeScript constraints
    const { error } = await supabase.rpc('insert_analytics_event', params);
    
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
