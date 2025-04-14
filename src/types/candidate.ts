
export interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  resumeUrl?: string;
  resumeText?: string;
  category?: string;
  title?: string;
  summary?: string;
  location?: string;
  relocationPreference?: string;
  notableEmployers?: string;
  levels?: string[];
  skills?: string[];
  status?: string;
  appliedDate?: string;
  source?: string;
  contact?: string;
  resumeMatchCount?: number;
}

export const POSITION_CATEGORIES = [
  "All",
  "Executive",
  "Director", 
  "Mid-Senior level",
  "Emerging Executives",
  "One Man Army"
];
