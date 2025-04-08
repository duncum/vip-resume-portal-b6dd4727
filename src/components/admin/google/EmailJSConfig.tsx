
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, AlertCircle, ExternalLink, Info } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { testEmailJSConfig } from '@/utils/resume/email/fallback';

const EmailJSConfig: React.FC = () => {
  const [configOpen, setConfigOpen] = useState(false);
  const [setupInstructionsOpen, setSetupInstructionsOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
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
          <div className="flex items-start mb-3">
            <AlertCircle className="h-3 w-3 text-amber-500 mr-1 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Gmail API requires additional scopes for sending emails. Configure EmailJS as a reliable alternative.
            </p>
          </div>
          
          <Collapsible 
            open={setupInstructionsOpen} 
            onOpenChange={setSetupInstructionsOpen}
            className="border border-gray-200 rounded bg-white mb-2"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center justify-between w-full h-8 text-xs px-2 py-1"
              >
                <span className="flex items-center">
                  <Info className="h-3 w-3 mr-1 text-blue-500" />
                  <span>EmailJS Setup Instructions</span>
                </span>
                <span className="text-xs text-blue-500">
                  {setupInstructionsOpen ? 'Hide' : 'Show'}
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-2 text-xs space-y-2 bg-blue-50">
              <p className="font-medium">Step-by-Step Setup:</p>
              <ol className="list-decimal ml-4 space-y-1.5">
                <li>
                  <a 
                    href="https://dashboard.emailjs.com/sign-up" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Sign up for EmailJS <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://dashboard.emailjs.com/admin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Go to EmailJS Dashboard <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </li>
                <li>Click "Add New Service" and connect your email provider</li>
                <li>
                  <a 
                    href="https://dashboard.emailjs.com/admin/templates" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Create a new template <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </li>
                <li className="font-semibold">Important: Your template MUST include these exact variables:</li>
                <li className="ml-2 font-mono bg-white p-1 rounded border border-gray-200">
                  {"\{\{to_email\}\}"} - Recipient email address
                </li>
                <li className="ml-2 font-mono bg-white p-1 rounded border border-gray-200">
                  {"\{\{subject\}\}"} - Email subject line
                </li>
                <li className="ml-2 font-mono bg-white p-1 rounded border border-gray-200">
                  {"\{\{message_html\}\}"} - Main email content
                </li>
                <li className="ml-2 font-mono bg-white p-1 rounded border border-gray-200">
                  {"\{\{resume_url\}\}"} - Link to resume
                </li>
                <li>
                  <a 
                    href="https://dashboard.emailjs.com/admin/account" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Get your User ID (Public Key) <ExternalLink className="h-2.5 w-2.5 ml-0.5" />
                  </a>
                </li>
                <li>Enter all three values below and save</li>
                <li>Use the "Test Connection" button to verify your setup</li>
              </ol>
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md mt-2">
                <p className="font-medium mb-1">Template Example:</p>
                <pre className="bg-white p-2 rounded border border-gray-200 text-xs overflow-auto">
                  {`To: {{to_email}}
Subject: {{subject}}

<div>
  <p>Hello,</p>
  <p>{{message_html}}</p>
  <p>View resume: <a href="{{resume_url}}">{{resume_url}}</a></p>
</div>`}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
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
            
            {isConfigured && (
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                className="text-xs"
                onClick={handleTestConnection}
                disabled={isTestingConnection}
              >
                {isTestingConnection ? "Testing..." : "Test Connection"}
              </Button>
            )}
            
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              className="text-xs ml-auto"
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
