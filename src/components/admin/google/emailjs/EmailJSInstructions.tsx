
import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

interface EmailJSInstructionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailJSInstructions: React.FC<EmailJSInstructionsProps> = ({ 
  open, 
  onOpenChange 
}) => {
  return (
    <Collapsible 
      open={open} 
      onOpenChange={onOpenChange}
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
            {open ? 'Hide' : 'Show'}
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
  );
};

export default EmailJSInstructions;
