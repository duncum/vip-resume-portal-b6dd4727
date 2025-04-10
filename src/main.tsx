
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set base styles for iframe embedding
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'auto';

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
