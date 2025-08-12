import React from 'react';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="loading-spinner-container">
    <div className="loading-spinner" />
    <span className="loading-spinner-label">{label}</span>
  </div>
);

export default LoadingSpinner;
