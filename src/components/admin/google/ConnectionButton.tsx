
import React from 'react';
import { Button } from '@/components/ui/button';
import GoogleIcon from './GoogleIcon';

type ConnectionButtonProps = {
  missingCredentials: {
    clientId: boolean;
    apiKey: boolean;
  };
  isAuthorized: boolean;
  onShowCredentials: () => void;
  onSignOut: () => void;
  onSignIn: () => void;
};

const ConnectionButton: React.FC<ConnectionButtonProps> = ({
  missingCredentials,
  isAuthorized,
  onShowCredentials,
  onSignOut,
  onSignIn
}) => {
  if (missingCredentials.clientId || missingCredentials.apiKey) {
    return (
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onShowCredentials}
        className="w-full text-xs"
      >
        Enter API Credentials
      </Button>
    );
  }
  
  if (isAuthorized) {
    return (
      <Button size="sm" variant="outline" onClick={onSignOut} className="w-full text-xs">
        Disconnect
      </Button>
    );
  }
  
  return (
    <Button size="sm" onClick={onSignIn} className="w-full text-xs bg-white border-grey-200 text-grey-800 hover:bg-grey-100">
      <GoogleIcon className="h-3 w-3 mr-2" />
      Connect Google Account
    </Button>
  );
};

export default ConnectionButton;
