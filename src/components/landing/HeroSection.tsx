
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effect
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
      {/* Dynamic background with depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 z-0"></div>
        
        {/* Animated particle field */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gold/30"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)`,
                transition: 'transform 0.2s ease-out',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.08)_0%,transparent_70%)] animate-pulse-slow"></div>
      </div>
      
      {/* Premium geometric accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      <div className="absolute top-[30%] bottom-[30%] left-0 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute top-[30%] bottom-[30%] right-0 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      
      {/* Corner decorative elements */}
      <div className="absolute top-6 left-6 w-20 h-20 border-t border-l border-gold/20 opacity-30 hidden md:block"></div>
      <div className="absolute bottom-6 right-6 w-20 h-20 border-b border-r border-gold/20 opacity-30 hidden md:block"></div>
      
      <div className="container mx-auto text-center relative z-10 perspective-1000">
        {/* Logo with enhanced reveal animation */}
        <div 
          className="mb-6 md:mb-10 animate-fade-in opacity-0" 
          style={{ 
            animationDelay: "0.3s", 
            animationFillMode: "forwards",
            transform: `translateY(${mousePosition.y * -10}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Executive Network" 
            className="h-auto max-w-full mx-auto w-56 md:w-64 lg:w-72"
          />
          
          {/* Subtle glow effect behind logo */}
          <div className="absolute inset-0 -mt-10 rounded-full bg-gold/5 blur-3xl transform scale-100 opacity-50"></div>
        </div>
        
        {/* Premium category indicator with staggered reveal */}
        <div 
          className="overflow-hidden mb-4 animate-fade-in opacity-0" 
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          <p className="text-gold/80 text-sm md:text-base tracking-widest uppercase font-light">
            Executive Private Network
          </p>
        </div>
        
        {/* Dynamic headline with sequential animation */}
        <div className="relative mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
            <div className="overflow-hidden">
              <span 
                className="block transform translate-y-full animate-slide-up opacity-0"
                style={{ animationDelay: "0.8s", animationFillMode: "forwards", animationDuration: "1.2s" }}
              >
                The discreet channel
              </span>
            </div>
            <div className="overflow-hidden mt-2">
              <span 
                className="block transform translate-y-full animate-slide-up opacity-0"
                style={{ animationDelay: "1.0s", animationFillMode: "forwards", animationDuration: "1.2s" }}
              >
                <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent relative">
                  for strategic talent
                  <span className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-gold-dark/30 to-gold/50"></span>
                </span>
              </span>
            </div>
            <div className="overflow-hidden mt-2">
              <span 
                className="block transform translate-y-full animate-slide-up opacity-0"
                style={{ animationDelay: "1.2s", animationFillMode: "forwards", animationDuration: "1.2s" }}
              >
                acquisition
              </span>
            </div>
          </h1>
          
          {/* Animated accent line */}
          <div 
            className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            style={{
              transition: "width 1.5s ease-out 1.4s", 
              width: isVisible ? "200px" : "0px"
            }}
          ></div>
        </div>
        
        {/* Value proposition with clearer executive focus */}
        <p 
          className="text-grey-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fade-in opacity-0 px-4" 
          style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
        >
          Where forward-thinking CEOs connect with <span className="text-white font-medium">exceptional talent</span> before they enter the public market. This is your <span className="text-gold font-medium">competitive advantage</span>.
        </p>
        
        {/* Exclusive highlight message with premium effect */}
        <div 
          className="relative max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" 
          style={{ 
            animationDelay: "2.0s", 
            animationFillMode: "forwards",
            transform: `translateX(${mousePosition.x * -8}px) translateY(${mousePosition.y * -5}px)`,
            transition: 'transform 0.6s ease-out'
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/5 rounded-lg blur opacity-60"></div>
          <p className="relative text-gold/90 italic text-lg md:text-xl py-6 px-10 border-l-2 border-r-2 border-gold/30 bg-black/80 backdrop-blur-sm">
            <span className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
            Strategic advantage isn't about <span className="font-semibold not-italic">who's available</span>—
            <span className="block mt-2 font-semibold not-italic">it's about <span className="text-white">who's accessible</span>.</span>
            <span className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
          </p>
        </div>
        
        {/* Enhanced CTA buttons with sophisticated interactions */}
        <div 
          className="flex flex-col md:flex-row gap-5 md:gap-6 justify-center px-4 animate-fade-in opacity-0" 
          style={{ animationDelay: "2.4s", animationFillMode: "forwards" }}
        >
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-7 md:px-8 py-6 h-auto hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
            asChild
          >
            <Link to="/agreement">
              <span className="relative z-10">Access Candidates</span>
              <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" size={isMobile ? 16 : 18} />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gold/40 text-gold hover:bg-gold/5 text-base md:text-lg px-7 md:px-8 py-6 h-auto hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden" 
            asChild
          >
            <Link to="/agreement">
              <span className="relative z-10">Partner With Us</span>
              <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Sophisticated scroll indicator with premium animation */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-fade-in opacity-0"
        style={{ 
          animationDelay: "2.8s", 
          animationFillMode: "forwards",
          opacity: scrollOpacity,
          transition: "opacity 0.3s ease-out"
        }}
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-gold/60 text-xs tracking-widest uppercase font-light mb-2">Discover More</p>
          <ChevronDown className="text-gold/60" size={24} />
        </div>
        {/* Premium pulse circle behind scroll indicator */}
        <div className="absolute -inset-8 bg-gold/5 rounded-full blur-xl animate-pulse-slow opacity-60"></div>
      </div>
    </section>
  );
};

export default HeroSection;
