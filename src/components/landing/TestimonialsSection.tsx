
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, BadgeCheck, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const TestimonialsSection = () => {
  const [animated, setAnimated] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      setAnimated(true);
    }
  }, [inView]);
  
  return (
    <section ref={ref} className="py-16 md:py-20 px-4 relative overflow-hidden">
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
          <h2 className={`text-2xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-center transition-all duration-700 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Trusted by <span className="text-gold bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          <p className={`text-base md:text-lg text-grey-300 mb-12 text-center max-w-2xl mx-auto transition-all duration-700 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "0.2s" }}>
            Our exclusive candidate portal has helped top companies find their most valuable team members.
          </p>
          
          {/* Testimonial Cards with improved styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Testimonial 1 */}
            <div className={`bg-black/40 backdrop-blur-sm border border-gold/10 p-6 rounded-lg hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/10 group transform ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: "0.3s" }}>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center group-hover:from-gold/40 group-hover:to-gold/20 transition-colors">
                    <Trophy className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
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
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className={`bg-black/40 backdrop-blur-sm border border-gold/10 p-6 rounded-lg hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-gold/10 group transform ${animated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: "0.5s" }}>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center group-hover:from-gold/40 group-hover:to-gold/20 transition-colors">
                    <BadgeCheck className="w-6 h-6 text-gold transition-transform group-hover:scale-110" />
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
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
                <Star className="w-5 h-5 fill-gold transition-all hover:scale-110" />
              </div>
            </div>
          </div>
          
          <div className={`text-center transition-all duration-700 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "0.7s" }}>
            <Button 
              className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto hover:shadow-lg hover:shadow-gold/20 transition-all transform hover:translate-y-[-3px] hover:scale-105" 
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
  );
};

export default TestimonialsSection;
