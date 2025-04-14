
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Download, Mail, Printer, Building, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getMockCandidateById } from "@/services/mockData";
import { Candidate } from "@/types/candidate";
import { toast } from "sonner";

const CandidateDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidate = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        const data = getMockCandidateById(id || "");
        
        if (!data) {
          setError("Candidate not found");
          toast.error("Candidate not found");
          return;
        }
        
        setCandidate(data);
      } catch (err) {
        console.error("Error loading candidate:", err);
        setError("Failed to load candidate data");
        toast.error("Error loading candidate details");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCandidate();
  }, [id]);

  const handleDownload = () => {
    toast.success("Download functionality will be implemented later");
  };
  
  const handlePrint = () => {
    toast.success("Print functionality will be implemented later");
  };
  
  const handleEmail = () => {
    toast.success("Email functionality will be implemented later");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          <div className="mb-6">
            <Link to="/candidates" className="text-amber-500 hover:text-amber-400 inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Candidates
            </Link>
          </div>
          
          <div className="space-y-8">
            <Skeleton className="h-8 w-3/4 bg-gray-800/50 rounded-md" />
            <Skeleton className="h-4 w-1/2 bg-gray-800/50 rounded-md" />
            <Skeleton className="h-40 w-full bg-gray-800/50 rounded-md" />
            <Skeleton className="h-60 w-full bg-gray-800/50 rounded-md" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !candidate) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-amber-500 mb-4">Candidate Not Found</h1>
            <p className="text-gray-400 mb-6">
              The candidate you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
              <Link to="/candidates">Return to Candidates</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/candidates" className="text-amber-500 hover:text-amber-400 inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Candidates
          </Link>
        </div>
        
        {/* Candidate Header */}
        <div className="mb-6 relative">
          {/* Gold gradient line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/40 via-amber-500 to-amber-500/40"></div>
          
          {/* Padding div to create space between the line and content */}
          <div className="h-4"></div>
          
          {/* Category badge */}
          <div className="mt-4 mb-3">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-gray-800 text-gray-300">
              {candidate.category || "Uncategorized"}
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 pr-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-amber-500/90">
            {candidate.headline}
          </h1>
          
          {/* Location */}
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            <span>{candidate.location || "Location not specified"}</span>
            {candidate.relocationPreference && (
              <span className="ml-2 text-xs bg-gray-800 px-2 py-0.5 rounded">
                {candidate.relocationPreference}
              </span>
            )}
          </div>
          
          {/* Notable employers */}
          {candidate.notableEmployers && (
            <div className="mb-4 flex items-start group">
              <Building className="h-4 w-4 mr-2 mt-1 text-gray-500" />
              <div>
                <span className="text-amber-500/90 font-medium mr-1">Notable Experience:</span> 
                <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {candidate.notableEmployers}
                </span>
              </div>
            </div>
          )}
          
          {/* Summary */}
          {candidate.summary && (
            <div className="text-gray-300 text-sm md:text-base border-l-2 border-amber-500/30 pl-4 py-1 my-4 bg-gradient-to-br from-gray-800/30 to-gray-800/10 rounded-r-md">
              {candidate.summary}
            </div>
          )}
          
          <div className="absolute bottom-2 left-0 text-amber-500/40">
            <Star size={40} strokeWidth={1} className="opacity-20" />
          </div>
        </div>
        
        {/* Tags & Skills */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-amber-500">Skills & Expertise</h2>
          
          <div className="flex flex-wrap gap-2">
            {candidate.tags?.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm rounded-md bg-gray-800/70 text-gray-300 border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Sectors */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-amber-500">Industry Sectors</h2>
          
          <div className="flex flex-wrap gap-2">
            {candidate.sectors?.map((sector, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm rounded-md bg-blue-900/20 text-blue-300 border border-blue-900/30"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
        
        {/* Resume Placeholder */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-amber-500">Resume</h2>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                size="sm"
                variant="outline"
                className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              
              <Button 
                onClick={handlePrint}
                size="sm"
                variant="outline"
                className="bg-white text-gray-600 border-gray-600 hover:bg-gray-50"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              
              <Button 
                onClick={handleEmail}
                size="sm"
                variant="outline"
                className="bg-white text-amber-500 border-amber-500 hover:bg-amber-50"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Resume
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-lg p-12 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                Resume preview functionality will be implemented in the next phase.
              </p>
              <Button 
                variant="outline" 
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidateDetails;
