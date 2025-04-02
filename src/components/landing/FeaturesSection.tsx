
import { UserCheck, Shield, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FeaturesSection = () => {
  const isMobile = useIsMobile();
  
  return (
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
  );
};

export default FeaturesSection;
