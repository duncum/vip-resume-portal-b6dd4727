
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Agreement: React.FC = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgree = () => {
    localStorage.setItem('network-agreement', 'true');
    navigate('/candidates');
  };

  return (
    <div className="min-h-screen bg-network-neutral-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <img 
          src="/lovable-uploads/bdef0e91-165e-4873-bab5-290d945036b4.png" 
          alt="Network Logo" 
          className="mx-auto h-16 mb-8"
        />
        
        <h1 className="text-4xl font-display text-network-gold">Confidentiality Agreement</h1>
        
        <div className="bg-network-neutral-gray-800 p-6 rounded-lg border border-network-gold/20">
          <p className="text-network-neutral-gray-300 mb-4">
            By accessing our exclusive talent network, you agree to maintain the strictest confidentiality. 
            The information herein is privileged and intended solely for authorized personnel.
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <input 
              type="checkbox" 
              id="agree-checkbox"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              className="form-checkbox text-network-gold focus:ring-network-gold"
            />
            <label 
              htmlFor="agree-checkbox" 
              className="text-network-neutral-gray-300"
            >
              I agree to the confidentiality terms
            </label>
          </div>
          
          <Button 
            onClick={handleAgree}
            disabled={!isAgreed}
            className="w-full bg-network-gold text-black hover:bg-network-gold-dark"
          >
            Enter Network
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
