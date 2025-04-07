
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import CandidateList from "@/components/candidates/CandidateList";
import { fetchCandidates, type Candidate } from "@/utils/sheets";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [usedMockData, setUsedMockData] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Define position categories
  const positionCategories = [
    "All",
    "Executive",
    "Director",
    "Mid-Senior level",
    "Emerging Executives",
    "One Man Army"
  ];

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        
        // Check for necessary Google configuration
        const apiKey = localStorage.getItem('google_api_key');
        const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
        
        console.log("Loading candidates with API key:", !!apiKey);
        console.log("Loading candidates with spreadsheet ID:", !!spreadsheetId);
        
        // Fetch data from API
        const data = await fetchCandidates();
        setCandidates(data);
        setFilteredCandidates(data);
        
        // Detect if we're using mock data by checking candidate IDs 
        // (all mock data has predefined IDs 1-7)
        const isMockData = data.some(c => ["1", "2", "3", "4", "5", "6", "7"].includes(c.id));
        setUsedMockData(isMockData);
        
        if (isMockData) {
          console.log("Using mock data - check Google configuration");
          if (!apiKey) {
            setLoadError("Google API key is missing");
          } else if (!spreadsheetId) {
            setLoadError("Google Spreadsheet ID is missing");
          } else {
            setLoadError("Connection to Google Sheets failed - using demo data");
          }
        } else {
          // Show success notification
          toast.success("Candidates loaded successfully");
        }
      } catch (error) {
        console.error("Error loading candidates:", error);
        setLoadError("Failed to load candidates - using demo data");
        toast.error("Failed to load candidates");
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const handleSearch = (query: string) => {
    if (!query && activeCategory === "All") {
      setFilteredCandidates(candidates);
      return;
    }

    let filtered = candidates;

    // Apply text search if query exists
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.headline.toLowerCase().includes(lowerQuery) ||
          candidate.sectors.some((sector) => sector.toLowerCase().includes(lowerQuery)) ||
          candidate.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          (candidate.title || "").toLowerCase().includes(lowerQuery) ||
          (candidate.summary || "").toLowerCase().includes(lowerQuery) ||
          (candidate.location || "").toLowerCase().includes(lowerQuery) ||
          (candidate.notableEmployers || "").toLowerCase().includes(lowerQuery) ||
          // Search in resume text if available
          (candidate.resumeText || "").toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply category filter if not "All"
    if (activeCategory !== "All") {
      filtered = filtered.filter((candidate) => candidate.category === activeCategory);
    }
    
    setFilteredCandidates(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredCandidates(candidates);
      return;
    }
    
    const filtered = candidates.filter((candidate) => candidate.category === category);
    setFilteredCandidates(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 md:py-8 px-4">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            VIP <span className="text-gold">Candidate Profiles</span>
          </h1>
          <p className="text-grey-400 text-sm md:text-base max-w-2xl mx-auto px-2">
            Browse our exclusive selection of qualified candidates for your confidential review.
          </p>
        </div>

        {usedMockData && loadError && (
          <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex justify-between items-center">
              <span>{loadError}</span>
              <a 
                href="/admin?tab=google" 
                className="text-xs bg-red-800 px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Fix Google Settings
              </a>
            </AlertDescription>
          </Alert>
        )}

        <CandidateSearch 
          onSearch={handleSearch} 
          categories={positionCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <CandidateList 
          candidates={filteredCandidates}
          isLoading={isLoading}
          itemsPerPage={isMobile ? 3 : 4}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
