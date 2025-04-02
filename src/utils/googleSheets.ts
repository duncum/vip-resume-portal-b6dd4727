
// Mocked data until Google Sheets API integration is set up
const mockCandidates = [
  {
    id: "1",
    headline: "Senior Marketing Executive with Global Brand Experience",
    sectors: ["Marketing", "Advertising"],
    tags: ["Leadership", "Digital Marketing", "Brand Strategy"],
    resumeUrl: "https://example.com/resume1.pdf"
  },
  {
    id: "2",
    headline: "Financial Analyst with Investment Banking Background",
    sectors: ["Finance", "Banking"],
    tags: ["Financial Modeling", "Valuation", "M&A"],
    resumeUrl: "https://example.com/resume2.pdf"
  },
  {
    id: "3",
    headline: "Software Engineering Manager with Startup Experience",
    sectors: ["Technology", "Software"],
    tags: ["Team Leadership", "Agile", "Full Stack"],
    resumeUrl: "https://example.com/resume3.pdf"
  },
  {
    id: "4",
    headline: "HR Director specializing in Talent Acquisition",
    sectors: ["Human Resources", "Recruiting"],
    tags: ["Talent Management", "Employee Relations", "HR Strategy"],
    resumeUrl: "https://example.com/resume4.pdf"
  },
  {
    id: "5",
    headline: "Supply Chain Manager with Manufacturing Experience",
    sectors: ["Operations", "Supply Chain"],
    tags: ["Process Optimization", "Logistics", "Inventory Management"],
    resumeUrl: "https://example.com/resume5.pdf"
  },
];

/**
 * Fetch all candidates from Google Sheets API
 * This is a mock implementation until Google Sheets API is integrated
 */
export const fetchCandidates = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockCandidates;
};

/**
 * Fetch a single candidate by ID from Google Sheets API
 * This is a mock implementation until Google Sheets API is integrated
 */
export const fetchCandidateById = async (id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const candidate = mockCandidates.find(c => c.id === id);
  
  if (!candidate) {
    throw new Error("Candidate not found");
  }
  
  return candidate;
};

/**
 * Add a new candidate to Google Sheets
 * This is a mock implementation until Google Sheets API is integrated
 */
export const addCandidate = async (candidateData: any) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Adding candidate:", candidateData);
  return { success: true, id: Math.random().toString(36).substr(2, 9) };
};

// Note: In a real implementation, we would use the Google Sheets API
// with an appropriate authentication method

// Required information for Google Sheets integration:
// 1. Google API credentials
// 2. Google Sheet ID
// 3. Google Sheet range (e.g., 'Sheet1!A1:Z1000')
// 4. Appropriate scopes (e.g., 'https://www.googleapis.com/auth/spreadsheets')
