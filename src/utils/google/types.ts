
// Type definitions for the Google Auth module

// Define the authentication state
export interface GoogleAuthState {
  isGapiLoaded: boolean;
  isGapiInitialized: boolean;
  isAuthorized: boolean;
}

// Configuration options
export interface GoogleApiConfig {
  clientId: string;
  apiKey: string;
  discoveryDocs: string[];
  scope: string;
}
