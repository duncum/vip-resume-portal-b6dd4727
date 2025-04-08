
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { testEmailJSConfig } from '@/utils/resume/email/fallback';

export interface EmailJSCredentials {
  serviceId: string;
  templateId: string;
  userId: string;
}

export const useEmailJSConfig = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [credentials, setCredentials] = useState<EmailJSCredentials>({
    serviceId: '',
    templateId: '',
    userId: '',
  });
  
  // Load existing credentials if available
  useEffect(() => {
    const savedServiceId = localStorage.getItem('emailjs_service_id');
    const savedTemplateId = localStorage.getItem('emailjs_template_id');
    const savedUserId = localStorage.getItem('emailjs_user_id');
    
    if (savedServiceId || savedTemplateId || savedUserId) {
      setCredentials({
        serviceId: savedServiceId || '',
        templateId: savedTemplateId || '',
        userId: savedUserId || '',
      });
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input fields
    if (!credentials.serviceId || !credentials.templateId || !credentials.userId) {
      toast.error("All fields are required");
      return;
    }
    
    // Store credentials in localStorage
    localStorage.setItem('emailjs_service_id', credentials.serviceId);
    localStorage.setItem('emailjs_template_id', credentials.templateId);
    localStorage.setItem('emailjs_user_id', credentials.userId);
    
    toast.success('Backup email system configured successfully');
    setConfigOpen(false);
  };
  
  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      await testEmailJSConfig();
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  const isConfigured = Boolean(
    localStorage.getItem('emailjs_service_id') && 
    localStorage.getItem('emailjs_template_id') && 
    localStorage.getItem('emailjs_user_id')
  );
  
  return {
    configOpen,
    setConfigOpen,
    isTestingConnection,
    credentials,
    setCredentials,
    handleSubmit,
    handleTestConnection,
    isConfigured
  };
};
