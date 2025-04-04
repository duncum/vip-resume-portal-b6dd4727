
import { useState, useEffect } from 'react';
import { initGoogleApi, isUserAuthorized, signInToGoogle, signOutFromGoogle, getCurrentUserEmail } from '@/utils/googleAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Google, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const GoogleIntegrationStatus = () => {
  const [status, setStatus] = useState({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true,
    userEmail: null as string | null
  });

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      await initGoogleApi();
      const authorized = await isUserAuthorized();
      const email = authorized ? getCurrentUserEmail() : null;
      
      setStatus({
        isInitialized: true,
        isAuthorized: authorized,
        isLoading: false,
        userEmail: email
      });
    } catch (error) {
      console.error('Error checking Google API status:', error);
      setStatus({
        isInitialized: false,
        isAuthorized: false,
        isLoading: false,
        userEmail: null
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleSignIn = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      const success = await signInToGoogle();
      if (success) {
        checkStatus();
      } else {
        setStatus(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignOut = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    try {
      await signOutFromGoogle();
      checkStatus();
    } catch (error) {
      console.error('Error signing out:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Google className="h-4 w-4 mr-2" />
          Google Integration
        </CardTitle>
        <CardDescription className="text-xs">
          Required for sheet access and resume storage
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        {status.isLoading ? (
          <div className="flex items-center justify-center p-2">
            <RefreshCw className="h-4 w-4 animate-spin text-grey-400" />
            <span className="ml-2 text-sm text-grey-400">Checking status...</span>
          </div>
        ) : status.isAuthorized ? (
          <div className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <div>
              <div className="font-medium">Connected</div>
              {status.userEmail && (
                <div className="text-xs text-grey-500">{status.userEmail}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm">
            <XCircle className="h-4 w-4 mr-2 text-amber-500" />
            <div>
              <div className="font-medium">Not connected</div>
              <div className="text-xs text-grey-500">Google connection required</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {status.isAuthorized ? (
          <Button size="sm" variant="outline" onClick={handleSignOut} className="w-full text-xs">
            Disconnect
          </Button>
        ) : (
          <Button size="sm" onClick={handleSignIn} className="w-full text-xs bg-white border-grey-200 text-grey-800 hover:bg-grey-100">
            <Google className="h-3 w-3 mr-2" />
            Connect Google Account
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GoogleIntegrationStatus;
