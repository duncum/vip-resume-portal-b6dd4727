
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SearchInput from "@/components/candidates/SearchInput"; 
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { 
  HeroBackground, 
  HeroLogo, 
  HeroHeadline, 
  HeroProposition, 
  HeroCTA,
  HeroScrollIndicator
} from "@/components/landing/hero";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePosition({ x, y });
  };

  // Handle scroll to fade out scroll indicator and apply other effects
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Fade out scroll indicator
    if (scrollY > 50) {
      setScrollOpacity(0);
    } else {
      setScrollOpacity(1);
    }
    
    // Check if hero section is still visible
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setIsHeroVisible(rect.bottom > 0);
    }
  };
  
  // Set up scroll and reset mouse position events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Reset mouse position when mouse leaves the container
    const resetMousePosition = () => setMousePosition({ x: 0, y: 0 });
    document.addEventListener('mouseleave', resetMousePosition);
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => setHasLoaded(true), 100);
    
    // Apply landing page styles
    document.body.classList.add('landing-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', resetMousePosition);
      document.body.classList.remove('landing-page');
      clearTimeout(timer);
    };
  }, []);

  const handleSearch = (query: string) => {
    if (query) {
      // Redirect to candidates page with search query
      window.location.href = `/candidates?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Background */}
        <HeroBackground mousePosition={mousePosition} />
        
        {/* Content Container */}
        <div className="container mx-auto text-center relative z-10 mt-8 flex flex-col items-center">
          {/* Logo */}
          <HeroLogo mousePosition={mousePosition} hasLoaded={hasLoaded} />
          
          {/* Headline & Value Proposition */}
          <HeroHeadline hasLoaded={hasLoaded} isVisible={isHeroVisible} />
          
          {/* Value proposition with interactive hover effect */}
          <HeroProposition mousePosition={mousePosition} hasLoaded={hasLoaded} />
          
          {/* Search Component */}
          <div 
            className={`w-full max-w-2xl mx-auto mb-10 md:mb-16 opacity-0 ${hasLoaded ? 'animate-fade-in' : ''}`}
            style={{ 
              animationDelay: "2.0s", 
              animationFillMode: "forwards"
            }}
          >
            <SearchInput onSearch={handleSearch} />
            <p className="text-sm text-grey-400 mt-2">Search our confidential network of top executives</p>
          </div>
          
          {/* CTA Buttons */}
          <HeroCTA hasLoaded={hasLoaded} />
          
          {/* Scroll indicator */}
          <HeroScrollIndicator scrollOpacity={scrollOpacity} hasLoaded={hasLoaded} />
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display">
              The <span className="text-gold">Top 1%</span> Advantage
            </h2>
            <div className="h-1 w-20 bg-gold/30 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Benefit 1 */}
            <div className="bg-black/60 border border-gold/10 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-gold/5 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m16 12-4 4-4-4"></path>
                  <path d="M12 8v8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ultra-Confidential</h3>
              <p className="text-grey-300">Our network operates with 99% confidentiality, protecting the interests of both executives and companies.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-black/60 border border-gold/10 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-gold/5 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connections</h3>
              <p className="text-grey-300">No middlemen or traditional recruitment processes. Direct access to executives open to the right opportunity.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-black/60 border border-gold/10 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-gold/5 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Exclusive Access</h3>
              <p className="text-grey-300">Connect with executives who are not on job boards or publicly available through traditional channels.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-black/60 border border-gold/20 p-8 md:p-10 rounded-lg relative">
            <div className="absolute -top-4 -left-4 text-gold text-6xl opacity-30">"</div>
            <div className="absolute -bottom-4 -right-4 text-gold text-6xl opacity-30">"</div>
            
            <blockquote className="text-xl md:text-2xl text-grey-200 italic text-center">
              The real competitive advantage isn't about <span className="font-semibold text-white not-italic">who's publicly available</span>—it's about <span className="font-semibold text-gold not-italic">who's privately open</span> if the right opportunity presents itself.
            </blockquote>
            
            <div className="flex justify-center mt-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold">JD</div>
                <div className="ml-3">
                  <p className="font-medium">James Donovan</p>
                  <p className="text-sm text-grey-400">CEO, Global Ventures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-t from-black to-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to connect with exceptional executives?</h2>
          <p className="text-xl text-grey-300 max-w-2xl mx-auto mb-10">Gain access to our exclusive network of top-tier executives who are selectively open to the right opportunities.</p>
          
          <Button 
            className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-lg px-10 py-6 h-auto shadow-xl shadow-gold/5 hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300" 
            asChild
          >
            <Link to="/agreement">
              Access Executive Network <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;
