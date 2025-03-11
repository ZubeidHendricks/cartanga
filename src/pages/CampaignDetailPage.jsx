import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contributionAmount, setContributionAmount] = useState(100);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Sample data - in a real app, this would be fetched from an API
  const campaignData = [
    {
      id: '1',
      title: 'Tesla Model 3',
      description: 'Help bring this electric vehicle to our fleet. The Tesla Model 3 is perfect for environmentally conscious drivers looking for range and performance.',
      longDescription: 'The Tesla Model 3 is a compact executive sedan that is battery-powered and produced by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range versions deliver 353 miles (568 km). The Model 3 carries full self-driving hardware, with periodic software updates adding new features and functionality. Adding this to our fleet will provide members with a premium electric vehicle experience that is both environmentally friendly and cutting-edge in terms of technology and performance.',
      image: 'https://via.placeholder.com/1200x600',
      goalAmount: 52000,
      currentAmount: 34675,
      contributors: 43,
      daysLeft: 18,
      category: 'Electric',
      progress: 67,
      specs: [
        { name: 'Range', value: '263 miles' },
        { name: 'Top Speed', value: '140 mph' },
        { name: '0-60 mph', value: '5.3 seconds' },
        { name: 'Seating', value: '5 adults' },
        { name: 'Drive', value: 'Rear-Wheel Drive' },
        { name: 'Charging', value: 'Up to 170 miles in 30 minutes at Supercharger' },
      ],
      rewards: [
        { amount: 50, description: 'Priority booking within your tier for 1 month' },
        { amount: 100, description: 'Priority booking within your tier for 3 months + 10% off your first rental' },
        { amount: 250, description: '6 months priority booking + 15% off first rental + free premium interior cleaning' },
        { amount: 500, description: '1 year priority booking + 20% off first rental + free premium interior cleaning + commemorative contributor keychain' },
        { amount: 1000, description: 'All previous rewards + free weekend rental (up to 3 days) + your name added to contributor plaque in the vehicle' },
      ],
      updates: [
        {
          date: '2025-03-01',
          title: 'Campaign Launched',
          content: 'We\'re excited to announce the launch of our Tesla Model 3 campaign! Help us bring this amazing electric vehicle to our fleet.',
        },
        {
          date: '2025-03-05',
          title: 'First Milestone Reached',
          content: 'We\'ve reached 25% of our funding goal in just 5 days! Thank you to all our early contributors.',
        },
        {
          date: '2025-03-10',
          title: 'Vehicle Specs Confirmed',
          content: 'We\'ve confirmed the final specification for the Tesla Model 3 we\'ll be adding to our fleet. It will be the Long Range AWD version in Midnight Silver with 19" Sport Wheels.',
        },
      ],
    },
    // Add more campaign data as needed
  ];

  useEffect(() => {
    // Simulate fetching campaign data from an API
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const foundCampaign = campaignData.find((c) => c.id === id);
        setCampaign(foundCampaign || null);
        setLoading(false);
      }, 500); // Simulate network delay
    };

    fetchData();
  }, [id]);

  const handleContribution = (e) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log(`Contributing $${contributionAmount} to campaign ${id}`);
    setShowSuccessMessage(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-300 rounded mb-8"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Campaign Not Found</h1>
        <p className="text-gray-600 mb-8">The campaign you're looking for does not exist.</p>
        <Link to="/crowdfunding" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
          Back to Campaigns
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{campaign.title}</h1>
              <span className="bg-white text-indigo-700 py-1 px-4 rounded-full font-medium mt-2 md:mt-0 inline-block">
                {campaign.category}
              </span>
            </div>
            <p className="text-xl opacity-90 mb-6">{campaign.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/crowdfunding" className="bg-transparent border border-white hover:bg-white hover:text-indigo-700 px-6 py-2 rounded-lg font-medium transition duration-300">
                Back to Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-auto object-cover"
              />
              
              {/* Campaign Overview */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Campaign</h2>
                <p className="text-gray-700 mb-6">{campaign.longDescription}</p>
                
                {/* Vehicle Specs */}
                <h3 className="text-xl font-bold mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {campaign.specs.map((spec, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm">{spec.name}</p>
                      <p className="font-bold">{spec.value}</p>
                    </div>
                  ))}
                </div>
                
                {/* Updates */}
                <h3 className="text-xl font-bold mb-4">Campaign Updates</h3>
                <div className="space-y-4 mb-6">
                  {campaign.updates.map((update, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{update.title}</h4>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <p className="text-gray-700">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div>
            {/* Funding Progress Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Funding Progress</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Progress</span>
                    <span className="font-bold">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Raised</p>
                    <p className="font-bold">${campaign.currentAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Goal</p>
                    <p className="font-bold">${campaign.goalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Contributors</p>
                    <p className="font-bold">{campaign.contributors}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Days Left</p>
                    <p className="font-bold">{campaign.daysLeft}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contribution Form */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Contribute Now</h3>
                
                {showSuccessMessage ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Thanks for your contribution! You'll receive an email with details shortly.</span>
                  </div>
                ) : null}
                
                <form onSubmit={handleContribution}>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Contribution Amount ($)</label>
                    <input
                      type="number"
                      id="amount"
                      min="10"
                      step="5"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(parseInt(e.target.value, 10))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300"
                  >
                    Contribute
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    You won't be charged until the campaign reaches its goal.
                  </p>
                </form>
              </div>
            </div>
            
            {/* Rewards */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Contributor Rewards</h3>
                
                <div className="space-y-4">
                  {campaign.rewards.map((reward, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg p-4 ${contributionAmount >= reward.amount ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">${reward.amount}+</span>
                        {contributionAmount >= reward.amount && (
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">UNLOCKED</span>
                        )}
                      </div>
                      <p className="text-gray-700">{reward.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;