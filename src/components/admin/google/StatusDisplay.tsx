
import React from 'react';
import { CheckCircle, XCircle, Loader2, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type StatusDisplayProps = {
  isLoading: boolean;
  missingCredentials: {
    clientId: boolean;
    apiKey: boolean;
  };
  isAuthorized: boolean;
  userEmail: string | null;
  error: string | null;
  showSetupInstructions: () => void;
  switchToApiKeyOnlyMode: () => void;
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
  const anyCredentialsMissing = missingCredentials.apiKey || missingCredentials.clientId;
  const clientIdPresent = !missingCredentials.clientId;
  
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-xs text-slate-600">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Checking connection status...</span>
      </div>
    );
  }
  
  if (anyCredentialsMissing) {
    return (
      <div className="text-xs">
        <div className="flex items-center space-x-2 text-amber-600">
          <AlertTriangle className="h-3 w-3" />
          <span className="font-medium">Credentials Required</span>
        </div>
        <p className="mt-1 text-slate-600 text-xs">
          API Key {missingCredentials.apiKey ? 
            <Badge variant="outline" className="text-[10px] h-4 bg-red-50 border-red-200 text-red-600">Missing</Badge> : 
            <Badge variant="outline" className="text-[10px] h-4 bg-green-50 border-green-200 text-green-600">Set</Badge>}
          {" · "}
          Client ID {missingCredentials.clientId ? 
            <Badge variant="outline" className="text-[10px] h-4 bg-amber-50 border-amber-200 text-amber-600">Optional</Badge> : 
            <Badge variant="outline" className="text-[10px] h-4 bg-green-50 border-green-200 text-green-600">Set</Badge>}
        </p>
        <div className="mt-2 text-[10px] space-y-1">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-[10px] h-6 w-full"
            onClick={showSetupInstructions}
          >
            <Info className="h-3 w-3 mr-1" />
            Setup Instructions
          </Button>
          {!clientIdPresent && (
            <Button 
              size="sm" 
              variant="outline" 
              className="text-[10px] h-6 w-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              onClick={switchToApiKeyOnlyMode}
            >
              <Info className="h-3 w-3 mr-1" />
              Use API Key Only
            </Button>
          )}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-xs">
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="h-3 w-3" />
          <span className="font-medium">Connection Error</span>
        </div>
        <p className="mt-1 text-slate-600 text-xs">{error}</p>
      </div>
    );
  }
  
  if (isAuthorized) {
    return (
      <div className="text-xs">
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-3 w-3" />
          <span className="font-medium">Connected</span>
        </div>
        {userEmail ? (
          <p className="mt-1 text-slate-600 text-xs">Signed in as <span className="font-medium">{userEmail}</span></p>
        ) : (
          <p className="mt-1 text-slate-600 text-xs">
            {clientIdPresent ? 'Connected with full access' : 'Connected with read-only access'}
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className="text-xs">
      <div className="flex items-center space-x-2 text-slate-600">
        <XCircle className="h-3 w-3" />
        <span className="font-medium">Not Connected</span>
      </div>
      <p className="mt-1 text-slate-600 text-xs">
        Sign in to access Google Sheets data
      </p>
    </div>
  );
};

export default StatusDisplay;
