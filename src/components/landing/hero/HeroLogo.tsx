
import React from 'react';

interface HeroLogoProps {
  mousePosition: { x: number; y: number };
  hasLoaded: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ mousePosition, hasLoaded }) => {
  return (
    <div 
      className={`mb-6 md:mb-10 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
      style={{ 
        animationDelay: "0.3s", 
        animationFillMode: "forwards",
        transform: `translateY(${mousePosition.y * -10}px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * -3}deg)`,
        transition: 'transform 0.6s ease-out'
      }}
    >
      <img 
        src="/lovable-uploads/4b7a27c9-c295-4477-b5b4-b063392d75fe.png" 
        alt="CRE Confidential" 
        className="h-auto max-w-full mx-auto w-64 md:w-80 lg:w-96"
      />
      
      {/* Enhanced glow effect behind logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -mt-20 rounded-full bg-gold/10 blur-3xl w-80 h-40 opacity-70"></div>
    </div>
  );
};

export default HeroLogo;
