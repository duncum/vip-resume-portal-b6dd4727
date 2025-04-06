
import React from 'react';
import { CheckCircle, XCircle, RefreshCw, Info } from 'lucide-react';

type StatusDisplayProps = {
  isLoading: boolean;
  missingCredentials: {
    clientId: boolean;
    apiKey: boolean;
  };
  isAuthorized: boolean;
  userEmail: string | null;
  showSetupInstructions: () => void;
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  isLoading,
  missingCredentials,
  isAuthorized,
  userEmail,
  showSetupInstructions
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <RefreshCw className="h-4 w-4 animate-spin text-grey-400" />
        <span className="ml-2 text-sm text-grey-400">Checking status...</span>
      </div>
    );
  }
  
  if (missingCredentials.apiKey) {
    return (
      <div className="flex items-center text-sm">
        <XCircle className="h-4 w-4 mr-2 text-amber-500" />
        <div>
          <div className="font-medium">Setup required</div>
          <div className="text-xs text-grey-500">
            API Key required to connect
          </div>
        </div>
        <Info 
          className="h-4 w-4 ml-2 text-amber-500 cursor-pointer" 
          onClick={showSetupInstructions}
          aria-label="API credentials missing. Click for setup instructions."
        />
      </div>
    );
  }
  
  if (isAuthorized) {
    return (
      <div className="flex items-center text-sm">
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        <div>
          <div className="font-medium">Connected</div>
          <div className="text-xs text-grey-500">Using service account (no login required)</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-sm">
      <XCircle className="h-4 w-4 mr-2 text-amber-500" />
      <div>
        <div className="font-medium">Not connected</div>
        <div className="text-xs text-grey-500">API connection required</div>
      </div>
    </div>
  );
};

export default StatusDisplay;
