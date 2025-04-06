
import ResumeViewer from "@/components/candidates/ResumeViewer";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Resume Preview</h2>
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
