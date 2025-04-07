
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fetchCandidateById, type Candidate } from "@/utils/sheets";
import { toast } from "sonner";
import LoadingState from "@/components/candidates/LoadingState";
import NotFoundState from "@/components/candidates/NotFoundState";
import CandidateHeader from "@/components/candidates/CandidateHeader";
import CandidateTags from "@/components/candidates/CandidateTags";
import CandidateActions from "@/components/candidates/CandidateActions";
import CandidateResume from "@/components/candidates/CandidateResume";

const CandidateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCandidate = async () => {
      if (!id) return;
      
      // Clean ID to ensure we're only using the part before any comma
      const cleanId = id.split(',')[0].trim();
      
      // If the ID contains more than just the ID part, redirect to a clean URL
      if (id !== cleanId && id.includes(',')) {
        console.log("URL contains full data instead of just ID, redirecting to clean URL");
        navigate(`/candidate/${cleanId}`, { replace: true });
        return;
      }
      
      try {
        console.log("Loading candidate with ID:", cleanId);
        const data = await fetchCandidateById(cleanId);
        
        if (!data) {
          console.log("No candidate found with ID:", cleanId);
          setCandidate(null);
        } else {
          console.log("Candidate loaded successfully:", data.id);
          setCandidate(data);
        }
      } catch (error) {
        console.error("Error loading candidate:", error);
        toast.error("Failed to load candidate", {
          description: "Please try again or check your API settings",
        });
        setCandidate(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [id, navigate]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!candidate) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-6 md:py-8 px-4">
        <CandidateHeader candidate={candidate} />
        <CandidateTags sectors={candidate.sectors} tags={candidate.tags} />
        <CandidateActions candidateId={candidate.id} />
        <CandidateResume resumeUrl={candidate.resumeUrl} candidateId={candidate.id} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CandidateView;
