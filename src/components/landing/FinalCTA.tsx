
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-t from-black to-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to connect with exceptional executives?</h2>
        <p className="text-xl text-grey-300 max-w-2xl mx-auto mb-10">Gain access to our exclusive network of top-tier executives who are selectively open to the right opportunities.</p>
        
        <Button 
          className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-lg px-10 py-6 h-auto shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300" 
          asChild
        >
          <Link to="/agreement">
            Access Executive Network <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
