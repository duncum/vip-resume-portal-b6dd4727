
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

        {loadError && (
          <ErrorAlert 
            message={loadError} 
            actionLink="/admin?tab=google" 
            actionLabel="Fix Google Settings" 
          />
        )}

        <div className="w-full max-w-3xl mx-auto mb-6 md:mb-8">
          <SearchInput onSearch={handleSearch} />
          <CandidateCategories
            categories={positionCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

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

// This component was extracted from CandidateSearch.tsx to reduce complexity
const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return <CandidateSearch onSearch={onSearch} />;
};

export default CandidatesPage;
