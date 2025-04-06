
import { FileText } from "lucide-react";

interface ResumeLinkProps {
  resumeUrl?: string;
}

const ResumeLink = ({ resumeUrl }: ResumeLinkProps) => {
  if (!resumeUrl) return null;
  
  return (
    <a 
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-full text-center inline-flex items-center justify-center text-xs px-3 py-2 rounded bg-grey-800 hover:bg-grey-700 text-gold border border-gold/30 transition-all hover:shadow-[0_0_15px_rgba(171,135,85,0.2)] mt-2"
    >
      <FileText size={14} className="mr-1.5" />
      View Confidential Resume
    </a>
  );
};

export default ResumeLink;
