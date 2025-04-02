
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Rocket, ShieldCheck, Timer } from "lucide-react";

const ValueProposition = () => {
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedItems([0]);
        
        const timer2 = setTimeout(() => {
          setAnimatedItems([0, 1]);
          
          const timer3 = setTimeout(() => {
            setAnimatedItems([0, 1, 2]);
          }, 300);
          
          return () => clearTimeout(timer3);
        }, 300);
        
        return () => clearTimeout(timer2);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative bg-black overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0"></div>
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.07)_0%,transparent_70%)]"></div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">Strategic Advantage</span> Through Exclusive Intelligence
          </h2>
          <p className="text-grey-300 text-lg md:text-xl text-center max-w-3xl mx-auto">
            Beyond the public talent market lies a hidden executive ecosystem. We provide the private intelligence that shapes market-leading teams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Strategic Value 1 */}
          <div className={`transform transition-all duration-1000 ${animatedItems.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="rounded-lg p-8 h-full bg-black/50 backdrop-blur-sm border border-gold/10 group hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b border-r border-gold/10 opacity-30 transition-opacity group-hover:opacity-60"></div>
              
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gold/5 blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <Rocket className="text-gold relative z-10" size={38} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4">First-Mover Access</h3>
              <p className="text-grey-300 leading-relaxed">
                Access exceptional leadership talent before they become publicly available. Strategy is about being first—this applies to talent acquisition as well.
              </p>
            </div>
          </div>
          
          {/* Strategic Value 2 */}
          <div className={`transform transition-all duration-1000 delay-300 ${animatedItems.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="rounded-lg p-8 h-full bg-black/50 backdrop-blur-sm border border-gold/10 group hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b border-r border-gold/10 opacity-30 transition-opacity group-hover:opacity-60"></div>
              
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gold/5 blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <ShieldCheck className="text-gold relative z-10" size={38} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Absolute Discretion</h3>
              <p className="text-grey-300 leading-relaxed">
                Maintain complete confidentiality throughout the process. The most consequential leadership moves happen quietly, away from market speculation.
              </p>
            </div>
          </div>
          
          {/* Strategic Value 3 */}
          <div className={`transform transition-all duration-1000 delay-600 ${animatedItems.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="rounded-lg p-8 h-full bg-black/50 backdrop-blur-sm border border-gold/10 group hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
              <div className="absolute -bottom-1 -right-1 w-20 h-20 border-b border-r border-gold/10 opacity-30 transition-opacity group-hover:opacity-60"></div>
              
              <div className="mb-6 relative">
                <div className="absolute -inset-2 rounded-full bg-gold/5 blur-md opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <Timer className="text-gold relative z-10" size={38} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4">Time Advantage</h3>
              <p className="text-grey-300 leading-relaxed">
                Accelerate your executive search process by bypassing traditional channels. In markets that move fast, time is the ultimate competitive edge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
