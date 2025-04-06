
// Type definitions for Google Sheets integration

/**
 * Represents a candidate record from the Google Sheet
 */
export interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  resumeUrl: string;
  resumeText?: string; // New field for searchable resume content
  category?: string;
  title?: string;
  summary?: string;
  location?: string;
  relocationPreference?: string;
  notableEmployers?: string;
}

/**
 * Position category types
 */
export const positionCategories = [
  "Executive",
  "Director", 
  "Mid-Senior level",
  "Emerging Executives",
  "One Man Army"
];
