
import React from 'react';
import { CheckCircle, XCircle, RefreshCw, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      <div className="flex items-center justify-center p-1">
        <RefreshCw className="h-3 w-3 animate-spin text-grey-400" />
        <span className="ml-2 text-xs text-grey-400">Checking status...</span>
      </div>
    );
  }
  
  if (missingCredentials.apiKey) {
    return (
      <div className="flex items-center text-xs">
        <XCircle className="h-3 w-3 mr-2 text-amber-500 flex-shrink-0" />
        <div>
          <div className="font-medium">Setup required</div>
          <div className="text-xs text-grey-500">
            API Key required
          </div>
        </div>
        <Info 
          className="h-3 w-3 ml-2 text-amber-500 cursor-pointer" 
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
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-3 w-3 mr-2" />
          <AlertDescription className="text-xs">
            <div className="font-medium">OAuth Configuration Error</div>
            <div>Your Client ID is not authorized for this domain: {window.location.origin}</div>
          </AlertDescription>
        </Alert>
        
        {switchToApiKeyOnlyMode && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={switchToApiKeyOnlyMode}
            className="text-[10px] mt-1 py-0 h-6 w-full"
          >
            Switch to API Key Only Mode
          </Button>
        )}
      </div>
    );
  }
  
  if (isAuthorized) {
    const isOAuthMode = localStorage.getItem('google_client_id') && localStorage.getItem('google_client_id') !== '';
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
    
    return (
      <div className="space-y-1">
        <div className="flex items-center text-xs">
          <CheckCircle className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
          <div>
            <div className="font-medium">
              {isOAuthMode 
                ? (userEmail ? `Connected as ${userEmail?.split('@')[0]}` : "OAuth connected") 
                : "API Key connected"}
            </div>
            
            {!isOAuthMode && (
              <div className="text-[10px] text-amber-500 font-medium">
                Read-only mode (API key only)
              </div>
            )}
          </div>
        </div>
        
        {!spreadsheetId && (
          <div className="flex items-center text-[10px] text-amber-500 p-1 bg-amber-50 rounded-md">
            <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>Add Spreadsheet ID in API settings</span>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-xs">
      <XCircle className="h-3 w-3 mr-1 text-amber-500 flex-shrink-0" />
      <div>
        <div className="font-medium">Not connected</div>
        <div className="text-[10px] text-grey-500">API connection required</div>
      </div>
    </div>
  );
};

export default StatusDisplay;
