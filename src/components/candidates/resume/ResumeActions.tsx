
import { Button } from "@/components/ui/button";
import { Download, Mail, Printer } from "lucide-react";
import { useState } from "react";
import SimpleEmailDialog from "../SimpleEmailDialog";
import { trackDownload, trackIpAddress } from "@/utils/tracking";

interface ResumeActionsProps {
  resumeUrl: string;
  candidateId: string;
}

const ResumeActions = ({ resumeUrl, candidateId }: ResumeActionsProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  
  const handleDownload = () => {
    // Validate the URL before proceeding
    if (!resumeUrl || resumeUrl === "Missing") {
      console.error("Invalid resume URL:", resumeUrl);
      return;
    }
    
    // Track download action
    trackDownload(candidateId);
    
    // Clean up the URL if needed (sometimes Google Drive URLs need adjustment)
    let downloadUrl = resumeUrl;
    
    // Handle Google Drive URLs - ensure they trigger download
    if (downloadUrl.includes('drive.google.com/file/d/')) {
      // Convert view URLs to direct download URLs
      downloadUrl = downloadUrl.replace('/view', '/preview');
      if (!downloadUrl.includes('/preview')) {
        downloadUrl += '/preview';
      }
    }
    
    console.log("Opening resume URL for download:", downloadUrl);
    
    // Open the URL in a new tab (this will trigger download for PDFs and other downloadable files)
    window.open(downloadUrl, '_blank');
  };
  
  const handlePrint = () => {
    // Track print action
    trackIpAddress(candidateId, 'print');
    
    // Trigger print functionality
    window.print();
  };
  
  return (
    <div className="flex gap-2 flex-wrap">
      <Button 
        onClick={handleDownload}
        size="sm"
        variant="outline"
        className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
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
