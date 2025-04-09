
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
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure the candidate ID is clean (just in case)
    const cleanId = candidateId.split(',')[0].trim();
    
    // Log the navigation attempt
    console.log(`Navigating to candidate view: ${cleanId}`);
    
    // Navigate to candidate view page
    navigate(`/candidate/${cleanId}`);
  };
  
  return (
    <button 
      onClick={handleClick}
      className="w-full text-center inline-flex items-center justify-center text-xs px-3 py-2 rounded-md
        bg-gradient-to-r from-gold/20 to-gold/10 hover:from-gold/30 hover:to-gold/20
        text-gold border border-gold/30 
        transition-all duration-500
        hover:shadow-[0_0_15px_rgba(171,135,85,0.2)]
        hover:border-gold/50
        group"
    >
      <FileText size={14} className="mr-1.5 group-hover:scale-110 transition-transform duration-300" />
      View Confidential Resume
    </button>
  );
};

export default ResumeLink;
