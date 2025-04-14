
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, UserSearch, Lock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-300">
                Discover Elite Talent
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Access our exclusive database of pre-screened, high-caliber candidates ready to elevate your team.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black"
                >
                  <Link to="/agreement">Enter Talent Portal</Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                >
                  <a href="#">Contact Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-500">Why Choose TalentVault</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                  <UserSearch className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vetted Candidates</h3>
                <p className="text-gray-400">
                  Every candidate in our database has been thoroughly screened and verified for quality.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Confidential Access</h3>
                <p className="text-gray-400">
                  Secure, private access to candidate information with strict confidentiality controls.
                </p>
              </div>
              
              <div className="bg-black/50 p-6 rounded-lg border border-gray-800 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Network</h3>
                <p className="text-gray-400">
                  Access candidates not available on public job boards or through traditional recruitment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
