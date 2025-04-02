
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

const ExecutiveHero = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Control sequential animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Reference for scroll indicator
  const { ref: scrollRef, inView: scrollInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] px-4 py-16 overflow-hidden">
      {/* Enhanced Background with sophisticated gradient and overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95 z-0"></div>
      
      {/* Premium geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.15)_0%,transparent_80%)]"></div>
      </div>
      
      {/* Dynamic gold accent lines with movement */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
      
      {/* Side accent lines */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      
      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        {/* Logo reveal animation */}
        <div className="mb-12 transform-gpu transition-all duration-1000 relative animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Network" 
            className="h-auto max-w-full mx-auto w-52 md:w-72 opacity-0 animate-scale"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          />
          
          {/* Subtle glow effect behind logo */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gold/5 blur-3xl transform scale-150 opacity-0 animate-fade-in" style={{ animationDelay: "1s", animationFillMode: "forwards" }}></div>
        </div>
        
        {/* Executive-focused headline with premium typography and animations */}
        <h2 className="font-display text-lg md:text-xl tracking-wide text-gold/80 uppercase mb-3 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s", animationFillMode: "forwards", letterSpacing: "0.25em" }}>
          Executive Network
        </h2>
        
        <div className="relative max-w-5xl mx-auto mb-10">
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block overflow-hidden">
                <span className="block transform translate-y-full animate-slide-up opacity-0 inline-block" 
                  style={{ animationDelay: "1.4s", animationFillMode: "forwards", animationDuration: "1.2s" }}>
                  The quiet channel to
                </span>
              </span>
              <span className="block mt-1 overflow-hidden">
                <span className="relative inline-block transform translate-y-full animate-slide-up opacity-0" 
                  style={{ animationDelay: "1.6s", animationFillMode: "forwards", animationDuration: "1.2s" }}>
                  <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">exceptional talent</span>
                </span>
              </span>
              <span className="block mt-1 overflow-hidden">
                <span className="block transform translate-y-full animate-slide-up opacity-0" 
                  style={{ animationDelay: "1.8s", animationFillMode: "forwards", animationDuration: "1.2s" }}>
                  in stealth mode.
                </span>
              </span>
            </h1>
          </div>
          
          {/* Subtle line decoration */}
          <div className={`absolute left-1/2 -bottom-4 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-1000 ease-out ${animationComplete ? 'w-32' : 'w-0'}`}></div>
        </div>

        {/* Executive value proposition with strategic reveal */}
        <div className="perspective-1000">
          <p className="text-grey-300 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-in" 
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}>
            For C-suite leaders who recognize that <span className="text-white font-medium">the most valuable executives</span> aren't actively looking—but are <span className="text-gold">selectively available</span> through the right channels.
          </p>
        </div>
        
        {/* Executive highlight message with sophisticated floating effect */}
        <div className="relative max-w-2xl mx-auto mb-14 opacity-0 animate-fade-in" 
          style={{ animationDelay: "2.4s", animationFillMode: "forwards" }}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-gold/5 rounded-lg blur opacity-30"></div>
          <p className="relative text-gold/90 italic text-lg md:text-xl py-5 px-8 border-l-2 border-r-2 border-gold/30 bg-black/70 backdrop-blur-sm">
            <span className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
            This isn't about who's <span className="font-semibold not-italic">publicly</span> available.
            <span className="block mt-1.5 font-semibold not-italic">It's about who's <span className="text-white">privately</span> receptive.</span>
            <span className="absolute -bottom-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
          </p>
          
          {/* Floating effect */}
          <div className="absolute -inset-3 border border-gold/10 rounded-lg animate-float opacity-0" 
            style={{ animationDelay: "3s", animationFillMode: "forwards" }}></div>
        </div>
        
        {/* CTA buttons with premium animations and interaction */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-7 justify-center px-4 opacity-0 animate-fade-in" 
          style={{ animationDelay: "2.8s", animationFillMode: "forwards" }}>
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-7 md:px-10 py-6 md:py-7 h-auto hover:shadow-xl hover:shadow-gold/10 transition-all transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
            asChild
          >
            <Link to="/agreement">
              <span className="relative z-10">Access Candidates</span>
              <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gold/30 text-gold hover:bg-gold/5 text-base md:text-lg px-7 md:px-10 py-6 md:py-7 h-auto hover:shadow-xl hover:shadow-gold/10 transition-all transform hover:-translate-y-1 group relative overflow-hidden" 
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
      <div ref={scrollRef} className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-700 ${scrollInView ? 'opacity-100' : 'opacity-0'}`}>
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-gold/60 text-sm mb-2 tracking-widest uppercase font-light">Explore</p>
          <ChevronDown className="text-gold/60" size={24} />
        </div>
        {/* Premium pulse circle behind scroll indicator */}
        <div className="absolute -inset-8 bg-gold/5 rounded-full blur-xl animate-pulse-slow opacity-50"></div>
      </div>
      
      {/* Corner decorative element */}
      <div className="absolute top-8 right-8 w-24 h-24 border-t border-r border-gold/20 opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b border-l border-gold/20 opacity-30"></div>
    </section>
  );
};

export default ExecutiveHero;
