
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { sendResumeEmail } from "@/utils/resume/simpleEmailShare";
import { Switch } from "@/components/ui/switch";

interface SimpleEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateId: string;
  resumeUrl: string;
}

const SimpleEmailDialog = ({ 
  open, 
  onOpenChange,
  candidateId,
  resumeUrl
}: SimpleEmailDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await sendResumeEmail({
        recipientEmail: email,
        candidateId,
        resumeUrl,
        useConfidential: isConfidential
      });
      
      if (success) {
        onOpenChange(false);
        setEmail("");
        setIsConfidential(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Resume</DialogTitle>
          <DialogDescription>
            Enter your email address to receive this candidate's resume.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="confidential"
              checked={isConfidential}
              onCheckedChange={setIsConfidential}
              disabled={isLoading}
            />
            <Label htmlFor="confidential">Mark as confidential</Label>
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="bg-gold text-black hover:bg-gold/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Resume
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleEmailDialog;
