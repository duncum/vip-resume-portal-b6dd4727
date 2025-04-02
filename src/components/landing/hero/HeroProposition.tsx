
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeroPropositionProps {
  mousePosition: { x: number; y: number };
  hasLoaded: boolean;
}

const HeroProposition: React.FC<HeroPropositionProps> = ({ mousePosition, hasLoaded }) => {
  return (
    <>
      {/* Value proposition with executive focus */}
      <p 
        className={`text-grey-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-10 md:mb-14 leading-relaxed opacity-0 px-4 ${hasLoaded ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: "1.6s", 
          animationFillMode: "forwards"
        }}
      >
        Direct connections to <span className="text-white font-medium">exceptional executives</span> who aren't actively seeking, but are <span className="text-gold font-medium">privately receptive</span> to transformative opportunities.
      </p>
      
      {/* Confidentiality badge */}
      <div 
        className={`flex items-center justify-center gap-2 mb-10 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: "1.8s", 
          animationFillMode: "forwards"
        }}
      >
        <ShieldCheck className="text-gold h-5 w-5" />
        <span className="text-gold/90 text-sm tracking-wider font-light">99% ULTRA-CONFIDENTIAL NETWORK</span>
      </div>
      
      {/* Key value message with 3D hover effect */}
      <div 
        className={`relative max-w-3xl mx-auto mb-14 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: "2.0s", 
          animationFillMode: "forwards",
          transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -8}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * -2}deg)`,
          transition: 'transform 0.8s ease-out'
        }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/5 rounded-lg blur opacity-80"></div>
        <p className="relative text-gold/90 italic text-lg md:text-xl py-8 px-10 border-l-2 border-r-2 border-gold/30 bg-black/80 backdrop-blur-md">
          <span className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
          The real competitive advantage isn't about <span className="font-semibold not-italic">who's publicly available</span>—
          <span className="block mt-3 font-semibold not-italic">it's about <span className="text-white">who's privately open</span> if the right opportunity presents itself.</span>
          <span className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"></span>
        </p>
      </div>
    </>
  );
};

export default HeroProposition;
