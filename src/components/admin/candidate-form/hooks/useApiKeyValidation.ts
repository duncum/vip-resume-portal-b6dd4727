
import { useState, useEffect } from 'react';

export const useApiKeyValidation = () => {
  const [isApiKeyOnly, setIsApiKeyOnly] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if we're in API key only mode
    const clientId = localStorage.getItem('google_client_id');
    const apiKey = localStorage.getItem('google_api_key');
    
    setIsApiKeyOnly((apiKey && apiKey !== '') && (!clientId || clientId === ''));
  }, []);

  return { isApiKeyOnly };
};
