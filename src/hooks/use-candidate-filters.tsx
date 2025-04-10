
import { useState, useCallback, useEffect } from "react";
import { Candidate } from "@/utils/sheets";
import { toast } from "sonner";

export function useCandidateFilters(candidates: Candidate[] = []) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  
  const applyFilters = useCallback((data: Candidate[], query: string, category: string) => {
    console.log(`Filtering ${data.length} candidates with query: "${query}", category: "${category}"`);
    
    // Start with all candidates
    let filtered = [...data];
    
    // Apply search query filter if it exists
    if (query && query.trim() !== '') {
      const lowerQuery = query.toLowerCase().trim();
      
      try {
        filtered = filtered.filter(candidate => {
          // Check if candidate is valid
          if (!candidate) return false;
          
          // Check standard fields (more efficient)
          const matchesHeadline = candidate.headline?.toLowerCase().includes(lowerQuery) || false;
          const matchesSectors = Array.isArray(candidate.sectors) && 
            candidate.sectors.some(sector => sector?.toLowerCase().includes(lowerQuery));
          const matchesTags = Array.isArray(candidate.tags) && 
            candidate.tags.some(tag => tag?.toLowerCase().includes(lowerQuery));
          const matchesTitle = typeof candidate.title === 'string' && 
            candidate.title.toLowerCase().includes(lowerQuery);
          const matchesSummary = typeof candidate.summary === 'string' && 
            candidate.summary.toLowerCase().includes(lowerQuery);
          const matchesLocation = typeof candidate.location === 'string' && 
            candidate.location.toLowerCase().includes(lowerQuery);
          const matchesEmployers = typeof candidate.notableEmployers === 'string' && 
            candidate.notableEmployers.toLowerCase().includes(lowerQuery);
          
          // If we found a match in standard fields, return true
          if (matchesHeadline || matchesSectors || matchesTags || matchesTitle || 
              matchesSummary || matchesLocation || matchesEmployers) {
            return true;
          }
          
          // Only search resume text if it exists
          if (typeof candidate.resumeText === 'string' && candidate.resumeText.trim() !== '') {
            try {
              const matchesResume = candidate.resumeText.toLowerCase().includes(lowerQuery);
              if (matchesResume) {
                console.log(`Resume text match found for candidate ${candidate.id} with query "${lowerQuery}"`);
                return true;
              }
            } catch (error) {
              console.error(`Error searching resume text for candidate ${candidate.id}:`, error);
            }
          }
          
          return false;
        });
        
        console.log(`After search query filter: ${filtered.length} candidates remain`);
      } catch (error) {
        console.error("Error in search filtering:", error);
        toast.error("Search error occurred. Please try again.");
      }
    }
    
    // Apply category filter if not "All"
    if (category !== "All") {
      try {
        filtered = filtered.filter(candidate => {
          if (!candidate || !candidate.category) return false;
          
          const candidateCategories = candidate.category.split(',')
            .map(cat => cat.trim())
            .filter(cat => cat.length > 0);
            
          return candidateCategories.includes(category);
        });
        
        console.log(`After category filter "${category}": ${filtered.length} candidates remain`);
      } catch (error) {
        console.error("Error in category filtering:", error);
        toast.error("Category filtering error occurred. Please try again.");
      }
    }
    
    return filtered;
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    try {
      const filtered = applyFilters(candidates, searchQuery, activeCategory);
      setFilteredCandidates(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
      setFilteredCandidates(candidates); // Reset to original on error
      toast.error("Error filtering candidates. Showing all results.");
    }
  }, [candidates, searchQuery, activeCategory, applyFilters]);

  const handleSearch = useCallback((query: string) => {
    console.log(`Search query changed to: "${query}"`);
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    console.log(`Category changed to: "${category}"`);
    setActiveCategory(category);
  }, []);

  return {
    filteredCandidates,
    activeCategory,
    searchQuery,
    handleSearch,
    handleCategoryChange,
    applyFilters
  };
}
