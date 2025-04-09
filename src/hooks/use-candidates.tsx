
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchCandidates, type Candidate } from "@/utils/sheets";
import { toast } from "sonner";

interface UseCandidatesOptions {
  onError?: (error: string) => void;
}

export function useCandidates({ onError }: UseCandidatesOptions = {}) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usedMockData, setUsedMockData] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  const loadCandidates = useCallback(async (retry = false) => {
    try {
      if (!retry) {
        setIsLoading(true);
        setLoadError(null);
      }
      
      const apiKey = localStorage.getItem('google_api_key');
      const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
      
      console.log("Loading candidates with API key:", !!apiKey);
      console.log("Loading candidates with spreadsheet ID:", !!spreadsheetId);
      
      localStorage.setItem('force_api_key_only', 'true');
      
      const data = await fetchCandidates();
      
      console.log(`Loaded ${data.length} candidates:`, data.map(c => ({ 
        id: c.id, 
        category: c.category, 
        headline: c.headline 
      })));
      
      setCandidates(data);
      
      const isMockData = data.some(c => ["1", "2", "3", "4", "5", "6", "7"].includes(c.id));
      setUsedMockData(isMockData);
      
      if (isMockData) {
        console.log("Using mock data - check Google configuration");
        if (!apiKey) {
          setLoadError("Google API key is missing");
        } else if (!spreadsheetId) {
          setLoadError("Google Spreadsheet ID is missing");
        } else {
          setLoadError("Connection to Google Sheets failed - using demo data");
          
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            console.log(`Retry attempt ${retryCount.current}/${maxRetries} in 2 seconds...`);
            setTimeout(() => loadCandidates(true), 2000);
          } else {
            console.log("Max retries reached");
            retryCount.current = 0;
          }
        }
      } else {
        retryCount.current = 0;
        toast.success("Candidates loaded successfully");
      }
    } catch (error) {
      console.error("Error loading candidates:", error);
      setLoadError("Failed to load candidates - using demo data");
      
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        console.log(`Retry attempt ${retryCount.current}/${maxRetries} in 2 seconds...`);
        setTimeout(() => loadCandidates(true), 2000);
      } else {
        console.log("Max retries reached");
        retryCount.current = 0;
        toast.error("Failed to load candidates after multiple attempts");
      }
      
      if (onError) {
        onError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, [maxRetries, onError]);

  return {
    candidates,
    setCandidates,
    filteredCandidates,
    setFilteredCandidates,
    isLoading,
    usedMockData,
    loadError,
    loadCandidates
  };
}
