
import { useState, useCallback, useEffect } from "react";
import { Candidate } from "@/utils/sheets";
import { toast } from "sonner";
import { searchCandidates } from "@/utils/search/resumeSearch";

export function useCandidateFilters(candidates: Candidate[] = []) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  
  const applyFilters = useCallback((data: Candidate[], query: string, category: string) => {
    console.log(`Filtering ${data.length} candidates with query: "${query}", category: "${category}"`);
    
    try {
      // First apply search filter
      let filtered = searchCandidates(data, query);
      
      // Then apply category filter if not "All"
      if (category !== "All") {
        filtered = filtered.filter(candidate => {
          if (!candidate || !candidate.category) return false;
          
          const candidateCategories = candidate.category.split(',')
            .map(cat => cat.trim())
            .filter(cat => cat.length > 0);
            
          return candidateCategories.includes(category);
        });
        
        console.log(`After category filter "${category}": ${filtered.length} candidates remain`);
      }
      
      return filtered;
    } catch (error) {
      console.error("Error applying filters:", error);
      toast.error("Error filtering candidates. Showing all results.");
      return data;
    }
  }, []);

  // Apply filters whenever dependencies change
  useEffect(() => {
    try {
      const filtered = applyFilters(candidates, searchQuery, activeCategory);
      setFilteredCandidates(filtered);
      
      // Show toast for resume matches when search is performed
      if (searchQuery && filtered.length > 0) {
        const resumeMatches = filtered.filter(c => 
          c.resumeText && c.resumeText.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (resumeMatches.length > 0) {
          toast.success(`Found ${resumeMatches.length} matches in resume content!`, {
            id: "resume-search-success",
            duration: 3000
          });
        }
      }
    } catch (error) {
      console.error("Error applying filters:", error);
      setFilteredCandidates(candidates);
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
