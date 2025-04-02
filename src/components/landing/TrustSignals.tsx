
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const TrustSignals = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animationClass, setAnimationClass] = useState("fade-in");
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const testimonials = [
    {
      quote: "The caliber of talent we've accessed through this channel has transformed our leadership team. These aren't just executives—they're visionaries who weren't on anyone else's radar.",
      author: "Sarah Jacobson",
      title: "Chief Executive Officer, Meridian Capital",
    },
    {
      quote: "In our industry, the difference between success and mere survival is having the right strategic minds. This network connected us with executives who understand the difference.",
      author: "Michael Chen",
      title: "Chairman, Novation Group",
    },
    {
      quote: "Being able to connect with high-caliber talent in complete confidence changed our approach to executive acquisition. The intelligence we've gained has been instrumental.",
      author: "Elizabeth Winters",
      title: "President, Elysium Ventures",
    }
  ];
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimationClass("fade-out");
        
        setTimeout(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
          setAnimationClass("fade-in");
        }, 800);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [inView, testimonials.length]);
  
  return (
    <section ref={ref} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black to-black/95"></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute left-0 right-0 bottom-0 top-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(171,135,85,0.08)_0%,transparent_70%)]"></div>
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border-t border-l border-gold/10"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section title with premium styling */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="inline-block relative text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
              <span className="relative z-10">
                Trusted by <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">Strategic Leaders</span>
              </span>
              <span className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></span>
            </h2>
          </div>
          
          {/* Premium testimonial showcase */}
          <div className="bg-black/40 backdrop-blur-sm border border-gold/10 rounded-lg p-8 md:p-12 mb-16 md:mb-20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-gold/20 opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-gold/20 opacity-20"></div>
            
            <div className="absolute left-6 top-6">
              <Quote className="text-gold/20" size={50} />
            </div>
            
            <div className="mx-auto text-center relative min-h-[220px] flex flex-col items-center justify-center">
              <blockquote className={`text-xl md:text-2xl italic text-grey-200 max-w-3xl mx-auto mb-8 animate-${animationClass}`}>
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className={`animate-${animationClass}`}>
                <p className="font-display font-semibold text-white text-lg md:text-xl">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-grey-400 text-base md:text-lg">
                  {testimonials[currentTestimonial].title}
                </p>
              </div>
            </div>
            
            {/* Testimonial navigation indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-gold w-8' : 'bg-grey-600 hover:bg-grey-500'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Logos section with elegant design */}
          <div className="text-center mb-20">
            <p className="text-grey-400 text-sm uppercase tracking-widest mb-10">Partnered with industry leaders</p>
            
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {/* These would normally be actual client logos, using placeholder styling for now */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div 
                  key={item}
                  className="h-12 w-32 bg-gradient-to-r from-gold/5 to-transparent rounded filter grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-center"
                >
                  <div className="font-display text-xl text-gold/40 hover:text-gold/70 transition-colors">
                    PARTNER {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA section */}
          <div className="text-center">
            <Button 
              className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/10 transition-all transform hover:-translate-y-1 hover:scale-105 group relative overflow-hidden" 
              size="lg"
              asChild
            >
              <Link to="/agreement">
                <span className="relative z-10">Join Forward-Thinking Leaders</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
