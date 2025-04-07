
// Google API initialization functionality - modular version

// Force API key only mode permanently
localStorage.setItem('force_api_key_only', 'true');

// Re-export everything from the modular files
export { 
  loadApiIfNeeded 
} from './loader';

export { 
  initializeWithTimeout 
} from './timeout';

export { 
  getIsGapiInitialized, 
  setGapiInitialized,
  isApiKeyOnlyMode,
  setApiKeyOnlyMode
} from './state';
