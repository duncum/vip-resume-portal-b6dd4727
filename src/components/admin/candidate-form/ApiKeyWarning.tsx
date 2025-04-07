
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApiKeyWarning = () => {
  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle>Read-Only Mode</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          This application is configured for read-only access to Google Sheets.
          You can view existing candidates but not add new ones.
        </p>
        <div className="mt-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/admin?tab=manage">
              View Candidates
            </Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
