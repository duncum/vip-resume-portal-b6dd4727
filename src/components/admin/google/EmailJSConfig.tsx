
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const EmailJSConfig: React.FC = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [credentials, setCredentials] = useState({
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
    
    // Store credentials in localStorage
    if (credentials.serviceId) {
      localStorage.setItem('emailjs_service_id', credentials.serviceId);
    } else {
      localStorage.removeItem('emailjs_service_id');
    }
    
    if (credentials.templateId) {
      localStorage.setItem('emailjs_template_id', credentials.templateId);
    } else {
      localStorage.removeItem('emailjs_template_id');
    }
    
    if (credentials.userId) {
      localStorage.setItem('emailjs_user_id', credentials.userId);
    } else {
      localStorage.removeItem('emailjs_user_id');
    }
    
    toast.success('Backup email system configured successfully');
    setConfigOpen(false);
  };
  
  const isConfigured = Boolean(
    localStorage.getItem('emailjs_service_id') && 
    localStorage.getItem('emailjs_template_id') && 
    localStorage.getItem('emailjs_user_id')
  );
  
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-medium text-gray-900">Backup Email System</h3>
        <Button
          size="sm"
          variant={isConfigured ? "outline" : "secondary"}
          onClick={() => setConfigOpen(!configOpen)}
          className={`text-xs h-6 ${isConfigured ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : ''}`}
        >
          {isConfigured ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              EmailJS Ready
            </>
          ) : (
            <>
              <AlertCircle className="h-3 w-3 mr-1" />
              Setup Backup
            </>
          )}
        </Button>
      </div>
      
      {configOpen && (
        <form onSubmit={handleSubmit} className="mt-3 space-y-3 p-3 border border-gray-200 rounded-md bg-gray-50">
          <div className="text-xs text-gray-600 mb-2">
            Configure EmailJS as a fallback system for when Google Workspace isn't available.
            This ensures email delivery even if Google services are interrupted.
            <a 
              href="https://www.emailjs.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-1"
            >
              Sign up for EmailJS (free tier available)
            </a>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="serviceId" className="text-xs">
              Service ID
            </Label>
            <Input
              id="serviceId"
              value={credentials.serviceId}
              onChange={(e) => setCredentials({ ...credentials, serviceId: e.target.value })}
              className="h-7 text-xs"
              placeholder="e.g., service_xxxxxxx"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="templateId" className="text-xs">
              Template ID
            </Label>
            <Input
              id="templateId"
              value={credentials.templateId}
              onChange={(e) => setCredentials({ ...credentials, templateId: e.target.value })}
              className="h-7 text-xs"
              placeholder="e.g., template_xxxxxxx"
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="userId" className="text-xs">
              User ID (Public Key)
            </Label>
            <Input
              id="userId"
              value={credentials.userId}
              onChange={(e) => setCredentials({ ...credentials, userId: e.target.value })}
              className="h-7 text-xs"
              placeholder="e.g., user_xxxxxxxxxx"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              type="submit" 
              size="sm" 
              className="text-xs"
            >
              Save Config
            </Button>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              className="text-xs"
              onClick={() => setConfigOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailJSConfig;
