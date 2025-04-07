
import React from 'react';
import { Button } from '@/components/ui/button';
import GoogleIcon from './GoogleIcon';

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
        className="text-xs px-2 py-1 h-7 whitespace-nowrap"
      >
        API Settings
      </Button>
    );
  }
  
  if (isAuthorized) {
    return (
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onSignOut} 
        disabled={isLoading}
        className="text-xs px-2 py-1 h-7 whitespace-nowrap"
      >
        {isLoading ? (
          <>
            <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            Disconnecting...
          </>
        ) : (
          "Disconnect"
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
          <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          Connecting...
        </>
      ) : (
        <>
          <GoogleIcon className="h-3 w-3 mr-1" />
          Connect API
        </>
      )}
    </Button>
  );
};

export default ConnectionButton;
