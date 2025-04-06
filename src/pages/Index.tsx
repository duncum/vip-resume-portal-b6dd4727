
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import CandidateList from "@/components/candidates/CandidateList";
import { fetchCandidates, type Candidate } from "@/utils/sheets";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
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
        // This would be replaced with actual API call
        const data = await fetchCandidates();
        setCandidates(data);
        setFilteredCandidates(data);
        
        // Show success notification
        toast.success("Candidates loaded successfully");
      } catch (error) {
        console.error("Error loading candidates:", error);
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
