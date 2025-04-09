
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { recordActivity } from "@/utils/sheets/api/trackActivity";

const ContractAgreement = () => {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name to proceed",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save agreement in localStorage
      localStorage.setItem("contract-agreed", "true");
      localStorage.setItem("contract-name", name);
      localStorage.setItem("contract-timestamp", new Date().toISOString());
      
      // Also record to Google Sheets
      await recordActivity('agreement', { name });
      
      // Show success toast
      toast({
        title: "Agreement Accepted",
        description: "Thank you for accepting the terms.",
      });
      
      // Redirect to main portal
      navigate("/candidates");
      setAgreed(true);
    } catch (error) {
      console.error("Error saving agreement:", error);
      toast({
        title: "Error",
        description: "There was an issue saving your agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl border border-gold/20 bg-black/80 backdrop-blur-sm text-white">
        <CardHeader className="space-y-1 text-center border-b border-gold/10 pb-6 mb-4">
          <CardTitle className="text-3xl font-display font-bold text-gold">Confidentiality Agreement</CardTitle>
          <p className="text-grey-400">
            Please read and accept the terms below to access the VIP Employer Portal.
          </p>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 text-left">
            <div className="text-grey-300 space-y-6 mb-6">
              <p className="leading-relaxed">
                The candidate profiles and resume information contained in this portal are strictly confidential 
                and proprietary. By accessing this portal, you agree to the following terms:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>You will not share access credentials with any unauthorized individuals.</li>
                <li>You will not distribute, copy, or reproduce any information found on this portal without explicit written permission.</li>
                <li>You will maintain the confidentiality of all candidate information presented to you.</li>
                <li>You acknowledge that all candidate information is provided for your exclusive consideration.</li>
                <li>Any unauthorized use of this information may result in legal action.</li>
              </ol>
              
              <p className="font-medium mt-4">
                Please type your full legal name below to indicate your agreement with these terms.
                Your typed name will serve as your electronic signature.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-grey-300">
                Full Name <span className="text-gold">*</span>
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full legal name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-gold/30 text-white placeholder:text-grey-500 focus-visible:ring-gold"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 mt-4 border-t border-gold/10 pt-6">
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-black font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "I Agree to These Terms"}
            </Button>
            <p className="text-xs text-grey-500 text-center">
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
