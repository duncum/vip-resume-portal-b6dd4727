
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20 overflow-hidden">
      {/* Enhanced Background with subtle gradient and particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-0"></div>
      
      {/* Animated gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
      
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNSAzLjEgMS4zLjguOCAxLjMgMS45IDEuMyAzLjEgMCAxLjItLjUgMi4zLTEuMyAzLjEtLjguOC0xLjkgMS4zLTMuMSAxLjMtMS4yIDAtMi4zLS41LTMuMS0xLjMtLjgtLjgtMS4zLTEuOS0xLjMtMy4xIDAtMS4yLjUtMi4zIDEuMy0zLjEuOC0uOCAxLjktMS4zIDMuMS0xLjN6TTI0IDMwYzEuMiAwIDIuMy41IDMuMSAxLjMuOC44IDEuMyAxLjkgMS4zIDMuMSAwIDEuMi0uNSAyLjMtMS4zIDMuMS0uOC44LTEuOSAxLjMtMy4xIDEuMy0xLjIgMC0yLjMtLjUtMy4xLTEuMy0uOC0uOC0xLjMtMS45LTEuMy0zLjEgMC0xLjIuNS0yLjMgMS4zLTMuMS44LS44IDEuOS0xLjMgMy4xLTEuM3oiIHN0cm9rZT0iI2FiODc1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        {/* Logo with animation */}
        <div className="mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-500 animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Candidate Search" 
            className="h-auto max-w-full mx-auto w-64 md:w-96"
          />
        </div>
        
        {/* Dramatically enhanced headline with typography and effects */}
        <div className="relative my-8 md:my-12 max-w-4xl mx-auto">
          {/* Background decorative element */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-lg blur opacity-30"></div>
          
          <h1 className="relative text-3xl md:text-6xl lg:text-7xl font-display font-bold mb-2 tracking-tight">
            <div className="overflow-hidden mb-2">
              <span className="inline-block animate-fade-down opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>For</span>
            </div>
            <div className="overflow-hidden relative">
              <span className="inline-block font-bold bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent animate-fade-down opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                CEOs
              </span>
              {/* Animated underline effect */}
              <span className={`absolute bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-gold-dark to-gold transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`} style={{ transitionDelay: "1.2s" }}></span>
            </div>
            <div className="overflow-hidden mt-2">
              <span className="inline-block animate-fade-down opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>who move</span>
            </div>
            <div className="overflow-hidden relative">
              <div className="relative inline-block">
                <span className="relative z-10 inline-block animate-fade-down opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>before the market</span>
                {/* Decorative element behind "before the market" */}
                <span className={`absolute inset-y-0 left-0 w-0 h-full bg-gold/10 -skew-x-12 transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`} style={{ transitionDelay: "1.4s" }}></span>
              </div>
            </div>
            <div className="overflow-hidden mt-2">
              <span className="inline-block animate-fade-down opacity-0" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>does.</span>
            </div>
          </h1>
        </div>

        {/* Subheading with better spacing and font weight */}
        <p className="text-grey-300 text-lg md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 animate-fade-in opacity-0" style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
          This is your private channel to high-level leaders in quiet motion—off-market, off-radar, and quietly open to the right opportunity.
        </p>
        
        {/* Enhanced highlight message with floating effect */}
        <div className="relative max-w-2xl mx-auto mb-10 md:mb-12 animate-fade-in opacity-0" style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}>
          {/* Subtle floating animation */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg blur opacity-50 animate-pulse-slow"></div>
          <p className="relative text-gold italic text-lg md:text-xl py-5 px-8 border-l-2 border-r-2 border-gold/40 bg-black/50">
            They're in <span className="font-semibold">stealth mode</span>. And this exists for one reason: 
            <span className="block mt-1 font-semibold">so you get there first.</span>
          </p>
        </div>
        
        {/* CTA buttons with improved visual appeal */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center px-4 animate-fade-in opacity-0" style={{ animationDelay: "1.8s", animationFillMode: "forwards" }}>
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all transform hover:translate-y-[-3px] hover:scale-105 group" 
            asChild
          >
            <Link to="/agreement">
              Access Candidates <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={isMobile ? 16 : 20} />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gold/50 text-gold hover:bg-gold/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all transform hover:translate-y-[-3px] hover:scale-105" 
            asChild
          >
            <Link to="/agreement">
              Partner With Us
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Animated scroll indicator with improved visibility */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-fade-in opacity-0" style={{ animationDelay: "2.2s", animationFillMode: "forwards" }}>
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-gold/70 text-sm mb-2 tracking-wider">Scroll to explore</p>
          <ArrowRight className="rotate-90 text-gold/70" size={30} />
        </div>
        {/* Animated pulse circle behind scroll indicator */}
        <div className="absolute -inset-8 bg-gold/5 rounded-full blur-md animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default HeroSection;
