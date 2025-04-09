import { useState, useEffect, useRef, useCallback } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [usedMockData, setUsedMockData] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  const positionCategories = [
    "All",
    "Executive",
    "Director",
    "Mid-Senior level",
    "Emerging Executives",
    "One Man Army"
  ];

  const loadCandidates = useCallback(async (retry = false) => {
    try {
      if (!retry) {
        setIsLoading(true);
        setLoadError(null);
      }
      
      const apiKey = localStorage.getItem('google_api_key');
      const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
      
      console.log("Loading candidates with API key:", !!apiKey);
      console.log("Loading candidates with spreadsheet ID:", !!spreadsheetId);
      
      localStorage.setItem('force_api_key_only', 'true');
      
      const data = await fetchCandidates();
      
      console.log(`Loaded ${data.length} candidates:`, data.map(c => ({ 
        id: c.id, 
        category: c.category, 
        headline: c.headline 
      })));
      
      setCandidates(data);
      
      applyFilters(data, searchQuery, activeCategory);
      
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
          
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            console.log(`Retry attempt ${retryCount.current}/${maxRetries} in 2 seconds...`);
            setTimeout(() => loadCandidates(true), 2000);
          } else {
            console.log("Max retries reached");
            retryCount.current = 0;
          }
        }
      } else {
        retryCount.current = 0;
        toast.success("Candidates loaded successfully");
      }
    } catch (error) {
      console.error("Error loading candidates:", error);
      setLoadError("Failed to load candidates - using demo data");
      
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        console.log(`Retry attempt ${retryCount.current}/${maxRetries} in 2 seconds...`);
        setTimeout(() => loadCandidates(true), 2000);
      } else {
        console.log("Max retries reached");
        retryCount.current = 0;
        toast.error("Failed to load candidates after multiple attempts");
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, activeCategory]);

  const applyFilters = useCallback((data: Candidate[], query: string, category: string) => {
    console.log(`Filtering with query: "${query}", category: "${category}"`);
    console.log(`Data to filter: ${data.length} candidates`);
    
    let filtered = [...data];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (candidate) => {
          const matchesHeadline = candidate.headline?.toLowerCase().includes(lowerQuery);
          const matchesSectors = candidate.sectors?.some((sector) => sector.toLowerCase().includes(lowerQuery));
          const matchesTags = candidate.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
          const matchesTitle = (candidate.title || "").toLowerCase().includes(lowerQuery);
          const matchesSummary = (candidate.summary || "").toLowerCase().includes(lowerQuery);
          const matchesLocation = (candidate.location || "").toLowerCase().includes(lowerQuery);
          const matchesEmployers = (candidate.notableEmployers || "").toLowerCase().includes(lowerQuery);
          const matchesResume = (candidate.resumeText || "").toLowerCase().includes(lowerQuery);
          
          const matches = matchesHeadline || matchesSectors || matchesTags || matchesTitle || 
                         matchesSummary || matchesLocation || matchesEmployers || matchesResume;
          
          if (matches) {
            console.log(`Search match found for candidate ${candidate.id}: ${candidate.headline}`);
          }
          
          return matches;
        }
      );
    }
    
    if (category !== "All") {
      console.log(`Filtering by category: ${category}`);
      filtered = filtered.filter((candidate) => {
        if (!candidate.category) return false;
        
        const categoryList = candidate.category.split(',').map(cat => cat.trim());
        const matches = categoryList.includes(category);
        
        if (matches) {
          console.log(`Category match found for candidate ${candidate.id}: ${candidate.category}`);
        }
        return matches;
      });
    }
    
    console.log(`Filter results: ${filtered.length} candidates`);
    setFilteredCandidates(filtered);
  }, []);

  useEffect(() => {
    loadCandidates();
    
    const handleFocus = () => {
      if (usedMockData) {
        console.log("Window gained focus, refreshing candidates data");
        loadCandidates();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadCandidates, usedMockData]);

  useEffect(() => {
    applyFilters(candidates, searchQuery, activeCategory);
  }, [candidates, searchQuery, activeCategory, applyFilters]);

  const handleSearch = (query: string) => {
    console.log(`Search query changed to: "${query}"`);
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    console.log(`Category changed to: "${category}"`);
    setActiveCategory(category);
    
    if (usedMockData) {
      loadCandidates();
    }
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
