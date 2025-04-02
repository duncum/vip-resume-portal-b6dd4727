
// Position categories
const positionCategories = [
  "Executive",
  "Director",
  "Mid-Senior level",
  "Emerging Executives",
  "One Man Army"
];

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
