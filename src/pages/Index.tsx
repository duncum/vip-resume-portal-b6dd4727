
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CandidateCard from "@/components/candidates/CandidateCard";
import CandidateSearch from "@/components/candidates/CandidateSearch";
import { fetchCandidates } from "@/utils/googleSheets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        // This would be replaced with actual API call
        const data = await fetchCandidates();
        setCandidates(data);
        setFilteredCandidates(data);
      } catch (error) {
        console.error("Error loading candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredCandidates(candidates);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = candidates.filter(
      (candidate) =>
        candidate.headline.toLowerCase().includes(lowerQuery) ||
        candidate.sectors.some((sector) => sector.toLowerCase().includes(lowerQuery)) ||
        candidate.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
    
    setFilteredCandidates(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "all") {
      setFilteredCandidates(candidates);
      return;
    }
    
    const filtered = candidates.filter((candidate) =>
      candidate.sectors.includes(value)
    );
    
    setFilteredCandidates(filtered);
  };

  // Get unique sectors for tabs
  const sectors = [...new Set(candidates.flatMap((c) => c.sectors))];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-display mb-2">
            Candidate <span className="text-gold">Profiles</span>
          </h1>
          <p className="text-grey-400 max-w-2xl mx-auto">
            Browse our exclusive selection of qualified candidates for your confidential review.
          </p>
        </div>

        <CandidateSearch onSearch={handleSearch} />

        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-grey-800">
              <TabsTrigger value="all" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                All Sectors
              </TabsTrigger>
              {sectors.map((sector) => (
                <TabsTrigger 
                  key={sector} 
                  value={sector}
                  className="data-[state=active]:bg-gold data-[state=active]:text-black"
                >
                  {sector}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-grey-800/50 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    id={candidate.id}
                    headline={candidate.headline}
                    sectors={candidate.sectors}
                    tags={candidate.tags}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-grey-400">No candidates found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
