
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContractAgreement from "@/components/auth/ContractAgreement";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Agreement = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has already agreed to the contract
    const hasAgreed = localStorage.getItem("contract-agreed") === "true";
    
    // If already agreed, redirect to candidates page
    if (hasAgreed) {
      navigate("/candidates");
    }
    
    // Apply styling for this page
    document.body.classList.add('bg-black');
    
    return () => {
      document.body.classList.remove('bg-black');
    };
  }, [navigate]);
  
  const handleAgreement = () => {
    // Set agreement in localStorage
    localStorage.setItem("contract-agreed", "true");
    
    // Redirect to candidates page
    navigate("/candidates");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow container mx-auto py-24 px-4 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-8 text-center">
            Confidentiality <span className="text-gold">Agreement</span>
          </h1>
          
          <div className="bg-black/60 border border-gold/20 p-6 md:p-8 rounded-lg shadow-lg">
            <ContractAgreement onAgreementComplete={handleAgreement} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Agreement;
