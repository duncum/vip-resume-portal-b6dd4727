
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Agreement = () => {
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your full name to proceed");
      return;
    }
    
    if (!agreed) {
      toast.error("You must agree to the terms to continue");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, we'd send this to a server
    // For now, just store in localStorage and proceed
    localStorage.setItem("agreement-accepted", "true");
    localStorage.setItem("user-name", name);
    localStorage.setItem("agreement-timestamp", new Date().toISOString());
    
    toast.success("Thank you for accepting the agreement");
    
    // Navigate to candidates page
    setTimeout(() => {
      navigate("/candidates");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Confidentiality Agreement</h1>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-6 mb-8">
            <div className="space-y-6 text-gray-300">
              <p className="leading-relaxed">
                The candidate profiles and resume information contained in this portal are strictly 
                confidential and proprietary. By accessing this portal, you agree to the following terms:
              </p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>You will not share access credentials with any unauthorized individuals.</li>
                <li>You will not distribute, copy, or reproduce any information found on this portal without explicit written permission.</li>
                <li>You will maintain the confidentiality of all candidate information presented to you.</li>
                <li>You acknowledge that all candidate information is provided for your exclusive consideration.</li>
                <li>Any unauthorized use of this information may result in legal action.</li>
              </ol>
              
              <form onSubmit={handleSubmit} className="pt-4 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                    Full Name <span className="text-amber-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full legal name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/50 border-amber-500/30 text-white placeholder:text-gray-500 focus-visible:ring-amber-500"
                    required
                  />
                  <p className="text-xs text-gray-400">
                    Your typed name will serve as your electronic signature.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreed} 
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <label 
                    htmlFor="terms" 
                    className="text-sm text-gray-300 cursor-pointer"
                  >
                    I agree to the confidentiality terms and conditions
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting || !agreed || !name.trim()}
                  className="w-full max-w-md bg-amber-500 hover:bg-amber-600 text-black mx-auto block"
                >
                  {isSubmitting ? "Processing..." : "Continue to Candidates"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agreement;
