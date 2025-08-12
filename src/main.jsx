import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import '../global.css';
import './styles/color-scheme-override.css';
import './styles/mobile-optimizations.css';

// Performance optimization: Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical images - using relative paths for production
  const criticalImages = [
    '/src/assets/images/hero/hero_image.jpeg',
    '/src/assets/images/logos/success-rate.png',
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
preloadCriticalResources();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);