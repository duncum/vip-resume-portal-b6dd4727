
import React from 'react';

interface HeroHeadlineProps {
  hasLoaded: boolean;
  isVisible: boolean;
}

const HeroHeadline: React.FC<HeroHeadlineProps> = ({ hasLoaded, isVisible }) => {
  return (
    <>
      {/* Premium category indicator with staggered reveal */}
      <div 
        className={`overflow-hidden mb-6 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: "0.6s", 
          animationFillMode: "forwards"
        }}
      >
        <p className="text-gold/80 text-sm md:text-base tracking-widest uppercase font-light">
          Business Matchmaker
        </p>
      </div>
      
      {/* Dynamic headline with sequential animation */}
      <div className="relative mb-10 md:mb-14">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
          <div className="overflow-hidden">
            <span 
              className={`block transform translate-y-full ${hasLoaded ? 'animate-slide-up' : ''}`}
              style={{ 
                animationDelay: "0.8s", 
                animationFillMode: "forwards", 
                animationDuration: "1.2s" 
              }}
            >
              Discreet access to
            </span>
          </div>
          <div className="overflow-hidden mt-3">
            <span 
              className={`block transform translate-y-full ${hasLoaded ? 'animate-slide-up' : ''}`}
              style={{ 
                animationDelay: "1.0s", 
                animationFillMode: "forwards", 
                animationDuration: "1.2s" 
              }}
            >
              <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent relative">
                stealth mode talent
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-gold-dark/30 to-gold/70"></span>
              </span>
            </span>
          </div>
          <div className="overflow-hidden mt-3">
            <span 
              className={`block transform translate-y-full ${hasLoaded ? 'animate-slide-up' : ''}`}
              style={{ 
                animationDelay: "1.2s", 
                animationFillMode: "forwards", 
                animationDuration: "1.2s" 
              }}
            >
              without the fees
            </span>
          </div>
        </h1>
        
        {/* Animated accent line */}
        <div 
          className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          style={{
            transition: "width 1.5s ease-out 1.4s", 
            width: isVisible ? "250px" : "0px"
          }}
        ></div>
      </div>
    </>
  );
};

export default HeroHeadline;
