
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateCard from "@/components/candidates/CandidateCard";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import { fetchCandidates } from "@/utils/googleSheets";
import { toast } from "sonner";

interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  category?: string; // New field for position category
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Define position categories
  const positionCategories = [
    "All",
    "Internship",
    "Emerging Executives",
    "Mid-Senior level",
    "Director",
    "Executive"
  ];

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        // This would be replaced with actual API call
        const data = await fetchCandidates();

        // Assign random categories for demo purposes
        // In a real implementation, this would come from the API
        const candidatesWithCategories = data.map(candidate => ({
          ...candidate,
          category: positionCategories[Math.floor(Math.random() * (positionCategories.length - 1)) + 1]
        }));

        setCandidates(candidatesWithCategories);
        setFilteredCandidates(candidatesWithCategories);
        
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
          candidate.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
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
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-display mb-2">
            Candidate <span className="text-gold">Profiles</span>
          </h1>
          <p className="text-grey-400 max-w-2xl mx-auto">
            Browse our exclusive selection of qualified candidates for your confidential review.
          </p>
        </div>

        <CandidateSearch 
          onSearch={handleSearch} 
          categories={positionCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-grey-800/50 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                id={candidate.id}
                headline={candidate.headline}
                sectors={candidate.sectors}
                tags={candidate.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-grey-400">No candidates found matching your criteria.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
