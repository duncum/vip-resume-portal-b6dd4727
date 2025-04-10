
import { Button } from "@/components/ui/button";
import { Download, Mail, Printer } from "lucide-react";
import { useState } from "react";
import SimpleEmailDialog from "../SimpleEmailDialog";
import { trackDownload, trackIpAddress } from "@/utils/tracking";
import { toast } from "sonner";

interface ResumeActionsProps {
  resumeUrl: string;
  candidateId: string;
}

const ResumeActions = ({ resumeUrl, candidateId }: ResumeActionsProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    // Validate the URL before proceeding
    if (!resumeUrl || resumeUrl === "Missing") {
      console.error("Invalid resume URL:", resumeUrl);
      toast.error("Resume URL not available");
      return;
    }
    
    setIsDownloading(true);
    
    try {
      // Get user info from agreement if available
      const userName = localStorage.getItem('contract-name') || 'Unknown User';
      const agreementTimestamp = localStorage.getItem('contract-timestamp');
      
      // Track download action with enhanced metadata
      try {
        await trackDownload(candidateId, undefined, {
          userName,
          agreementTimestamp,
          downloadMethod: 'direct'
        });
      } catch (error) {
        console.error("Error tracking download:", error);
      }
      
      // Clean up the URL if needed (sometimes Google Drive URLs need adjustment)
      let downloadUrl = resumeUrl;
      
      // Handle Google Drive URLs - ensure they trigger download
      if (downloadUrl.includes('drive.google.com/file/d/')) {
        const fileIdMatch = downloadUrl.match(/\/d\/([^\/]+)/);
        const fileId = fileIdMatch ? fileIdMatch[1] : null;
        
        if (fileId) {
          // Use the export format for Google Drive files
          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        } else {
          // Convert view URLs to direct download URLs as fallback
          downloadUrl = downloadUrl.replace('/view', '/preview');
          if (!downloadUrl.includes('/preview')) {
            downloadUrl += '/preview';
          }
        }
      }
      
      console.log("Opening resume URL for download:", downloadUrl);
      toast.success("Downloading resume...");
      
      // Open the URL in a new tab (this will trigger download for PDFs and other downloadable files)
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Error downloading resume");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handlePrint = async () => {
    try {
      // Get user info from agreement if available
      const userName = localStorage.getItem('contract-name') || 'Unknown User';
      
      // Track print action
      await trackIpAddress(candidateId, 'print', undefined, {
        userName,
        printMethod: 'browser'
      });
      
      // Trigger print functionality
      window.print();
    } catch (error) {
      console.error("Error during print action:", error);
      toast.error("Error initiating print");
    }
  };
  
  return (
    <div className="flex gap-2 flex-wrap">
      <Button 
        onClick={handleDownload}
        size="sm"
        variant="outline"
        className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        disabled={isDownloading}
      >
        <Download className="mr-2 h-4 w-4" />
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
      
      <Button 
        onClick={handlePrint}
        size="sm"
        variant="outline"
        className="bg-white text-gray-600 border-gray-600 hover:bg-gray-50"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button 
        onClick={() => setIsEmailDialogOpen(true)}
        size="sm"
        variant="outline"
        className="bg-white text-gold border-gold hover:bg-gold/10"
      >
        <Mail className="mr-2 h-4 w-4" />
        Email Resume
      </Button>
      
      <SimpleEmailDialog 
        open={isEmailDialogOpen} 
        onOpenChange={setIsEmailDialogOpen}
        candidateId={candidateId}
        resumeUrl={resumeUrl}
      />
    </div>
  );
};

export default ResumeActions;
