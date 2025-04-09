
import ContractAgreement from "@/components/auth/ContractAgreement";
import { Link } from "react-router-dom";

const Agreement = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="w-full bg-black/90 py-3 md:py-4 border-b border-gold/20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-block">
            <img 
              src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
              alt="VIP Employers Logo" 
              className="h-10 md:h-12"
            />
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <ContractAgreement />
      </div>
    </div>
  );
};

export default Agreement;
