
import React from 'react';
import { Mail } from 'lucide-react';
import { useEmailJSConfig } from './useEmailJSConfig';
import EmailJSStatus from './EmailJSStatus';
import EmailJSForm from './EmailJSForm';

const EmailJSConfig: React.FC = () => {
  const {
    configOpen,
    setConfigOpen,
    isTestingConnection,
    credentials,
    setCredentials,
    handleSubmit,
    handleTestConnection,
    isConfigured
  } = useEmailJSConfig();

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-medium text-gray-900">Backup Email System</h3>
        <EmailJSStatus 
          isConfigured={isConfigured}
          onClick={() => setConfigOpen(!configOpen)}
        />
      </div>
      
      {configOpen && (
        <EmailJSForm
          credentials={credentials}
          setCredentials={setCredentials}
          onSubmit={handleSubmit}
          onTestConnection={handleTestConnection}
          isConfigured={isConfigured}
          isTestingConnection={isTestingConnection}
          onClose={() => setConfigOpen(false)}
        />
      )}
    </div>
  );
};

export default EmailJSConfig;
