
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Agreement from './pages/Agreement';
import Candidates from './pages/Candidates';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasAgreed = localStorage.getItem('network-agreement') === 'true';
  
  return hasAgreed ? <>{children}</> : <Navigate to="/agreement" replace />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agreement" element={<Agreement />} />
        <Route 
          path="/candidates" 
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/agreement" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
