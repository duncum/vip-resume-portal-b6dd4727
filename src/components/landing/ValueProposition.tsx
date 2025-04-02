
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";
import { Rocket, ShieldCheck, Timer, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ValueProposition = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [hoverState, setHoverState] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        // Auto-rotate through cards
        const interval = setInterval(() => {
          setActiveCard((prev) => {
            const next = prev === null ? 0 : (prev + 1) % 3;
            return hoverState === null ? next : hoverState;
          });
        }, 4000);
        
        return () => clearInterval(interval);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setActiveCard(null);
    }
  }, [inView, hoverState]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const cards = containerRef.current.querySelectorAll('.value-card');
      const icons = containerRef.current.querySelectorAll('.value-icon');
      
      cards.forEach((card, i) => {
        const cardEl = card as HTMLElement;
        
        // Only apply stronger effects to the active card
        const intensity = activeCard === i ? 2 : 1;
        
        cardEl.style.transform = `
          perspective(1500px)
          rotateY(${x * 5 * intensity}deg)
          rotateX(${-y * 5 * intensity}deg)
          translateZ(10px)
        `;
      });
      
      icons.forEach((icon) => {
        const iconEl = icon as HTMLElement;
        iconEl.style.transform = `
          translateX(${x * 15}px)
          translateY(${y * 15}px)
        `;
      });
    };
    
    if (inView) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [inView, activeCard]);

  const valueProps = [
    {
      title: "Elite Executive Access",
      icon: <Rocket className="text-gold value-icon transition-all duration-500" size={46} />,
      description: "Engage with leadership talent before market awareness. The true strategic advantage lies in being first—particularly in securing transformative executives.",
      color: "from-gold/30 to-gold/5",
      borderColor: activeCard === 0 ? "border-gold" : "border-gold/20",
      glow: activeCard === 0 ? "opacity-70" : "opacity-0"
    },
    {
      title: "Absolute Confidentiality",
      icon: <ShieldCheck className="text-gold value-icon transition-all duration-500" size={46} />,
      description: "Conduct high-stakes leadership acquisitions with complete discretion. The most impactful executive movements happen entirely outside of market visibility.",
      color: "from-gold/30 to-gold/5",
      borderColor: activeCard === 1 ? "border-gold" : "border-gold/20",
      glow: activeCard === 1 ? "opacity-70" : "opacity-0"
    },
    {
      title: "Strategic Time Advantage",
      icon: <Timer className="text-gold value-icon transition-all duration-500" size={46} />,
      description: "Accelerate executive acquisition by bypassing conventional channels. In competitive industries, time compression delivers insurmountable market advantage.",
      color: "from-gold/30 to-gold/5",
      borderColor: activeCard === 2 ? "border-gold" : "border-gold/20",
      glow: activeCard === 2 ? "opacity-70" : "opacity-0"
    }
  ];

  return (
    <section ref={ref} className="py-32 md:py-44 px-4 relative bg-black overflow-hidden">
      {/* Constellation background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,135,85,0.08)_0%,transparent_60%)]"></div>
      
      {/* Animated subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-gold/20 justify-self-end"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-6 opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-gold/20 self-end"></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="mb-24">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60"></div>
            <Star className="text-gold mx-4" size={20} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-8 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">Strategic Advantages</span>
            <br />
            <span className="text-white">For Market Dominance</span>
          </h2>
          
          <p className="text-grey-300 text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            Beyond traditional talent acquisition lies an exclusive executive ecosystem. Our intelligence network provides privileged access to leadership talent that shapes market outcomes.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-gold/30 via-gold/50 to-gold/30"></div>
          </div>
        </div>
        
        {/* Interactive Value Proposition Cards */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-24 perspective-1000"
        >
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className={`value-card rounded-lg p-8 md:p-10 min-h-[340px] backdrop-blur-sm border-2 transition-all duration-500 relative overflow-hidden transform ${prop.borderColor} hover:border-gold`}
              onMouseEnter={() => {
                setHoverState(index);
                setActiveCard(index);
              }}
              onMouseLeave={() => {
                setHoverState(null);
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: activeCard === index ? 'translateZ(20px)' : 'translateZ(0)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              {/* Highlight glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${prop.color} rounded-lg blur-xl transition-opacity duration-500 ${prop.glow}`}></div>
              
              {/* Decorative corner */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 border-b-2 border-r-2 border-gold/20 opacity-30 transition-opacity group-hover:opacity-60"></div>
              
              <div className="mb-8 relative perspective-1000 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${prop.color} blur-xl transition-opacity duration-500 ${activeCard === index ? 'opacity-100' : 'opacity-50'}`}></div>
                <div className="relative z-10 bg-black/50 p-5 rounded-full">
                  {prop.icon}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 text-center">{prop.title}</h3>
              <p className="text-grey-300 leading-relaxed text-center">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Exclusive CTA */}
        <div className="text-center transform transition-all duration-700">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/30 to-gold/10 rounded-lg blur-md opacity-80"></div>
            <Button 
              className="relative z-10 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-black font-medium text-lg px-10 py-7 h-auto hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1" 
              asChild
            >
              <Link to="/agreement">
                Access Executive Network
              </Link>
            </Button>
          </div>
          
          <p className="mt-6 text-gold/70 text-sm">Privileged access by executive invitation only</p>
          
          {/* Award indicator */}
          <div className="mt-16 flex items-center justify-center">
            <Award className="text-gold/40 mr-3" size={20} />
            <span className="text-gold/40 text-sm uppercase tracking-wider">Top Executive Network 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
