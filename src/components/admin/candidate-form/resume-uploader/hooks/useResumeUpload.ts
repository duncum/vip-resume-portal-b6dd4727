
import { useState } from "react";
import { toast } from "sonner";
import { uploadResumeToDrive, deleteResumeFromDrive } from "@/utils/drive";
import { extractTextFromPdf } from "@/utils/pdf";

interface UseResumeUploadOptions {
  candidateId: string;
  onResumeUrlChange?: (url: string) => void;
  onResumeTextChange?: (text: string) => void;
  disabled?: boolean;
}

export const useResumeUpload = ({
  candidateId,
  onResumeUrlChange,
  onResumeTextChange,
  disabled
}: UseResumeUploadOptions) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileSelect = async (file: File) => {
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }
    
    setSelectedFile(file);
    
    // Extract text from the PDF
    if (onResumeTextChange) {
      try {
        setIsExtracting(true);
        const extractedText = await extractTextFromPdf(file);
        onResumeTextChange(extractedText);
        toast.success('Resume text extracted successfully');
      } catch (error) {
        console.error('Error extracting text from PDF:', error);
        toast.error('Failed to extract text from PDF');
      } finally {
        setIsExtracting(false);
      }
    }
  };

  const handleUpload = async () => {
    if (!candidateId.trim()) {
      toast.error('Please enter a Candidate ID first');
      return;
    }
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const resumeUrl = await uploadResumeToDrive(selectedFile, candidateId);
      setUploadedUrl(resumeUrl);
      
      if (onResumeUrlChange) {
        onResumeUrlChange(resumeUrl);
      }
      
      toast.success('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setIsUploading(false);
    }
  };
  
  const resetUpload = async () => {
    // If there's no uploaded URL, nothing to delete
    if (!uploadedUrl) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      // Try to delete the file from Google Drive
      await deleteResumeFromDrive(uploadedUrl);
      
      // Clear the form state
      setSelectedFile(null);
      setUploadedUrl("");
      
      if (onResumeUrlChange) {
        onResumeUrlChange("");
      }
      
      if (onResumeTextChange) {
        onResumeTextChange("");
      }
      
      toast.success('Resume removed successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to remove resume');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    selectedFile,
    isUploading,
    isExtracting,
    isDeleting,
    uploadedUrl,
    handleFileSelect,
    handleUpload,
    resetUpload
  };
};
