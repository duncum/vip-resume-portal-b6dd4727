
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ApiKeyWarning = () => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API Key Only Mode</AlertTitle>
      <AlertDescription>
        You are in API key only mode which does not support adding candidates.
        Please add a Google OAuth Client ID in the Google Integration settings to enable this feature.
      </AlertDescription>
    </Alert>
  );
};

export default ApiKeyWarning;
