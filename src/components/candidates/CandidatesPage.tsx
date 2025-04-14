
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCandidates } from "@/hooks/use-candidates";
import { useCandidateFilters } from "@/hooks/use-candidate-filters";
import { useIsMobile } from "@/hooks/use-mobile";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import CandidateList from "@/components/candidates/CandidateList";
import ErrorAlert from "@/components/candidates/ErrorAlert";
import CandidateCategories from "@/components/candidates/CandidateCategories";
import { toast } from "sonner";

const CandidatesPage = () => {
  const positionCategories = [
    "All",
    "Executive",
    "Director",
    "Mid-Senior level",
    "Emerging Executives",
    "One Man Army"
  ];

  const isMobile = useIsMobile();
  
  const { 
    candidates, 
    loadCandidates, 
    isLoading, 
    loadError 
  } = useCandidates();
  
  const {
    filteredCandidates,
    activeCategory,
    searchQuery,
    handleSearch,
    handleCategoryChange
  } = useCandidateFilters(candidates);

  useEffect(() => {
    loadCandidates();
    
    const handleFocus = () => {
      console.log("Window gained focus, refreshing candidates data");
      loadCandidates();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [loadCandidates]);

  // Show toast when user is searching and candidates get filtered
  useEffect(() => {
    if (searchQuery && candidates.length > 0 && filteredCandidates.length === 0) {
      toast.info("No matches found. Try different search terms.");
    }
  }, [searchQuery, candidates, filteredCandidates]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow">
        <div className="pt-12 pb-8 bg-radial-gold">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10 animate-fade-down">
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 text-gradient-gold">
                VIP <span className="text-gold">Candidate Profiles</span>
              </h1>
              <p className="text-grey-400 text-sm md:text-base max-w-2xl mx-auto px-2">
                Browse our exclusive selection of qualified candidates for your confidential review.
                {candidates.some(c => c.resumeText) && (
                  <span className="font-medium text-gold"> Full resume text search is available!</span>
                )}
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-6 md:py-8 px-4">
          {loadError && (
            <ErrorAlert 
              message={loadError} 
              actionLink="/admin?tab=google" 
              actionLabel="Fix Google Settings" 
            />
          )}

          <div className="w-full max-w-3xl mx-auto mb-6 md:mb-8 animate-fade-up">
            <CandidateSearch onSearch={handleSearch} />
            <CandidateCategories
              categories={positionCategories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <CandidateList 
            candidates={filteredCandidates}
            isLoading={isLoading}
            itemsPerPage={isMobile ? 3 : 6}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidatesPage;
