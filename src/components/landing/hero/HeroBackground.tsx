
import React from 'react';

interface HeroBackgroundProps {
  mousePosition: { x: number; y: number };
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sophisticated dark background */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Abstract executive network visualization */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full grid grid-cols-12 md:grid-cols-24">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-gold/10 h-full"></div>
          ))}
        </div>
        <div className="h-full w-full grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-gold/10 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Dynamic connection nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)`,
              transition: 'transform 1.2s ease-out',
              animation: `float ${Math.random() * 20 + 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(171,135,85,0.1)" />
            <stop offset="50%" stopColor="rgba(171,135,85,0.5)" />
            <stop offset="100%" stopColor="rgba(171,135,85,0.1)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          return (
            <line 
              key={i} 
              x1={`${x1}%`} 
              y1={`${y1}%`} 
              x2={`${x2}%`} 
              y2={`${y2}%`} 
              stroke="url(#lineGradient)" 
              strokeWidth="1" 
              style={{ 
                animation: `pulse ${Math.random() * 5 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          );
        })}
      </svg>
      
      {/* Premium radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.08)_0%,transparent_60%)]"></div>
      
      {/* Elegant border accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
    </div>
  );
};

export default HeroBackground;
