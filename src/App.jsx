import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CrowdfundingPage from './pages/CrowdfundingPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import ProposeCampaignPage from './pages/ProposeCampaignPage';

// Placeholder pages for now
const SubscriptionTiers = () => <div className="py-16 text-center">Subscription Tiers Page</div>;
const HowItWorks = () => <div className="py-16 text-center">How It Works Page</div>;
const AboutUs = () => <div className="py-16 text-center">About Us Page</div>;
const Faq = () => <div className="py-16 text-center">FAQ Page</div>;
const Contact = () => <div className="py-16 text-center">Contact Page</div>;
const Terms = () => <div className="py-16 text-center">Terms of Service Page</div>;
const Privacy = () => <div className="py-16 text-center">Privacy Policy Page</div>;
const Login = () => <div className="py-16 text-center">Login Page</div>;
const Signup = () => <div className="py-16 text-center">Signup Page</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/subscription-tiers" element={<SubscriptionTiers />} />
            <Route path="/crowdfunding" element={<CrowdfundingPage />} />
            <Route path="/crowdfunding/propose" element={<ProposeCampaignPage />} />
            <Route path="/crowdfunding/:id" element={<CampaignDetailPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;