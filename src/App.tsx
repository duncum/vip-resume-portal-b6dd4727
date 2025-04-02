
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import CandidateView from "./pages/CandidateView";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Agreement from "./pages/Agreement";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasAgreed = localStorage.getItem("contract-agreed") === "true";
  
  if (!hasAgreed) {
    return <Navigate to="/agreement" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page as the main entry point */}
          <Route path="/" element={<Landing />} />
          
          {/* Agreement route */}
          <Route path="/agreement" element={<Agreement />} />
          
          {/* Protected routes */}
          <Route 
            path="/candidates" 
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/candidate/:id" 
            element={
              <ProtectedRoute>
                <CandidateView />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
