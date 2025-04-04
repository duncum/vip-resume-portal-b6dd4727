
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SearchInput from "@/components/candidates/SearchInput"; 
import Footer from "@/components/layout/Footer";

const Landing = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.classList.add('landing-page');
    
    return () => {
      document.body.classList.remove('landing-page');
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
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20 overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png')] bg-center opacity-5"></div>
          
          {/* Elegant grid overlay */}
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
          
          {/* Premium radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.08)_0%,transparent_60%)]"></div>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto text-center relative z-10 mt-8 flex flex-col items-center">
          {/* Logo */}
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="Executive Connect Logo" 
            className="h-16 md:h-20 mb-6 md:mb-10 animate-fade-in"
          />
          
          {/* Headline */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
              <span className="animate-fade-in">Exclusive Access to</span>
              <span className="block mt-2 md:mt-4 bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Private Executive Network
              </span>
            </h1>
          </div>
          
          {/* Description */}
          <p className="text-grey-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-14 leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Direct connections to <span className="text-gold">exceptional executives</span> who aren't actively seeking, but are <span className="text-white font-medium">privately receptive</span> to transformative opportunities.
          </p>
          
          {/* Search Component */}
          <div className="w-full max-w-2xl mx-auto mb-10 md:mb-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <SearchInput onSearch={handleSearch} />
            <p className="text-sm text-grey-400 mt-2">Search our confidential network of top executives</p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center px-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button 
              className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 group relative overflow-hidden" 
              asChild
            >
              <Link to="/agreement">
                <span className="relative z-10">Access Executive Network</span>
                <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-2" />
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gold/50 text-gold hover:bg-gold/5 text-base md:text-lg px-8 md:px-10 py-7 h-auto shadow-lg hover:shadow-xl hover:shadow-gold/10 transition-all duration-300" 
              asChild
            >
              <Link to="/agreement">
                <span>Exclusive Partnership</span>
              </Link>
            </Button>
          </div>
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
