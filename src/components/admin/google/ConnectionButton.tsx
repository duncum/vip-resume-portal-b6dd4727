
import React from 'react';
import { Button } from '@/components/ui/button';
import GoogleIcon from './GoogleIcon';
import { Loader2, Key } from 'lucide-react';

type ConnectionButtonProps = {
  missingCredentials: {
    clientId: boolean;
    apiKey: boolean;
  };
  isAuthorized: boolean;
  isLoading: boolean;
  onShowCredentials: () => void;
  onSignOut: () => void;
  onSignIn: () => void;
};

const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  missingCredentials,
  isAuthorized,
  isLoading,
  onShowCredentials,
  onSignOut,
  onSignIn
}) => {
  if (missingCredentials.apiKey) {
    return (
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onShowCredentials}
        className="text-xs px-2 py-1 h-7 whitespace-nowrap text-gray-900 bg-white hover:bg-gray-100"
      >
        API Settings
      </Button>
    );
  }
  
  // Check if we're in API key only mode (no client ID)
  const isApiKeyOnly = missingCredentials.clientId;
  
  if (isAuthorized) {
    return (
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onSignOut} 
        disabled={isLoading}
        className="text-xs px-2 py-1 h-7 whitespace-nowrap text-green-700 bg-green-50 hover:bg-green-100 border-green-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Working...
          </>
        ) : (
          <>
            {isApiKeyOnly && <Key className="h-3 w-3 mr-1" />}
            {isApiKeyOnly ? "API Connected" : "Connected"}
          </>
        )}
      </Button>
    );
  }
  
  return (
    <Button 
      size="sm" 
      onClick={onSignIn} 
      disabled={isLoading}
      className="text-xs px-2 py-1 h-7 bg-white border border-gray-200 text-gray-800 hover:bg-gray-100 whitespace-nowrap"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <GoogleIcon className="h-3 w-3 mr-1" />
          Connect Workspace
        </>
      )}
    </Button>
  );
};

export default ConnectionButton;
