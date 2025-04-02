
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, CheckCircle } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ExclusiveAccess = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black"></div>
      
      {/* Radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(171,135,85,0.1)_0%,transparent_70%)]"></div>
      
      {/* Decorative border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left column - Content */}
            <div className={`transform transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
                  Exclusive Access
                </span>
                <span className="block mt-1">
                  For Forward-Looking Leaders
                </span>
              </h2>
              
              <p className="text-grey-300 text-lg mb-10 leading-relaxed">
                Our closed network contains high-caliber executives who aren't on job boards—they're quietly exploring strategic moves while maintaining complete discretion.
              </p>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-start">
                  <CheckCircle className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                  <span className="text-grey-200">
                    <strong className="font-medium text-white">Pre-vetted executive talent</strong> – Every candidate has been carefully screened for exceptional leadership capabilities.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                  <span className="text-grey-200">
                    <strong className="font-medium text-white">Complete confidentiality</strong> – End-to-end encryption and strict privacy protocols protect all parties involved.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-gold mt-1 mr-3 flex-shrink-0" size={20} />
                  <span className="text-grey-200">
                    <strong className="font-medium text-white">Strategic advantage</strong> – Access talent others don't even know is available, creating a competitive edge for your organization.
                  </span>
                </li>
              </ul>
              
              <Button 
                className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-7 py-6 h-auto hover:shadow-xl hover:shadow-gold/10 transition-all transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
                asChild
              >
                <Link to="/agreement">
                  <span className="relative z-10">Access The Network</span>
                  <ArrowRight className="ml-2 relative z-10 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
              </Button>
            </div>
            
            {/* Right column - Visual element */}
            <div className={`transform transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="aspect-square relative rounded-lg flex items-center justify-center p-2 border border-gold/10">
                <div className="absolute inset-2 bg-black/60 backdrop-blur-sm z-0 rounded"></div>
                
                {/* Lock icon with animation */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl animate-pulse-slow"></div>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center">
                      <Lock className="text-gold" size={60} />
                    </div>
                    {/* Rings around lock */}
                    <div className="absolute -inset-4 border border-gold/10 rounded-full animate-pulse-slow"></div>
                    <div className="absolute -inset-8 border border-gold/5 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
                    <div className="absolute -inset-12 border border-gold/5 rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
                  </div>
                  
                  <p className="text-xl md:text-2xl font-display font-medium text-center text-gold mb-3">
                    Confidential Network
                  </p>
                  <p className="text-grey-300 text-center max-w-sm">
                    Access to our exclusive database requires approval and a confidentiality agreement.
                  </p>
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/20"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/20"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/20"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveAccess;
