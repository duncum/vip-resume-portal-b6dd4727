
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCandidateById, type Candidate } from "@/utils/sheets";
import { ArrowLeft, Printer, ExternalLink, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackDownload } from "@/utils/ipTracker";
import { toast } from "sonner";

const CandidateView = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  const categoryColors = {
    "Executive": "bg-gold/80 border-gold/60",
    "Director": "bg-gold/60 border-gold/40",
    "Mid-Senior level": "bg-gold/40 border-gold/30",
    "Emerging Executives": "bg-gold/30 border-gold/20",
    "One Man Army": "bg-gold border-gold/80"
  };

  const relocationBadge = {
    "willing": { color: "bg-grey-800 text-gold border-gold/30", text: "Open to Relocation" },
    "remote-only": { color: "bg-grey-800 text-white/80 border-grey-700", text: "Remote Only" },
    "flexible": { color: "bg-grey-800 text-gold/70 border-gold/20", text: "Flexible" }
  };

  useEffect(() => {
    const loadCandidate = async () => {
      if (!id) return;
      
      try {
        const data = await fetchCandidateById(id);
        setCandidate(data);
      } catch (error) {
        console.error("Error loading candidate:", error);
        toast("Failed to load candidate", {
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [id]);

  const handlePrintResume = () => {
    if (candidate) {
      trackDownload(candidate.id);
      // Find iframe and print it with watermarks
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.focus();
        iframe.contentWindow?.print();
      } else {
        window.print();
      }
    }
  };

  const handleOpenInNewTab = () => {
    if (candidate) {
      trackDownload(candidate.id);
      // Open the current page in a new tab to view with watermarks
      window.open(window.location.href, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 md:py-12 px-4 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-14 h-14 md:w-16 md:h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
            <p className="mt-4 text-sm md:text-base text-grey-500">Loading candidate details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 md:py-12 px-4 flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Candidate Not Found</h2>
          <p className="text-grey-600 mb-6 text-center text-sm md:text-base">The candidate you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/candidates">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 md:py-8 px-4">
        <div className="mb-6 md:mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/candidates" className="flex items-center text-grey-600 hover:text-gold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
            </Link>
          </Button>
          
          {candidate.category && (
            <div className="mb-4">
              <Badge 
                className={`${categoryColors[candidate.category as keyof typeof categoryColors] || "bg-grey-800 border-grey-700"} text-black mr-2`}
              >
                {candidate.category}
              </Badge>
              {candidate.title && (
                <span className="text-grey-500">
                  {candidate.title}
                </span>
              )}
            </div>
          )}
          
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-4">
            {candidate.headline}
          </h1>
          
          {candidate.summary && (
            <p className="text-grey-300 mb-4 md:mb-6">
              {candidate.summary}
            </p>
          )}
          
          {candidate.location && (
            <div className="flex items-center text-grey-400 mb-4 md:mb-6">
              <MapPin size={16} className="mr-2" />
              <span>{candidate.location}</span>
              
              {candidate.relocationPreference && (
                <Badge 
                  className={`ml-3 ${relocationBadge[candidate.relocationPreference as keyof typeof relocationBadge]?.color || ""}`}
                >
                  {relocationBadge[candidate.relocationPreference as keyof typeof relocationBadge]?.text || candidate.relocationPreference}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
            {candidate.sectors.map((sector, index) => (
              <Badge key={index} variant="outline" className="bg-grey-800/70 text-grey-200 border-grey-700 backdrop-blur-sm shadow-sm text-xs md:text-sm">
                {sector}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-6 md:mb-8">
            {candidate.tags.map((tag, index) => (
              <Badge key={index} className="bg-gold/10 hover:bg-gold/20 text-gold border-gold/20 text-xs md:text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mb-6 md:mb-8 flex flex-wrap gap-3">
            <Button 
              className="bg-gold hover:bg-gold-dark text-black flex items-center gap-2 text-sm md:text-base" 
              onClick={handlePrintResume}
            >
              <Printer size={isMobile ? 14 : 16} />
              Print with Watermark
            </Button>
            
            <Button 
              variant="outline" 
              className="border-grey-700 text-grey-300 flex items-center gap-2 text-sm md:text-base"
              onClick={handleOpenInNewTab}
            >
              <ExternalLink size={isMobile ? 14 : 16} />
              Open in New Tab
            </Button>
          </div>
          
          <div className="border-t border-grey-700 pt-4 md:pt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Resume Preview</h2>
            <ResumeViewer fileUrl={candidate.resumeUrl} candidateId={candidate.id} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidateView;
