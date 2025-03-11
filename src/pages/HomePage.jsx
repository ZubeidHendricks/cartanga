import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Subscription tier data
  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$199',
      period: '/month',
      description: 'Weekend-only access to economy cars',
      features: [
        'Access to economy cars',
        'Weekend-only usage (Fri-Sun)',
        'Basic insurance coverage',
        '100 miles per weekend included',
        'Basic maintenance included',
      ],
      color: 'bg-blue-500',
      isPopular: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$399',
      period: '/month',
      description: 'Weekly access to mid-range vehicles',
      features: [
        'Access to mid-range vehicles',
        '4 days per week usage',
        'Standard insurance coverage',
        '300 miles per week included',
        'Full maintenance included',
        'Roadside assistance',
      ],
      color: 'bg-purple-600',
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$799',
      period: '/month',
      description: 'Full-time access to luxury vehicles',
      features: [
        'Access to luxury vehicles',
        'Unlimited usage',
        'Premium insurance coverage',
        'Unlimited mileage',
        'Premium maintenance included',
        'Priority roadside assistance',
        'Vehicle delivery & pickup',
        'Option to switch vehicles monthly',
      ],
      color: 'bg-indigo-700',
      isPopular: false,
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Custom',
      period: '',
      description: 'Build your own subscription based on your needs',
      features: [
        'Customize your vehicle selection',
        'Flexible usage schedule',
        'Tailor your insurance coverage',
        'Set your own mileage limits',
        'Personalized maintenance plan',
        'Community crowdfunding options',
      ],
      color: 'bg-gray-800',
      isPopular: false,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Drive Your Dream Car Without Ownership</h1>
            <p className="text-xl mb-8">Join our community-powered car subscription service and enjoy flexible access to vehicles through crowdfunding.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition duration-300">
                Join Now
              </Link>
              <Link to="/how-it-works" className="bg-transparent border border-white hover:bg-white hover:text-indigo-700 px-6 py-3 rounded-lg font-medium transition duration-300">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Tiers */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Subscription Tier</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the plan that fits your lifestyle and budget. All tiers include insurance, maintenance, and the ability to participate in our community crowdfunding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 ${
                tier.isPopular ? 'ring-4 ring-purple-400' : ''
              }`}
            >
              <div className={`${tier.color} text-white p-6`}>
                {tier.isPopular && (
                  <span className="inline-block py-1 px-3 rounded-full bg-white text-purple-600 text-xs font-semibold mb-3">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold">{tier.price}</span>
                  <span className="ml-1 text-xl font-medium">{tier.period}</span>
                </div>
                <p className="mt-2 text-white text-opacity-90">{tier.description}</p>
              </div>

              <div className="bg-white p-6">
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    to={`/subscribe/${tier.id}`}
                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-3 text-center font-medium text-gray-700 hover:bg-gray-200 transition duration-300"
                  >
                    {tier.id === 'custom' ? 'Build Your Plan' : 'Select Plan'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crowdfunding Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Crowdfunding</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join forces with others to fund vehicles you want in our fleet. Contribute to campaigns and enjoy special perks when the vehicle is funded.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">How Crowdfunding Works</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">1</div>
                    <span>Browse active vehicle campaigns or propose a new one</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">2</div>
                    <span>Contribute any amount to your favorite campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">3</div>
                    <span>Earn rewards based on your contribution level</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">4</div>
                    <span>Once funded, the vehicle joins our fleet</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">5</div>
                    <span>Contributors get priority access and discounted rates</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    to="/crowdfunding"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
                  >
                    Explore Campaigns
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">Current Featured Campaign</h3>
                <div className="mb-6">
                  <p className="text-xl font-bold">Tesla Model 3</p>
                  <p className="text-white text-opacity-90">Help bring this electric vehicle to our fleet</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Funding Progress</span>
                    <span>67%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2.5">
                    <div className="bg-white h-2.5 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <p className="mb-4"><span className="font-bold">43</span> contributors</p>
                  <p className="mb-4"><span className="font-bold">$34,675</span> of $52,000 goal</p>
                  <p><span className="font-bold">18</span> days remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How CarTanga Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes accessing vehicles simple, affordable, and community-driven.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Join The Community</h3>
            <p className="text-gray-600">
              Sign up, choose your subscription tier, and become part of our car-sharing community.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Contribute & Fund</h3>
            <p className="text-gray-600">
              Support vehicle campaigns that interest you and enjoy contributor benefits.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Book & Drive</h3>
            <p className="text-gray-600">
              Reserve vehicles, pick up at convenient locations, and enjoy hassle-free driving.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Future of Car Access?</h2>
            <p className="text-xl mb-8">
              Experience the freedom of having access to vehicles without the hassles of ownership.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium text-lg transition duration-300">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;