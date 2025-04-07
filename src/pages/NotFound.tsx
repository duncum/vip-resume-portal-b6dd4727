
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if this is a candidate route that might have ID issues
  const isCandidateRoute = location.pathname.startsWith('/candidate/');
  
  // Extract the id part if this is a candidate route
  let candidateId = "";
  let hasDataInUrl = false;
  
  if (isCandidateRoute) {
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2) {
      // Extract just the ID part before any comma
      const fullPath = pathParts[2] || "";
      candidateId = fullPath.split(',')[0];
      
      // Check if URL contains full data instead of just ID
      hasDataInUrl = fullPath.includes(',') || fullPath.length > 50;
      
      // Auto-redirect if we have a problematic URL but have extracted a valid ID
      if (hasDataInUrl && candidateId && candidateId.length < 50) {
        useEffect(() => {
          console.log("Redirecting to clean URL with just ID:", candidateId);
          navigate(`/candidate/${candidateId}`, { replace: true });
        }, []);
      }
    }
  }

  useEffect(() => {
    // Log the error for debugging
    if (isCandidateRoute) {
      console.error(
        "404 Error: Candidate not found with path:",
        location.pathname
      );
      
      if (hasDataInUrl) {
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
  }, [location.pathname, isCandidateRoute, candidateId, hasDataInUrl]);

  // If we're redirecting, show a loading state
  if (hasDataInUrl && candidateId && candidateId.length < 50) {
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-gold border-grey-700 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Fixing URL format, please wait...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              {hasDataInUrl && (
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
