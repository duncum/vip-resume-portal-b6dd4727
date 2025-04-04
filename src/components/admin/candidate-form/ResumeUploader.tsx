
import React from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

const ResumeUploader = () => {
  return (
    <div className="border-2 border-dashed border-grey-300 rounded-md p-6 flex flex-col items-center justify-center">
      <Upload className="h-10 w-10 text-grey-400 mb-2" />
      <p className="text-sm text-grey-600 mb-4">Drag and drop or click to upload PDF resume</p>
      <Input 
        type="file"
        accept=".pdf"
        className="max-w-xs"
      />
    </div>
  );
};

export default ResumeUploader;
