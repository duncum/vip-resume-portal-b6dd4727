
/**
 * Utility for making API requests to Google Sheets
 */

import { toast } from "sonner";
import { Candidate } from '../../types';
import { rowToCandidate } from '../../data-mapper';
import { resetFailures } from './failureTracker';
import { cacheCandidates } from './cacheManager';

// Demo data for fallback
const DEMO_CANDIDATES = [
  {
    id: "DEMOxyz1",
    headline: "Senior Executive Leader", 
    sectors: ["Real Estate", "Investments"],
    tags: ["Leadership", "Strategy", "Finance", "Development"],
    category: "Executive",
    title: "CEO, President",
    summary: "Accomplished executive with over 20 years experience in commercial real estate development and investments. Proven track record of leading organizations through significant growth periods.",
    location: "New York, NY",
    relocationPreference: "Open to Relocation",
    notableEmployers: "Major REIT, Prestigious Development Co.",
    resumeUrl: ""
  },
  {
    id: "DEMOxyz2",
    headline: "Development Director", 
    sectors: ["Development", "Construction"],
    tags: ["Project Management", "Entitlements", "Construction", "Finance"],
    category: "Director",
    title: "Development Director, VP Development",
    summary: "Experienced real estate development director specializing in large-scale mixed-use projects. Expert in managing complex entitlement processes and development teams.",
    location: "Los Angeles, CA",
    relocationPreference: "Not Open to Relocation",
    notableEmployers: "Developer Inc., Construction Management Firm",
    resumeUrl: ""
  },
  {
    id: "DEMOxyz3",
    headline: "Acquisitions Manager", 
    sectors: ["Acquisitions", "Investments"],
    tags: ["Underwriting", "Market Analysis", "Due Diligence", "Financial Modeling"],
    category: "Mid-Senior level",
    title: "Acquisitions Manager, Associate Director",
    summary: "Experienced acquisitions professional with strong analytical skills and deep market knowledge. Expert in identifying and evaluating investment opportunities.",
    location: "Dallas, TX",
    relocationPreference: "Open to Relocation",
    notableEmployers: "Investment Firm, Private Equity Fund",
    resumeUrl: ""
  }
];

/**
 * Fetch data from Google Sheets API
 */
export const fetchSheetsData = async (spreadsheetId: string, range: string): Promise<Candidate[]> => {
  try {
    console.log(`Fetching data from spreadsheet ${spreadsheetId}, range ${range}`);
    
    // Execute the request to get the values from the spreadsheet
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: range
    });
    
    console.log("Fetched data successfully:", response);
    
    // If there are no values, return an empty array
    if (!response.result.values || response.result.values.length === 0) {
      console.log("No data found in spreadsheet");
      toast.error("No data found in the spreadsheet", {
        duration: 5000
      });
      return [];
    }
    
    // Map the raw data to candidates
    const candidates = response.result.values.map(rowToCandidate).filter(Boolean) as Candidate[];
    console.log(`Processed ${candidates.length} candidates from spreadsheet`);
    
    // Cache the results for future use
    if (candidates.length > 0) {
      cacheCandidates(candidates);
      resetFailures();
    }
    
    return candidates;
  } catch (error) {
    console.error("Error fetching data from sheets:", error);
    
    // If in development or using fallback setting, return demo data
    if (import.meta.env.DEV || localStorage.getItem('use_demo_data') === 'true') {
      console.log("Using demo candidate data instead");
      toast.info("Using demo candidate data", {
        duration: 3000
      });
      return DEMO_CANDIDATES;
    }
    
    throw error;
  }
};
