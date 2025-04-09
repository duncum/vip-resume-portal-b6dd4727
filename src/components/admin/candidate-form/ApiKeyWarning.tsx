
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApiKeyWarning = () => {
  return (
    <Alert variant="default" className="bg-amber-50 border-amber-200 mb-4">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle>API Key Only Mode</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          This app is using API Key only mode, which has limited functionality. You can still add candidates, but some features might be restricted.
        </p>
        <p className="text-sm mt-1">
          Enter a Candidate ID below to get started with uploading a resume.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
