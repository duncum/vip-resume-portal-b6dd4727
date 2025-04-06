
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        toast("Failed to load candidate", {
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [id]);

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
