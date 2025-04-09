
import { useState, useCallback, useEffect } from "react";
import { Candidate } from "@/utils/sheets";

export function useCandidateFilters(candidates: Candidate[] = []) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  
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
    return filtered;
  }, []);

  useEffect(() => {
    const filtered = applyFilters(candidates, searchQuery, activeCategory);
    setFilteredCandidates(filtered);
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
