
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();
  
  // Check if this is a candidate route that might have ID issues
  const isCandidateRoute = location.pathname.startsWith('/candidate/');
  
  // Extract the id part if this is a candidate route
  let candidateId = "";
  if (isCandidateRoute) {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      candidateId = pathParts[2].split(',')[0];
    }
  }

  useEffect(() => {
    // Log the error for debugging
    if (isCandidateRoute) {
      console.error(
        "404 Error: Candidate not found with path:",
        location.pathname
      );
      
      if (location.pathname.length > 100) {
        console.error(
          "Path appears to contain full data instead of just ID. Length:",
          location.pathname.length,
          "Clean ID part would be:",
          candidateId
        );
      }
    } else {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname, isCandidateRoute, candidateId]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          {isCandidateRoute ? (
            <>
              <p className="text-xl text-grey-400 mb-6">Candidate Not Found</p>
              <p className="text-grey-500 mb-8">
                The candidate you're looking for doesn't exist or has been removed.
              </p>
              {location.pathname.length > 100 && (
                <p className="text-amber-500 mb-6 text-sm">
                  URL contains too much data. Try going back to candidates list and selecting again.
                </p>
              )}
            </>
          ) : (
            <p className="text-xl text-grey-400 mb-6">Oops! Page not found</p>
          )}
          
          <Button asChild variant="default">
            <Link to={isCandidateRoute ? "/candidates" : "/"} className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isCandidateRoute ? "Back to Candidates" : "Return to Home"}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
