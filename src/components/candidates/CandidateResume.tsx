
import ResumeViewer from "@/components/candidates/ResumeViewer";
import ResumeHeader from "./resume/ResumeHeader";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <ResumeHeader resumeUrl={resumeUrl} candidateId={candidateId} />
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
