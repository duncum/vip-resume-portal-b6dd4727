
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApiKeyWarning = () => {
  return (
    <Alert variant="default" className="bg-red-50 border-red-200 text-red-800">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle>API Key Only Mode</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          You are in API key only mode which does not support adding candidates.
          OAuth is required to write data to Google Sheets.
        </p>
        <div className="mt-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/admin?tab=manage">
              View Candidates (Read Only)
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
