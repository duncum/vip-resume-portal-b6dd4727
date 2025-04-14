
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Candidate } from '@/types/candidate';
import { getMockCandidates, searchMockCandidates, filterMockCandidatesByCategory } from '@/services/mockData';
import { toast } from 'sonner';

type CandidateContextType = {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  activeCategory: string;
  searchCandidates: (query: string) => void;
  setActiveCategory: (category: string) => void;
  refreshCandidates: () => void;
};

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Function to load candidates
  const refreshCandidates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = getMockCandidates();
      setCandidates(data);
      setFilteredCandidates(data);
    } catch (err) {
      console.error('Error loading candidates:', err);
      setError('Failed to load candidates. Please try again.');
      toast.error('Error loading candidates');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  // Search function
  const searchCandidates = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Apply both search and category filters
    let results = searchMockCandidates(query);
    if (activeCategory !== 'All') {
      results = results.filter(candidate => candidate.category === activeCategory);
    }
    
    setFilteredCandidates(results);
    
    // Show toast for no results
    if (query && results.length === 0) {
      toast.info('No candidates found matching your search criteria.');
    }
  }, [activeCategory]);

  // Category filter function  
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    
    // Apply both category and search filters
    let results = filterMockCandidatesByCategory(category);
    if (searchQuery) {
      results = results.filter(candidate => 
        candidate.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.sectors.some(sector => sector.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candidate.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredCandidates(results);
  }, [searchQuery]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        filteredCandidates,
        isLoading,
        error,
        searchQuery,
        activeCategory,
        searchCandidates,
        setActiveCategory: handleCategoryChange,
        refreshCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
};
