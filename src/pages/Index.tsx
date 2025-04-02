
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateCard from "@/components/candidates/CandidateCard";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import { fetchCandidates } from "@/utils/googleSheets";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  category?: string;
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
      setCurrentPage(1);
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
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredCandidates(candidates);
      setCurrentPage(1);
      return;
    }
    
    const filtered = candidates.filter((candidate) => candidate.category === category);
    setFilteredCandidates(filtered);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Calculate pagination values
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCandidates.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-grey-800/50 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  id={candidate.id}
                  headline={candidate.headline}
                  sectors={candidate.sectors}
                  tags={candidate.tags}
                  category={candidate.category}
                />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                      <PaginationLink
                        isActive={number === currentPage}
                        onClick={() => setCurrentPage(number)}
                        className="cursor-pointer"
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
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
