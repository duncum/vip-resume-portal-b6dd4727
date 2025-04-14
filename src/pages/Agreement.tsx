
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ContractAgreement } from "@/components/auth/ContractAgreement";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Agreement = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    localStorage.setItem("contract-agreed", "true");
    navigate("/candidates");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Confidentiality Agreement</h1>
          
          <div className="bg-grey-900/50 backdrop-blur-sm border border-grey-800/50 rounded-lg p-6 mb-8">
            <ContractAgreement />
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreed} 
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label 
                htmlFor="terms" 
                className="text-sm text-grey-300 cursor-pointer"
              >
                I agree to the confidentiality terms and conditions
              </label>
            </div>
            
            <Button 
              onClick={handleAgree} 
              disabled={!agreed}
              className="w-full max-w-md bg-gold hover:bg-gold/90 text-black"
            >
              Continue to Candidates
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agreement;
