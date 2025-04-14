
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
  resumeText?: string;
  category?: string;
  title?: string;
  summary?: string;
  location?: string;
  relocationPreference?: string;
  notableEmployers?: string;
  levels?: string[];
  skills?: string[];
  assetTypes?: string[];
  titles?: Record<string, string[]>;
  salary?: string;
  contactEmail?: string;
  linkedInUrl?: string;
  appliedDate?: string;
  status?: string;
  source?: string;
  notes?: string;
  resumeMatchCount?: number;
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
