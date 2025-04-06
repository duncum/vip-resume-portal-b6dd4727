
// Type definitions for Google connection hook

export interface ConnectionStatus {
  isInitialized: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  userEmail: string | null;
  error: string | null;
}

export interface ConnectionOperations {
  checkStatus: () => Promise<void>;
  handleSignIn: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  autoConnect: () => Promise<void>;
}

export interface MissingCredentialsType {
  clientId: boolean;
  apiKey: boolean;
}
