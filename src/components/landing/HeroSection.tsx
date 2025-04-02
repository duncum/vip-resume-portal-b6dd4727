
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for enhanced parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    setMousePosition({ x, y });
  };
  
  // Initialize animations with a staggered effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasLoaded(true);
    }, 300);
    
    // Add scroll listener to fade out scroll indicator
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.max(0, 1 - scrollPosition / 500);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center min-h-[100vh] px-4 py-16 md:py-20 overflow-hidden"
    >
      {/* Dynamic luxury background with depth */}
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
      </div>
      
      {/* Premium geometric accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
      
      {/* Luxury corner decorative elements */}
      <div className="absolute top-6 left-6 w-24 h-24 border-t-2 border-l-2 border-gold/30 opacity-60 hidden md:block"></div>
      <div className="absolute bottom-6 right-6 w-24 h-24 border-b-2 border-r-2 border-gold/30 opacity-60 hidden md:block"></div>
      <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-gold/30 opacity-20 hidden md:block"></div>
      <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-gold/30 opacity-20 hidden md:block"></div>
      
      <div className="container mx-auto text-center relative z-10 perspective-1000 mt-8">
        {/* New CRE Logo with enhanced reveal animation */}
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
        
        {/* Value proposition with executive focus */}
        <p 
          className={`text-grey-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-10 md:mb-14 leading-relaxed opacity-0 px-4 ${hasLoaded ? 'animate-fade-in' : ''}`}
          style={{ 
            animationDelay: "1.6s", 
            animationFillMode: "forwards"
          }}
        >
          Connect with <span className="text-white font-medium">exceptional candidates</span> who aren't actively searching, but are <span className="text-gold font-medium">privately open</span> to the right opportunity.
        </p>
        
        {/* Confidentiality badge */}
        <div 
          className={`flex items-center justify-center gap-2 mb-10 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
          style={{ 
            animationDelay: "1.8s", 
            animationFillMode: "forwards"
          }}
        >
          <Shield className="text-gold h-5 w-5" />
          <span className="text-gold/90 text-sm tracking-wider font-light">99% CONFIDENTIAL CANDIDATES</span>
        </div>
        
        {/* Exclusive highlight message with 3D hover effect */}
        <div 
          className={`relative max-w-3xl mx-auto mb-14 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
          style={{ 
            animationDelay: "2.0s", 
            animationFillMode: "forwards",
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -8}px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * -2}deg)`,
            transition: 'transform 0.8s ease-out'
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg blur opacity-80"></div>
          <p className="relative text-gold/90 italic text-lg md:text-xl py-8 px-10 border-l-2 border-r-2 border-gold/40 bg-black/80 backdrop-blur-md">
            <span className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></span>
            The competitive edge isn't about <span className="font-semibold not-italic">who's actively looking</span>—
            <span className="block mt-3 font-semibold not-italic">it's about <span className="text-white">who's privately available</span> if the right opportunity arises.</span>
            <span className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></span>
          </p>
        </div>
        
        {/* Enhanced CTA buttons with sophisticated interactions */}
        <div 
          className={`flex flex-col md:flex-row gap-6 md:gap-8 justify-center px-4 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
          style={{ 
            animationDelay: "2.4s", 
            animationFillMode: "forwards"
          }}
        >
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg shadow-gold/5 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
            asChild
          >
            <Link to="/agreement">
              <span className="relative z-10">View Stealth Candidates</span>
              <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-2" size={isMobile ? 16 : 18} />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gold/50 text-gold hover:bg-gold/5 text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg shadow-gold/5 hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden" 
            asChild
          >
            <Link to="/agreement">
              <span className="relative z-10">Partner With Us</span>
              <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Sophisticated scroll indicator with luxury animation */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: "2.8s", 
          animationFillMode: "forwards",
          opacity: scrollOpacity,
          transition: "opacity 0.3s ease-out"
        }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-gold/70 text-xs tracking-widest uppercase font-light mb-2">Discover The Network</p>
          <ChevronDown className="text-gold/70" size={24} />
        </div>
        {/* Luxury pulse circle behind scroll indicator */}
        <div className="absolute -inset-8 bg-gold/10 rounded-full blur-xl animate-pulse-slow opacity-70"></div>
      </div>
    </section>
  );
};

export default HeroSection;
