
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, Shield, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 md:py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 z-0"></div>
        
        {/* Subtle Gold Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
        
        <div className="container mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
              alt="VIP Employers Candidate Search" 
              className="h-auto max-w-full mx-auto w-64 md:w-96"
            />
          </div>
          
          <h1 className="text-3xl md:text-6xl font-display font-bold mb-4 md:mb-6 tracking-tight">
            <span className="text-gold">Premium</span> Candidate Access
          </h1>
          
          <p className="text-grey-300 text-lg md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
            Exclusive talent solutions for discerning employers seeking exceptional candidates.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center px-4">
            <Button 
              className="bg-gold hover:bg-gold-dark text-black font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto" 
              asChild
            >
              <Link to="/agreement">
                Access Candidates <ArrowRight className="ml-2" size={isMobile ? 16 : 20} />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gold/50 text-gold hover:bg-gold/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 h-auto" 
              asChild
            >
              <Link to="/agreement">
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator - hide on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <ArrowRight className="rotate-90 text-gold/70" size={30} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 bg-grey-900/50 border-t border-b border-gold/10">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-10 md:mb-16 px-2">
            <span className="text-gold">Exclusive Access</span> — The First of Its Kind
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                <UserCheck className="text-gold" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Premium Candidates</h3>
              <p className="text-grey-400 text-sm md:text-base">
                Access to thoroughly vetted, high-quality candidates ready for immediate consideration.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                <Shield className="text-gold" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Confidential Access</h3>
              <p className="text-grey-400 text-sm md:text-base">
                Secure, private portal ensuring complete confidentiality for sensitive hiring processes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/10 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                <Search className="text-gold" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Advanced Search</h3>
              <p className="text-grey-400 text-sm md:text-base">
                Powerful search tools to quickly find the perfect match for your specific requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-grey-900/30 z-0"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6">
              Ready to Find Your Next <span className="text-gold">Top Performer</span>?
            </h2>
            <p className="text-lg md:text-xl text-grey-300 mb-8 md:mb-10 px-2">
              Access our exclusive candidate portal and discover exceptional talent today.
            </p>
            <Button 
              className="bg-gold hover:bg-gold-dark text-black font-medium text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto" 
              size="lg"
              asChild
            >
              <Link to="/agreement">
                View Confidential Candidates
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full bg-black/80 border-t border-gold/10 py-6">
        <div className="container mx-auto text-center px-4">
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Logo" 
            className="h-14 md:h-20 mx-auto mb-4"
          />
          <p className="text-grey-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} VIP Employer Portal. All rights reserved.
          </p>
          <p className="text-grey-500 text-xs mt-1">
            All candidate information is confidential.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
