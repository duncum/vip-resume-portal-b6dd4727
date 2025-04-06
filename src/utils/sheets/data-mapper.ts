
// Functions for mapping between Google Sheets data and application objects
import { Candidate } from './types';

/**
 * Convert Google Sheets row data to a Candidate object
 */
export const rowToCandidate = (row: any[]): Candidate => {
  // Adjust these indices based on your actual sheet structure
  return {
    id: row[0] || "",
    headline: row[1] || "",
    sectors: (row[2] ? row[2].split(',') : []).map((s: string) => s.trim()),
    tags: (row[3] ? row[3].split(',') : []).map((t: string) => t.trim()),
    resumeUrl: row[4] || "",
    category: row[5] || "",
    title: row[6] || "",
    summary: row[7] || "",
    location: row[8] || "",
    relocationPreference: row[9] || "flexible",
    notableEmployers: row[10] || ""
  };
};
