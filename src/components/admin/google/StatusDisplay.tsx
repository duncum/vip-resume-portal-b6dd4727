
import React from 'react';
import { CheckCircle, XCircle, RefreshCw, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type StatusDisplayProps = {
  isLoading: boolean;
  missingCredentials: {
    clientId: boolean;
    apiKey: boolean;
  };
  isAuthorized: boolean;
  userEmail: string | null;
  error?: string | null;
  showSetupInstructions: () => void;
  switchToApiKeyOnlyMode?: () => boolean;
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({
  isLoading,
  missingCredentials,
  isAuthorized,
  userEmail,
  error,
  showSetupInstructions,
  switchToApiKeyOnlyMode
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
  
  if (error && !isAuthorized && error.includes('idpiframe_initialization_failed') || 
     (error && !isAuthorized && error.includes('origin'))) {
    return (
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
          <div>
            <div className="font-medium">Client ID Error</div>
            <div className="text-xs text-grey-500">
              Your OAuth client ID is not configured for this domain
            </div>
          </div>
        </div>
        {switchToApiKeyOnlyMode && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={switchToApiKeyOnlyMode}
            className="text-xs mt-1 w-full"
          >
            Use API Key Only (Recommended)
          </Button>
        )}
      </div>
    );
  }
  
  if (isAuthorized) {
    const isOAuthMode = localStorage.getItem('google_client_id') && localStorage.getItem('google_client_id') !== '';
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    return (
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
          <div>
            <div className="font-medium">Connected</div>
            <div className="text-xs text-grey-500">
              {isOAuthMode 
                ? (userEmail ? `Signed in as ${userEmail}` : "Using OAuth authentication") 
                : "Using API key only (limited access)"}
            </div>
            {!isOAuthMode && (
              <div className="text-xs text-amber-500 mt-1">
                Note: Read-only mode active. Adding candidates unavailable in API key only mode.
              </div>
            )}
          </div>
        </div>
        
        {!spreadsheetId && (
          <div className="flex items-center text-xs text-amber-500 mt-1 p-2 bg-amber-50 rounded-md">
            <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>Spreadsheet ID missing. Add it in API credentials below.</span>
          </div>
        )}
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
