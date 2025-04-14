
import { useEffect } from "react";
import { CandidateProvider, useCandidates } from "@/context/CandidateContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import CandidateCategories from "@/components/candidates/CandidateCategories";
import CandidateList from "@/components/candidates/CandidateList";

const CandidatesContent = () => {
  const { 
    filteredCandidates, 
    isLoading, 
    error,
    searchQuery,
    activeCategory,
    searchCandidates,
    setActiveCategory,
  } = useCandidates();

  // For UI clarity - add a title that shows filter/search state
  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (activeCategory !== 'All') {
      return `${activeCategory} Candidates`;
    }
    return "All Candidates";
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow">
        <div className="pt-12 pb-8 bg-gradient-to-b from-amber-500/10 to-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10 animate-fade-down">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-gold">
                VIP <span className="text-amber-500">Candidate Profiles</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-2">
                Browse our exclusive selection of qualified candidates for your confidential review.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-6 md:py-8 px-4">
          <div className="w-full max-w-3xl mx-auto mb-8 md:mb-10">
            <CandidateSearch onSearch={searchCandidates} />
            <CandidateCategories
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          {/* Results header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-amber-500">{getPageTitle()}</h2>
            <p className="text-gray-400 text-sm">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <CandidateList 
            candidates={filteredCandidates}
            isLoading={isLoading}
            searchQuery={searchQuery}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Wrapper component to provide the CandidateProvider
const Candidates = () => {
  return (
    <CandidateProvider>
      <CandidatesContent />
    </CandidateProvider>
  );
};

export default Candidates;
