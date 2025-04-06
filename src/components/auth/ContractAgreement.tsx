
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ContractAgreementProps {
  onAgreementComplete?: () => void;
}

const ContractAgreement = ({ onAgreementComplete }: ContractAgreementProps) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name to proceed");
      return;
    }
    
    setIsSubmitting(true);
    
    // Save agreement to local storage
    localStorage.setItem("contract-agreed", "true");
    localStorage.setItem("contract-agreed-name", name);
    localStorage.setItem("contract-agreed-date", new Date().toISOString());
    
    // Delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for agreeing to our terms");
      
      // Call the callback if provided
      if (onAgreementComplete) {
        onAgreementComplete();
      } else {
        navigate("/candidates");
      }
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl border border-gold/20 bg-black/80 backdrop-blur-sm text-white">
        <CardHeader className="space-y-1 text-center border-b border-gold/10 pb-6 mb-4">
          <CardTitle className="text-3xl font-display font-bold text-gold">Confidentiality Agreement</CardTitle>
          <p className="text-gray-400">
            Please read and accept the terms below to access the VIP Employer Portal.
          </p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 text-left">
            <div className="text-gray-300 space-y-6 mb-6">
              <p className="leading-relaxed">
                The candidate profiles and resume information contained in this portal are strictly confidential 
                and proprietary. By accessing this portal, you agree to the following terms:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>All candidate information is provided for your confidential review only.</li>
                <li>You will not share access to this portal or distribute any candidate information to unauthorized third parties.</li>
                <li>You will use the information solely for legitimate recruitment and hiring purposes.</li>
                <li>You agree to maintain the confidentiality of all candidate data shared through this platform.</li>
                <li>You will not contact candidates directly without prior authorization from our team.</li>
                <li>You acknowledge that unauthorized use of this information may result in termination of access privileges and potential legal action.</li>
              </ol>
              
              <p className="font-medium">
                This agreement is effective upon accessing the portal and remains in effect for all subsequent uses.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                Full Name <span className="text-gold">*</span>
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full legal name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-gold/30 text-white placeholder:text-gray-500 focus-visible:ring-gold"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit"
              className="w-full bg-gold hover:bg-gold-dark text-black font-semibold"
              disabled={isSubmitting}
            >
              I Agree to These Terms
            </Button>
            <p className="text-xs text-gray-500 text-center">
              By clicking "I Agree", you confirm that you have read, understood, and agree to the
              terms outlined above.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ContractAgreement;
