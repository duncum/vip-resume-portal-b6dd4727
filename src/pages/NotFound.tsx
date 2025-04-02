
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-grey-400 mb-6">Oops! Page not found</p>
        <Link to="/" className="text-gold hover:text-gold-light underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
