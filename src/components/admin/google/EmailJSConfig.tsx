
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
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
            <div className="flex items-start mb-2">
              <AlertCircle className="h-3 w-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
              <p>Gmail API requires additional scopes for sending emails. Configure EmailJS as a reliable alternative.</p>
            </div>
            <ol className="list-decimal ml-4 space-y-1">
              <li>
                <a 
                  href="https://www.emailjs.com/docs/tutorial/creating-email-template/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  Create an EmailJS template <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                </a>
              </li>
              <li>Use <code className="bg-gray-100 px-1">{"{{to_email}}"}</code>, <code className="bg-gray-100 px-1">{"{{subject}}"}</code>, and <code className="bg-gray-100 px-1">{"{{message_html}}"}</code> variables in your template</li>
              <li>Enter your credentials below</li>
            </ol>
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
