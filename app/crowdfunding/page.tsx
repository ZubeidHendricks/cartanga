"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CrowdfundingPage() {
  // Sample campaigns data
  const [campaigns] = useState([
    {
      id: 1,
      title: 'Tesla Model 3',
      description: 'Help bring this electric vehicle to our fleet. The Tesla Model 3 is perfect for environmentally conscious drivers looking for range and performance.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 52000,
      currentAmount: 34675,
      contributors: 43,
      daysLeft: 18,
      category: 'Electric',
      featured: true,
      progress: 67,
    },
    {
      id: 2,
      title: 'BMW X5',
      description: 'Luxury SUV with ample space and power. Perfect for weekend getaways and family trips with all the premium features you expect.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 65000,
      currentAmount: 29250,
      contributors: 31,
      daysLeft: 24,
      category: 'SUV',
      featured: false,
      progress: 45,
    },
    {
      id: 3,
      title: 'Toyota Corolla Hybrid',
      description: 'Economical and reliable hybrid sedan. Great fuel economy and low maintenance costs make this an ideal everyday vehicle.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 25000,
      currentAmount: 21250,
      contributors: 58,
      daysLeft: 10,
      category: 'Hybrid',
      featured: false,
      progress: 85,
    },
    {
      id: 4,
      title: 'Ford F-150',
      description: 'America\'s favorite pickup truck. Powerful, versatile, and perfect for both work and play with impressive towing capacity.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 45000,
      currentAmount: 15750,
      contributors: 25,
      daysLeft: 31,
      category: 'Truck',
      featured: false,
      progress: 35,
    },
    {
      id: 5,
      title: 'Audi A4',
      description: 'German engineering meets luxury sedan. Experience the perfect blend of performance, technology, and comfort.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 48000,
      currentAmount: 12000,
      contributors: 18,
      daysLeft: 45,
      category: 'Luxury',
      featured: false,
      progress: 25,
    },
    {
      id: 6,
      title: 'Porsche 911',
      description: 'Iconic sports car for weekend warriors. Feel the thrill of one of the most respected performance vehicles on the road.',
      image: 'https://via.placeholder.com/600x400',
      goalAmount: 85000,
      currentAmount: 29750,
      contributors: 22,
      daysLeft: 37,
      category: 'Sports',
      featured: false,
      progress: 35,
    },
  ]);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('progress');

  const categories = ['All', 'Electric', 'Hybrid', 'SUV', 'Truck', 'Luxury', 'Sports'];

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter((campaign) => categoryFilter === 'All' || campaign.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (sortBy === 'newest') {
        return a.daysLeft - b.daysLeft;
      } else if (sortBy === 'goal') {
        return b.goalAmount - a.goalAmount;
      }
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Fund Vehicles You Want to Drive</h1>
            <p className="text-xl mb-8">
              Join our community in funding new vehicles for our fleet. Contributors get priority access and special rates.
            </p>
            <Link
              href="/crowdfunding/propose"
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Propose a New Vehicle
            </Link>
          </div>
        </div>
      </div>

      {/* Filter & Sort Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-xl font-bold mb-4">Browse Campaigns</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoryFilter === category ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Sort by:</span>
              <select
                className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="progress">Funding Progress</option>
                <option value="newest">Newest First</option>
                <option value="goal">Funding Goal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Campaign */}
        {filteredCampaigns.filter(campaign => campaign.featured).map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold inline-block mb-4">
                  FEATURED CAMPAIGN
                </div>
                <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
                <p className="text-gray-600 mb-6">{campaign.description}</p>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Funding Progress</span>
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
                
                <Link
                  href={`/crowdfunding/${campaign.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition duration-300"
                >
                  Contribute Now
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.filter(campaign => !campaign.featured).map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-105">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {campaign.category}
                  </span>
                  <span className="text-gray-500 text-sm">{campaign.daysLeft} days left</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 text-sm">${campaign.currentAmount.toLocaleString()} raised</span>
                    <span className="text-gray-700 text-sm">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span>{campaign.contributors} contributors</span>
                  <span>Goal: ${campaign.goalAmount.toLocaleString()}</span>
                </div>
                
                <Link
                  href={`/crowdfunding/${campaign.id}`}
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-lg font-medium transition duration-300"
                >
                  View Campaign
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Contribute Section */}
      <div className="bg-gray-100 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Contribute</h2>
            <p className="text-gray-600">
              Contributing to a campaign is easy and comes with exclusive benefits for our subscribers and community members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Choose a Campaign</h3>
              <p className="text-gray-600">
                Browse active campaigns and select one that interests you. You can filter by category or sort by progress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Select Contribution</h3>
              <p className="text-gray-600">
                Choose how much you want to contribute. Different levels offer different perks and benefits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Enjoy the Benefits</h3>
              <p className="text-gray-600">
                Once the campaign is funded, you'll receive priority access, discounted rates, and other exclusive perks.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Contributor Benefits</h3>
            <div className="inline-flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full shadow-sm text-gray-700 font-medium">
                <span className="text-indigo-600 mr-2">✓</span> Priority Booking
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm text-gray-700 font-medium">
                <span className="text-indigo-600 mr-2">✓</span> Discounted Rates
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm text-gray-700 font-medium">
                <span className="text-indigo-600 mr-2">✓</span> Extended Mileage
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm text-gray-700 font-medium">
                <span className="text-indigo-600 mr-2">✓</span> Complimentary Upgrades
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-sm text-gray-700 font-medium">
                <span className="text-indigo-600 mr-2">✓</span> Special Events Access
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">What happens if a campaign doesn't reach its goal?</h3>
              <p className="text-gray-600">
                If a campaign doesn't reach its funding goal within the specified timeframe, all contributions are returned to the contributors with no fees or charges.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">How are contributor benefits determined?</h3>
              <p className="text-gray-600">
                Benefits are tiered based on your contribution amount. Higher contributions unlock more exclusive benefits and longer priority access periods.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Can I contribute to multiple campaigns?</h3>
              <p className="text-gray-600">
                Yes! You can contribute to as many campaigns as you'd like, and you'll receive the corresponding benefits for each successful campaign you support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">How do I propose a new vehicle campaign?</h3>
              <p className="text-gray-600">
                Click the "Propose a New Vehicle" button and fill out the form with details about the vehicle you'd like to see added to our fleet. Our team will review submissions and launch approved campaigns.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/faq" className="text-indigo-600 hover:text-indigo-800 font-medium">
              View all FAQs <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}