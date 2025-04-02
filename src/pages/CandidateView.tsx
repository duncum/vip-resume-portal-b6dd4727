
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCandidateById } from "@/utils/googleSheets";
import { ArrowLeft, Download } from "lucide-react";

interface Candidate {
  id: string;
  headline: string;
  sectors: string[];
  tags: string[];
  resumeUrl: string;
}

const CandidateView = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCandidate = async () => {
      if (!id) return;
      
      try {
        const data = await fetchCandidateById(id);
        setCandidate(data);
      } catch (error) {
        console.error("Error loading candidate:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-12 px-4 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
            <p className="mt-4 text-grey-500">Loading candidate details...</p>
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
        <main className="flex-grow container mx-auto py-12 px-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <p className="text-grey-600 mb-6">The candidate you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">
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
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center text-grey-600 hover:text-gold">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold font-display mb-4">
            {candidate.headline}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {candidate.sectors.map((sector, index) => (
              <Badge key={index} variant="outline" className="bg-grey-100 text-grey-700">
                {sector}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-8">
            {candidate.tags.map((tag, index) => (
              <Badge key={index} className="bg-gold/10 text-gold border-gold/20">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mb-8">
            <Button className="bg-gold hover:bg-gold-dark text-white flex items-center gap-2">
              <Download size={16} />
              Download Resume
            </Button>
          </div>
          
          <div className="border-t border-grey-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
            <ResumeViewer fileUrl={candidate.resumeUrl} candidateId={candidate.id} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidateView;
