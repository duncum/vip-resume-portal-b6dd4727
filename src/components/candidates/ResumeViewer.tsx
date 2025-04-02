
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackIpAddress } from "@/utils/ipTracker";

interface ResumeViewerProps {
  fileUrl: string;
  candidateId: string;
}

const ResumeViewer = ({ fileUrl, candidateId }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track IP address when resume is viewed
    trackIpAddress(candidateId);
    
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [candidateId]);

  return (
    <Card className="w-full border border-grey-200 bg-white">
      <CardContent className="p-0 relative">
        {isLoading ? (
          <div className="h-[800px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
              <p className="mt-4 text-grey-500">Loading document...</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Logo Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="transform -rotate-45 opacity-[0.07]">
                <img 
                  src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" 
                  alt="CRE Confidential" 
                  className="w-[60%] max-w-[500px] min-w-[300px]"
                />
              </div>
            </div>
            
            {/* PDF viewer */}
            <iframe
              src={`${fileUrl}#toolbar=0`}
              className="w-full h-[800px] border-0"
              title="Resume PDF"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeViewer;
