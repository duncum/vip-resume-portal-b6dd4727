
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, Shield, Search, Star, Trophy, BadgeCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
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
      
      {/* Features Section with enhanced styling */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-black via-grey-900/30 to-black border-t border-b border-gold/10">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-center mb-10 md:mb-16 px-2">
            <span className="text-gold bg-gradient-to-r from-gold-dark to-gold-light text-transparent bg-clip-text">Exclusive Access</span> — The First of Its Kind
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Feature 1 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-gold/10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                <UserCheck className="text-gold" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Premium Candidates</h3>
              <p className="text-grey-400 text-sm md:text-base">
                Access to thoroughly vetted, high-quality candidates ready for immediate consideration.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-gold/10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
                <Shield className="text-gold" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Confidential Access</h3>
              <p className="text-grey-400 text-sm md:text-base">
                Secure, private portal ensuring complete confidentiality for sensitive hiring processes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-black/50 backdrop-blur-sm border border-gold/10 p-6 md:p-8 rounded-lg text-center hover:border-gold/30 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-gold/10">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 mb-4 md:mb-6 group-hover:bg-gold/20 transition-colors">
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
      
      {/* Testimonials Section with enhanced visual design */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-grey-900/30 z-0"></div>
        
        {/* Gold accent pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-6 gap-8">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-full h-32 border-t border-l border-gold/20 transform rotate-45"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-center">
              Trusted by <span className="text-gold bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent">Industry Leaders</span>
            </h2>
            <p className="text-base md:text-lg text-grey-300 mb-12 text-center max-w-2xl mx-auto">
              Our exclusive candidate portal has helped top companies find their most valuable team members.
            </p>
            
            {/* Testimonial Cards with improved styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Testimonial 1 */}
              <div className="bg-black/40 backdrop-blur-sm border border-gold/10 p-6 rounded-lg hover:border-gold/30 transition-duration-300 hover:shadow-lg hover:shadow-gold/10 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center group-hover:from-gold/40 group-hover:to-gold/20 transition-colors">
                      <Trophy className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-grey-400">Chief People Officer, TechGrowth Inc.</p>
                  </div>
                </div>
                <p className="text-grey-300 italic">
                  "The quality of candidates we've accessed through this portal is outstanding. We filled three executive positions in record time with perfect matches for our culture."
                </p>
                <div className="mt-4 flex text-gold">
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-black/40 backdrop-blur-sm border border-gold/10 p-6 rounded-lg hover:border-gold/30 transition-duration-300 hover:shadow-lg hover:shadow-gold/10 group">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center group-hover:from-gold/40 group-hover:to-gold/20 transition-colors">
                      <BadgeCheck className="w-6 h-6 text-gold" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">Michael Chen</h4>
                    <p className="text-sm text-grey-400">Founder, Innovate Partners</p>
                  </div>
                </div>
                <p className="text-grey-300 italic">
                  "The confidential nature of this service allowed us to discreetly build our executive team without alerting competitors. Worth every penny."
                </p>
                <div className="mt-4 flex text-gold">
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                  <Star className="w-5 h-5 fill-gold" />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all" 
                size="lg"
                asChild
              >
                <Link to="/agreement">
                  Join Leading Employers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer with enhanced styling */}
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
