
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
          // Check for standard fields first (these are faster to search)
          const matchesHeadline = candidate.headline?.toLowerCase().includes(lowerQuery);
          const matchesSectors = candidate.sectors?.some((sector) => sector.toLowerCase().includes(lowerQuery));
          const matchesTags = candidate.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
          const matchesTitle = (candidate.title || "").toLowerCase().includes(lowerQuery);
          const matchesSummary = (candidate.summary || "").toLowerCase().includes(lowerQuery);
          const matchesLocation = (candidate.location || "").toLowerCase().includes(lowerQuery);
          const matchesEmployers = (candidate.notableEmployers || "").toLowerCase().includes(lowerQuery);
          
          // If we already found a match in the standard fields, no need to search resume text
          if (matchesHeadline || matchesSectors || matchesTags || matchesTitle || 
              matchesSummary || matchesLocation || matchesEmployers) {
            return true;
          }
          
          // Handle resume text search - which might be large and potentially undefined
          try {
            // Only search if resumeText exists
            if (candidate.resumeText) {
              const matchesResume = candidate.resumeText.toLowerCase().includes(lowerQuery);
              
              // Log successful resume text matches
              if (matchesResume) {
                console.log(`Resume text match found for candidate ${candidate.id} with query "${lowerQuery}"`);
              }
              
              return matchesResume;
            }
          } catch (error) {
            console.error(`Error searching resume text for candidate ${candidate.id}:`, error);
          }
          
          return false;
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
