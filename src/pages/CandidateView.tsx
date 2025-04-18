
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
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const loadCandidate = async () => {
      if (!id) {
        setIsLoading(false);
        setCandidate(null);
        return;
      }
      
      // Clean ID to ensure we're only using the part before any comma
      const cleanId = id.split(',')[0].trim();
      
      // If the ID is "FALSE", redirect to candidates list
      if (cleanId === "FALSE") {
        console.log("Invalid ID 'FALSE' detected, redirecting to candidates page");
        navigate('/candidates', { replace: true });
        return;
      }
      
      // If the ID contains more than just the ID part, redirect to a clean URL
      if (id !== cleanId && (id.includes(',') || id.length > 50)) {
        console.log("URL contains full data instead of just ID, redirecting to clean URL");
        setIsRedirecting(true);
        navigate(`/candidate/${cleanId}`, { replace: true });
        return;
      }
      
      try {
        console.log("Loading candidate with ID:", cleanId);
        const data = await fetchCandidateById(cleanId);
        
        if (!data) {
          console.log("No candidate found with ID:", cleanId);
          toast.error("Candidate not found", {
            description: "This candidate may have been removed or doesn't exist.",
            duration: 5000
          });
          setCandidate(null);
        } else {
          console.log("Candidate loaded successfully:", data.id);
          setCandidate(data);
        }
      } catch (error) {
        console.error("Error loading candidate:", error);
        toast.error("Failed to load candidate", {
          description: "Please try again or check your API settings",
          duration: 5000
        });
        setCandidate(null);
      } finally {
        setIsLoading(false);
        setIsRedirecting(false);
      }
    };

    loadCandidate();
  }, [id, navigate]);

  if (isRedirecting) {
    return (
      <LoadingState message="Fixing URL format, please wait..." />
    );
  }

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
