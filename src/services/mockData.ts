
import { Candidate } from "@/types/candidate";

// Generate fake candidate data for testing
export const generateMockCandidates = (count: number = 20): Candidate[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = `CAND-${1000 + index}`;
    const categoryOptions = ["Executive", "Director", "Mid-Senior level", "Emerging Executives", "One Man Army"];
    const categoryIndex = Math.floor(Math.random() * categoryOptions.length);
    
    return {
      id,
      headline: `${getSampleTitle()} with ${3 + Math.floor(Math.random() * 15)} years of experience`,
      sectors: getRandomItems(SECTORS, 1 + Math.floor(Math.random() * 3)),
      tags: getRandomItems(SKILLS, 2 + Math.floor(Math.random() * 5)),
      category: categoryOptions[categoryIndex],
      title: getSampleTitle(),
      summary: getSampleSummary(),
      location: getRandomItem(LOCATIONS),
      relocationPreference: Math.random() > 0.5 ? "Open to relocation" : "Not open to relocation",
      notableEmployers: getRandomItems(COMPANIES, 1 + Math.floor(Math.random() * 2)).join(", "),
      resumeUrl: Math.random() > 0.2 ? "https://example.com/resume.pdf" : undefined,
      status: "Active",
    };
  });
};

// Sample data for generation
const SECTORS = [
  "Technology", "Finance", "Healthcare", "Manufacturing", "Retail", 
  "Real Estate", "Energy", "Transportation", "Media", "Telecommunications"
];

const SKILLS = [
  "Leadership", "Strategy", "Operations", "Marketing", "Sales", "Finance", 
  "HR", "Product Management", "Business Development", "Project Management",
  "Data Analysis", "Digital Transformation", "Change Management", "Team Building",
  "Negotiation", "Client Relations", "Stakeholder Management", "Risk Management"
];

const LOCATIONS = [
  "New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX", "Boston, MA",
  "Seattle, WA", "Los Angeles, CA", "Denver, CO", "Atlanta, GA", "Miami, FL",
  "Remote"
];

const COMPANIES = [
  "Google", "Amazon", "Microsoft", "Apple", "Meta", "IBM", "Oracle", "Salesforce",
  "JP Morgan", "Goldman Sachs", "Morgan Stanley", "Deloitte", "KPMG", "PwC", "EY",
  "Johnson & Johnson", "Pfizer", "Merck", "General Electric", "Boeing", "Lockheed Martin"
];

// Helper functions
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getSampleTitle = (): string => {
  const titles = [
    "Chief Executive Officer",
    "Chief Financial Officer",
    "Chief Operating Officer",
    "Chief Technology Officer",
    "Chief Marketing Officer",
    "VP of Engineering",
    "VP of Product",
    "VP of Sales",
    "Director of Operations",
    "Director of Marketing",
    "Senior Product Manager",
    "Head of Business Development",
    "Senior Software Engineer",
    "Principal Architect"
  ];
  return getRandomItem(titles);
};

const getSampleSummary = (): string => {
  const summaries = [
    "Seasoned executive with a proven track record of driving growth and innovation.",
    "Results-driven leader with expertise in scaling organizations and optimizing operations.",
    "Strategic thinker with a passion for solving complex business challenges.",
    "Experienced professional with a history of successful product launches and market expansion.",
    "Innovative manager with strong analytical skills and a focus on team development.",
    "Transformational leader with expertise in digital innovation and organizational change.",
    "Accomplished executive with a background in multinational operations and strategic planning."
  ];
  return getRandomItem(summaries);
};

// Singleton instance of mock data
let mockCandidates: Candidate[] | null = null;

// Function to get all candidates
export const getMockCandidates = (): Candidate[] => {
  if (!mockCandidates) {
    mockCandidates = generateMockCandidates(25);
  }
  return mockCandidates;
};

// Function to get a single candidate by ID
export const getMockCandidateById = (id: string): Candidate | undefined => {
  return getMockCandidates().find(candidate => candidate.id === id);
};

// Function to search candidates
export const searchMockCandidates = (query: string): Candidate[] => {
  if (!query.trim()) return getMockCandidates();
  
  const lowerQuery = query.toLowerCase();
  return getMockCandidates().filter(candidate => 
    candidate.headline.toLowerCase().includes(lowerQuery) ||
    candidate.title?.toLowerCase().includes(lowerQuery) ||
    candidate.summary?.toLowerCase().includes(lowerQuery) ||
    candidate.notableEmployers?.toLowerCase().includes(lowerQuery) ||
    candidate.sectors.some(sector => sector.toLowerCase().includes(lowerQuery)) ||
    candidate.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Function to filter candidates by category
export const filterMockCandidatesByCategory = (category: string): Candidate[] => {
  if (category === 'All') return getMockCandidates();
  
  return getMockCandidates().filter(candidate => 
    candidate.category === category
  );
};
