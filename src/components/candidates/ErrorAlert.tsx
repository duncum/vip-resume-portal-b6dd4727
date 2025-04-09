
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  actionLink?: string;
  actionLabel?: string;
}

const ErrorAlert = ({ message, actionLink, actionLabel }: ErrorAlertProps) => {
  if (!message) return null;
  
  return (
    <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-800">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex justify-between items-center">
        <span>{message}</span>
        {actionLink && actionLabel && (
          <a 
            href={actionLink} 
            className="text-xs bg-red-800 px-3 py-1 rounded hover:bg-red-700 transition-colors"
          >
            {actionLabel}
          </a>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
