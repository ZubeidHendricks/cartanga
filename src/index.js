import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Welcome to CarTanga</h1>
    <p className="text-lg text-center mb-4">Car Subscription Crowdfunding Platform</p>
    <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto shadow">
      <p>Our platform allows you to:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Subscribe to different car tiers</li>
        <li>Join crowdfunding campaigns for vehicles</li>
        <li>Share and manage vehicle access</li>
      </ul>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
