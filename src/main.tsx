
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set base styles for iframe embedding
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'auto';
document.body.style.backgroundColor = '#000';
document.body.style.color = '#fff';

createRoot(document.getElementById("root")!).render(<App />);
