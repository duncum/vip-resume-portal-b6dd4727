
import ResumeActions from "./ResumeActions";

interface ResumeHeaderProps {
  resumeUrl: string;
  candidateId: string;
}

const ResumeHeader = ({ resumeUrl, candidateId }: ResumeHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg md:text-xl font-semibold">Resume Preview</h2>
      <ResumeActions resumeUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default ResumeHeader;
