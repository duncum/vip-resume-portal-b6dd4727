// Position categories
const positionCategories = [
  "Executive",
  "Director", 
  "Mid-Senior level",
  "Emerging Executives",
  "One Man Army"
];

// Configuration for the Google Sheet
const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || "YOUR_SPREADSHEET_ID"; // Replace with your actual spreadsheet ID
const CANDIDATES_RANGE = "Candidates!A2:Z"; // Adjust based on your sheet structure

// Mocked data until Google Sheets API integration is set up
const mockCandidates = [
  {
    id: "1",
    headline: "Senior Marketing Executive with Global Brand Experience",
    sectors: ["Marketing", "Advertising"],
    tags: ["Leadership", "Digital Marketing", "Brand Strategy"],
    resumeUrl: "https://example.com/resume1.pdf",
    category: "Executive",
    title: "CDO – Development",
    summary: "Strategic marketing leader with over 15 years experience working with Fortune 500 companies and global brands.",
    location: "New York, NY",
    relocationPreference: "willing"
  },
  {
    id: "2",
    headline: "Financial Analyst with Investment Banking Background",
    sectors: ["Finance", "Banking"],
    tags: ["Financial Modeling", "Valuation", "M&A"],
    resumeUrl: "https://example.com/resume2.pdf",
    category: "Mid-Senior level",
    title: "Financial Planning Manager",
    summary: "Detail-oriented financial analyst with expertise in investment banking and private equity transactions.",
    location: "Chicago, IL",
    relocationPreference: "flexible"
  },
  {
    id: "3",
    headline: "Software Engineering Manager with Startup Experience",
    sectors: ["Technology", "Software"],
    tags: ["Team Leadership", "Agile", "Full Stack"],
    resumeUrl: "https://example.com/resume3.pdf",
    category: "Director",
    title: "Director of Development",
    summary: "Engineering leader who has built and scaled multiple technical teams at high-growth startups.",
    location: "San Francisco, CA",
    relocationPreference: "remote-only"
  },
  {
    id: "4",
    headline: "HR Director specializing in Talent Acquisition",
    sectors: ["Human Resources", "Recruiting"],
    tags: ["Talent Management", "Employee Relations", "HR Strategy"],
    resumeUrl: "https://example.com/resume4.pdf",
    category: "Director",
    title: "Director of Procurement",
    summary: "Experienced HR leader with a track record of building effective talent acquisition strategies and programs.",
    location: "Boston, MA",
    relocationPreference: "willing"
  },
  {
    id: "5",
    headline: "Supply Chain Manager with Manufacturing Experience",
    sectors: ["Operations", "Supply Chain"],
    tags: ["Process Optimization", "Logistics", "Inventory Management"],
    resumeUrl: "https://example.com/resume5.pdf",
    category: "Mid-Senior level",
    title: "Procurement Manager",
    summary: "Supply chain expert with experience optimizing complex manufacturing and distribution networks.",
    location: "Detroit, MI",
    relocationPreference: "flexible"
  },
  {
    id: "6",
    headline: "Full Stack Developer with Multiple Technology Expertise",
    sectors: ["Technology", "Software Development"],
    tags: ["Frontend", "Backend", "DevOps", "Database Design", "Cloud Architecture"],
    resumeUrl: "https://example.com/resume6.pdf",
    category: "One Man Army",
    title: "Independent Consultant",
    summary: "Versatile developer capable of handling all aspects of software development from design to deployment.",
    location: "Austin, TX",
    relocationPreference: "remote-only"
  },
  {
    id: "7",
    headline: "Business Development Associate with Tech Background",
    sectors: ["Sales", "Technology"],
    tags: ["Client Relationship", "Prospecting", "SaaS"],
    resumeUrl: "https://example.com/resume7.pdf",
    category: "Emerging Executives",
    title: "Associate",
    summary: "Up-and-coming sales professional with a technical background and a track record of exceeding targets.",
    location: "Seattle, WA",
    relocationPreference: "willing"
  }
];

// Type definitions
interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  resumeUrl: string;
  category?: string;
  title?: string;
  summary?: string;
  location?: string;
  relocationPreference?: string;
}

import { initGoogleApi, isUserAuthorized, signInToGoogle } from './googleAuth';
import { toast } from 'sonner';

/**
 * Ensure the user is authorized before accessing Google Sheets
 */
const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API if needed
    await initGoogleApi();
    
    // Check if the user is authorized
    const authorized = await isUserAuthorized();
    
    if (!authorized) {
      // Prompt for authorization
      const signedIn = await signInToGoogle();
      return signedIn;
    }
    
    return true;
  } catch (error) {
    console.error('Authorization error:', error);
    return false;
  }
};

/**
 * Convert Google Sheets row data to a Candidate object
 */
const rowToCandidate = (row: any[]): Candidate => {
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
    relocationPreference: row[9] || "flexible"
  };
};

/**
 * Fetch all candidates from Google Sheets API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  // Check if we need to use mock data (during development or when not authorized)
  const useRealApi = await ensureAuthorization();
  
  if (!useRealApi) {
    console.log("Using mock data for candidates");
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCandidates;
  }
  
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE
    });
    
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      return [];
    }
    
    // Convert rows to candidate objects
    const candidates = rows.map(rowToCandidate);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates from Google Sheets:", error);
    toast.error("Failed to load candidates from Google Sheets");
    return mockCandidates; // Fall back to mock data on error
  }
};

/**
 * Fetch a single candidate by ID from Google Sheets API
 */
export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  // Check if we need to use mock data
  const useRealApi = await ensureAuthorization();
  
  if (!useRealApi) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
  
  try {
    // Get all candidates and filter by ID
    // A more efficient approach would be to use a query with a filter if your sheet is large
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE
    });
    
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      throw new Error("No data found in Google Sheet");
    }
    
    // Find the row with the matching ID
    const candidateRow = rows.find(row => row[0] === id);
    
    if (!candidateRow) {
      throw new Error("Candidate not found");
    }
    
    return rowToCandidate(candidateRow);
  } catch (error) {
    console.error("Error fetching candidate from Google Sheets:", error);
    toast.error("Failed to load candidate details");
    
    // Fall back to mock data on error
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
};
