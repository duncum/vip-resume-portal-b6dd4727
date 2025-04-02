
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
      <div className="relative inline-block">
        <div className="text-gold font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
          EXECUTIVE CONNECT
        </div>
        <div className="mt-2 text-white/70 text-sm tracking-widest uppercase">ELITE BUSINESS MATCHMAKING</div>
        <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroLogo;
