
/**
 * Supabase configuration and client initialization
 */

import { createClient } from '@supabase/supabase-js'
import { toast } from 'sonner'

// Get Supabase URL and anon key from environment variables or localStorage
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('supabase_url') || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('supabase_anon_key') || ''

// Check if we have the necessary credentials
const hasSupabaseCredentials = supabaseUrl && supabaseAnonKey

// Create Supabase client
export const supabase = hasSupabaseCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Handle Supabase errors
export const handleSupabaseError = (error: any, operation = 'database operation'): string => {
  console.error(`Error during ${operation}:`, error)
  
  const errorMessage = error.message || String(error)
  toast.error(`Database error: ${errorMessage.substring(0, 100)}`)
  
  return errorMessage
}

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
