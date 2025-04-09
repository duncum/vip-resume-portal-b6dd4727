
/**
 * Supabase configuration and client initialization
 */

import { toast } from 'sonner'
import { supabase as integrationSupabase } from '@/integrations/supabase/client'

// Export the standardized supabase client from integrations
export const supabase = integrationSupabase;

// Check if Supabase is available
export const isSupabaseAvailable = (): boolean => {
  if (!supabase) {
    console.warn('Supabase client not initialized - ensure you have connected your project to Supabase')
    toast.error('Supabase connection not available', {
      description: 'Please configure Supabase in the project settings'
    })
    return false
  }
  return true
}

// Handle Supabase errors
export const handleSupabaseError = (error: any, operation = 'database operation'): string => {
  console.error(`Error during ${operation}:`, error)
  
  const errorMessage = error.message || String(error)
  toast.error(`Database error: ${errorMessage.substring(0, 100)}`)
  
  return errorMessage
}
