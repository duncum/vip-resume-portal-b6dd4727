
import React from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import LandingPage from "./pages/Landing";
import AgreementPage from "./pages/Agreement";
import CandidatesPage from "./pages/Candidates";
import CandidateDetailsPage from "./pages/CandidateDetails";
import NotFoundPage from "./pages/NotFound";

// Create a query client for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const hasAgreed = localStorage.getItem("agreement-accepted") === "true";
  
  if (!hasAgreed) {
    return <Navigate to="/agreement" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/agreement" element={<AgreementPage />} />
          
          {/* Protected routes */}
          <Route path="/candidates" element={
            <ProtectedRoute>
              <CandidatesPage />
            </ProtectedRoute>
          } />
          <Route path="/candidates/:id" element={
            <ProtectedRoute>
              <CandidateDetailsPage />
            </ProtectedRoute>
          } />
          
          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
