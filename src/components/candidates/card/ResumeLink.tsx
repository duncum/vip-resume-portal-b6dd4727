
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResumeLinkProps {
  resumeUrl?: string;
  candidateId?: string;
}

const ResumeLink = ({ resumeUrl, candidateId }: ResumeLinkProps) => {
  const navigate = useNavigate();
  
  if (!resumeUrl || !candidateId) return null;
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to candidate view page instead of opening in new tab
    navigate(`/candidate/${candidateId}`);
  };
  
  return (
    <button 
      onClick={handleClick}
      className="w-full text-center inline-flex items-center justify-center text-xs px-3 py-2 rounded bg-grey-800 hover:bg-grey-700 text-gold border border-gold/30 transition-all hover:shadow-[0_0_15px_rgba(171,135,85,0.2)] mt-2"
    >
      <FileText size={14} className="mr-1.5" />
      View Confidential Resume
    </button>
  );
};

export default ResumeLink;
