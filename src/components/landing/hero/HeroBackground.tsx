
import React from 'react';

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0"></div>
      
      {/* Premium abstract patterns */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(171, 135, 85, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(171, 135, 85, 0.15) 0%, transparent 50%)"
        }}
      ></div>
      
      {/* City skyline image with darkened overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/617e974e-d557-4cd2-941e-f4979985f635.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      {/* Animated luxury particle field */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 70 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
              transition: 'transform 0.8s ease-out',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Premium geometric grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full grid grid-cols-6 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-gold/20 h-full"></div>
          ))}
        </div>
        <div className="h-full w-full grid grid-rows-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-t border-gold/20 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.15)_0%,transparent_70%)] animate-pulse-slow"></div>
      
      {/* Premium geometric accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
      
      {/* Luxury corner decorative elements */}
      <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-gold/30 opacity-60 hidden md:block"></div>
      <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-gold/30 opacity-60 hidden md:block"></div>
      <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-gold/30 opacity-20 hidden md:block"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-gold/30 opacity-20 hidden md:block"></div>
    </div>
  );
};

export default HeroBackground;
