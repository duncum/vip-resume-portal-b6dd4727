
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFoundState = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 md:py-12 px-4 flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Candidate Not Found</h2>
        <p className="text-grey-600 mb-6 text-center text-sm md:text-base">The candidate you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/candidates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundState;
