
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();
  
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
        <div className="mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-500">
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Candidate Search" 
            className="h-auto max-w-full mx-auto w-64 md:w-96"
          />
        </div>
        
        {/* Main heading with enhanced typography */}
        <h1 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight animate-fade-in">
          For <span className="text-gold bg-gradient-to-r from-gold-dark via-gold to-gold-light text-transparent bg-clip-text">CEOs</span> who move before the market does.
        </h1>
        
        {/* Subheading with better spacing and font weight */}
        <p className="text-grey-300 text-lg md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 animate-fade-in">
          This is your private channel to high-level leaders in quiet motion—off-market, off-radar, and quietly open to the right opportunity.
        </p>
        
        {/* Highlight message with enhanced styling */}
        <p className="text-gold italic text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in border-l-4 border-r-4 border-gold/30 py-4 px-6 md:px-8">
          They're in stealth mode. And this exists for one reason: so you get there first.
        </p>
        
        {/* CTA buttons with improved visual appeal */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center px-4 animate-fade-in">
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all" 
            asChild
          >
            <Link to="/agreement">
              Access Candidates <ArrowRight className="ml-2" size={isMobile ? 16 : 20} />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gold/50 text-gold hover:bg-gold/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all" 
            asChild
          >
            <Link to="/agreement">
              Partner With Us
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <ArrowRight className="rotate-90 text-gold/70" size={30} />
      </div>
    </section>
  );
};

export default HeroSection;
