
/**
 * Synchronization utilities between Supabase and Google Sheets
 */

import { supabase, isSupabaseAvailable, handleSupabaseError } from './config'
import type { Candidate } from '../sheets/types'
import { 
  fetchCandidates as fetchCandidatesFromSheets,
  addCandidate as addCandidateToSheets,
  SPREADSHEET_ID
} from '../sheets'
import { checkSheetExists, createSheet } from '../sheets/operations'
import { toast } from 'sonner'

// Table name
const CANDIDATES_TABLE = 'candidates' 

/**
 * Import all candidates from Google Sheets to Supabase
 */
export const importFromSheets = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) return false
  
  try {
    toast.info('Syncing from Google Sheets...', { duration: 10000, id: 'sync-toast' })
    
    // Fetch all candidates from Sheets
    const sheetsData = await fetchCandidatesFromSheets()
    
    if (sheetsData.length === 0) {
      console.log('No data found in Google Sheets')
      toast.warning('No data found in Google Sheets', { id: 'sync-toast' })
      return false
    }
    
    console.log(`Importing ${sheetsData.length} candidates from Google Sheets`)
    
    // Add updated_at timestamp to each candidate
    const dataWithTimestamps = sheetsData.map(candidate => ({
      ...candidate,
      updated_at: new Date().toISOString(),
      source: 'google_sheets_import'
    }))
    
    // Insert all candidates into Supabase (upsert to handle duplicates)
    const { error } = await supabase
      .from(CANDIDATES_TABLE)
      .upsert(dataWithTimestamps, {
        onConflict: 'id',
        ignoreDuplicates: false
      })
    
    if (error) throw error
    
    console.log(`Successfully imported ${sheetsData.length} candidates to Supabase`)
    toast.success(`Imported ${sheetsData.length} candidates from Google Sheets`, { id: 'sync-toast' })
    
    return true
  } catch (error) {
    handleSupabaseError(error, 'importing from Google Sheets')
    toast.error('Failed to import from Google Sheets', { id: 'sync-toast' })
    return false
  }
}

/**
 * Export all candidates from Supabase to Google Sheets
 * This is a more complex operation as it needs to recreate the sheet structure
 */
export const exportToSheets = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) return false
  
  try {
    toast.info('Exporting to Google Sheets...', { duration: 10000, id: 'sync-toast' })
    
    // Get spreadsheet ID from localStorage or default
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID
    
    // Check if Candidates sheet exists, create if not
    const sheetExists = await checkSheetExists(spreadsheetId, 'Candidates')
    if (!sheetExists) {
      console.log('Creating Candidates sheet...')
      const created = await createSheet(spreadsheetId, 'Candidates')
      if (!created) {
        throw new Error('Failed to create Candidates sheet')
      }
    }
    
    // Fetch all candidates from Supabase
    const { data, error } = await supabase
      .from(CANDIDATES_TABLE)
      .select('*')
      .order('id')
    
    if (error) throw error
    
    if (!data || data.length === 0) {
      console.log('No data found in Supabase')
      toast.warning('No data to export', { id: 'sync-toast' })
      return false
    }
    
    console.log(`Exporting ${data.length} candidates to Google Sheets`)
    
    // Since Google Sheets API doesn't have a bulk insert, we need to do this one by one
    // This is not ideal for large datasets but works for typical use cases
    let successCount = 0
    
    for (const candidate of data) {
      try {
        // Add candidate to sheets
        const success = await addCandidateToSheets(candidate)
        if (success) successCount++
      } catch (e) {
        console.error(`Failed to export candidate ${candidate.id}:`, e)
      }
    }
    
    console.log(`Successfully exported ${successCount} of ${data.length} candidates to Google Sheets`)
    toast.success(`Exported ${successCount} of ${data.length} candidates to Google Sheets`, { id: 'sync-toast' })
    
    return true
  } catch (error) {
    handleSupabaseError(error, 'exporting to Google Sheets')
    toast.error('Failed to export to Google Sheets', { id: 'sync-toast' })
    return false
  }
}
