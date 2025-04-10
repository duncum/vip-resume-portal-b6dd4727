
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchCandidates, type Candidate } from "@/utils/sheets";
import { toast } from "sonner";
import { signInToGoogle } from "@/utils/google";

interface UseCandidatesOptions {
  onError?: (error: string) => void;
}

export function useCandidates({ onError }: UseCandidatesOptions = {}) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      
      // Force API key only mode
      localStorage.setItem('force_api_key_only', 'true');
      
      // Auto connect to Google API if needed
      if (!window.gapi?.client?.sheets) {
        console.log("API not initialized, attempting to connect...");
        await signInToGoogle();
      }
      
      // Load test data if API key is missing
      if (!apiKey || !spreadsheetId) {
        console.log("Missing API credentials, using test data");
        const testData: Candidate[] = [
          {
            id: "TEST1",
            headline: "Executive Test Candidate",
            sectors: ["Real Estate", "Investments"],
            tags: ["Leadership", "Strategy"],
            category: "Executive",
            title: "CEO",
            summary: "Test candidate for development purposes",
            location: "New York, NY",
            relocationPreference: "Open to Relocation",
            resumeUrl: "",
            notableEmployers: "Test Corp, Demo Industries"
          },
          {
            id: "TEST2",
            headline: "Director Test Candidate",
            sectors: ["Development", "Asset Management"],
            tags: ["Project Management", "Team Leadership"],
            category: "Director",
            title: "Director of Development",
            summary: "Another test candidate for development purposes",
            location: "Chicago, IL",
            relocationPreference: "Not Open to Relocation",
            resumeUrl: "",
            notableEmployers: "Sample Corp, Example LLC"
          },
          {
            id: "TEST3",
            headline: "Mid-Level Test Candidate",
            sectors: ["Leasing", "Marketing"],
            tags: ["Negotiation", "Market Analysis"],
            category: "Mid-Senior level",
            title: "Leasing Manager",
            summary: "Third test candidate for development purposes",
            location: "Los Angeles, CA",
            relocationPreference: "Open to Relocation",
            resumeUrl: "",
            notableEmployers: "Demo Properties, Test Management"
          }
        ];
        
        setCandidates(testData);
        setFilteredCandidates(testData);
        setIsLoading(false);
        return;
      }
      
      const data = await fetchCandidates();
      
      console.log(`Loaded ${data.length} candidates:`, data.map(c => ({ 
        id: c.id, 
        category: c.category, 
        headline: c.headline 
      })));
      
      setCandidates(data);
      setFilteredCandidates(data);
      
      if (data.length > 0) {
        toast.success(`${data.length} candidates loaded successfully`);
      } else {
        toast.warning("No candidates found in the spreadsheet");
      }
      
      retryCount.current = 0;
    } catch (error) {
      console.error("Error loading candidates:", error);
      
      if (error instanceof Error) {
        setLoadError(error.message);
      } else {
        setLoadError("Failed to load candidates");
      }
      
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        console.log(`Retry attempt ${retryCount.current}/${maxRetries} in 2 seconds...`);
        setTimeout(() => loadCandidates(true), 2000);
      } else {
        console.log("Max retries reached");
        retryCount.current = 0;
        
        // Load fallback data if available
        const fallbackData = localStorage.getItem('cached_candidates');
        if (fallbackData) {
          try {
            const parsedData = JSON.parse(fallbackData) as Candidate[];
            setCandidates(parsedData);
            setFilteredCandidates(parsedData);
            toast.info("Using cached candidate data", { duration: 5000 });
          } catch (parseError) {
            console.error("Error parsing cached candidates:", parseError);
            toast.error("Failed to load candidates after multiple attempts");
          }
        } else {
          toast.error("Failed to load candidates after multiple attempts");
        }
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
    loadError,
    loadCandidates
  };
}
