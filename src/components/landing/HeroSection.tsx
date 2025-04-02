
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroBackground from "./hero/HeroBackground";
import HeroLogo from "./hero/HeroLogo";
import HeroHeadline from "./hero/HeroHeadline";
import HeroProposition from "./hero/HeroProposition";
import HeroCTA from "./hero/HeroCTA";
import HeroScrollIndicator from "./hero/HeroScrollIndicator";

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
      {/* Dynamic background elements */}
      <HeroBackground mousePosition={mousePosition} />
      
      <div className="container mx-auto text-center relative z-10 perspective-1000 mt-8">
        {/* Logo component */}
        <HeroLogo mousePosition={mousePosition} hasLoaded={hasLoaded} />
        
        {/* Headline component */}
        <HeroHeadline hasLoaded={hasLoaded} isVisible={isVisible} />
        
        {/* Proposition component */}
        <HeroProposition mousePosition={mousePosition} hasLoaded={hasLoaded} />
        
        {/* CTA component */}
        <HeroCTA hasLoaded={hasLoaded} />
      </div>
      
      {/* Scroll indicator component */}
      <HeroScrollIndicator scrollOpacity={scrollOpacity} hasLoaded={hasLoaded} />
    </section>
  );
};

export default HeroSection;
