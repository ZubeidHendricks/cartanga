import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProposeCampaignPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    vehicleModel: '',
    vehicleType: '',
    estimatedCost: '',
    description: '',
    justification: '',
    name: '',
    email: '',
    phone: '',
    agreeToTerms: false,
  });

  const vehicleTypes = [
    { value: '', label: 'Select Vehicle Type' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'suv', label: 'SUV' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'truck', label: 'Truck' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'sports', label: 'Sports' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      vehicleModel: '',
      vehicleType: '',
      estimatedCost: '',
      description: '',
      justification: '',
      name: '',
      email: '',
      phone: '',
      agreeToTerms: false,
    });
    
    // Redirect after a delay
    setTimeout(() => {
      navigate('/crowdfunding');
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Propose a Vehicle Campaign</h1>
            <p className="text-xl opacity-90">
              Suggest a vehicle you'd like to see added to our fleet. If approved, we'll launch a
              crowdfunding campaign to make it happen.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {submitted ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank You for Your Proposal!</h2>
              <p className="text-gray-600 mb-6">
                We've received your vehicle campaign proposal and our team will review it shortly.
                If approved, we'll contact you before launching the campaign.
              </p>
              <p className="text-gray-600">
                Redirecting to campaigns page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Vehicle Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="vehicleModel" className="block text-gray-700 font-medium mb-2">Vehicle Make & Model*</label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      placeholder="e.g. Tesla Model 3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">Vehicle Type*</label>
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      {vehicleTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="estimatedCost" className="block text-gray-700 font-medium mb-2">Estimated Cost ($)*</label>
                    <input
                      type="number"
                      id="estimatedCost"
                      name="estimatedCost"
                      min="1000"
                      value={formData.estimatedCost}
                      onChange={handleChange}
                      placeholder="e.g. 50000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Vehicle Description*</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe the vehicle and its key features"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="justification" className="block text-gray-700 font-medium mb-2">Why should we add this to our fleet?*</label>
                  <textarea
                    id="justification"
                    name="justification"
                    value={formData.justification}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Explain why this vehicle would be a good addition to our fleet and appeal to our members"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Your Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-gray-700">
                    I understand that this is just a proposal and CarTanga will review my submission. If approved, a campaign will be created and I'll be notified.*
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Link to="/crowdfunding" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  <span className="mr-1">←</span> Back to Campaigns
                </Link>
                
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposeCampaignPage;