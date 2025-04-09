
import type { Candidate } from './types';

/**
 * Maps a row from the Google Sheet to a Candidate object
 * @param row Array of values from a spreadsheet row
 * @returns Candidate object
 */
export const rowToCandidate = (row: any[]): Candidate => {
  // Log the raw row data for debugging
  console.log("Processing row:", row);
  
  // Get the ID safely - ensuring we don't get undefined
  const id = row[0]?.toString() || 'unknown';
  
  // Log the ID for debugging
  console.log("Extracted ID:", id);
  
  // Map the row data to a Candidate object
  // Corrected column mapping based on the sheet structure
  const candidate: Candidate = {
    id: id,
    headline: row[1]?.toString() || 'No headline',
    sectors: (row[2]?.toString() || '').split(',').map(s => s.trim()).filter(Boolean),
    tags: (row[3]?.toString() || '').split(',').map(t => t.trim()).filter(Boolean),
    resumeUrl: row[4]?.toString() || '',
    category: row[5]?.toString() || '',
    title: row[6]?.toString() || '',
    summary: row[7]?.toString() || '',
    location: row[8]?.toString() || '',
    relocationPreference: row[9]?.toString() || 'no',
    notableEmployers: row[10]?.toString() || '',
    resumeText: row[11]?.toString() || '',
    salary: row[12]?.toString() || '',
    contactEmail: row[13]?.toString() || '',
    linkedInUrl: row[14]?.toString() || '',
    appliedDate: row[15]?.toString() || '',
    status: row[16]?.toString() || '',
    source: row[17]?.toString() || '',
    notes: row[18]?.toString() || '',
  };

  // Log the mapped candidate for debugging
  console.log("Mapped candidate:", {
    id: candidate.id,
    category: candidate.category,
    headline: candidate.headline,
    resumeUrl: candidate.resumeUrl ? "Present" : "Missing"
  });

  return candidate;
};
