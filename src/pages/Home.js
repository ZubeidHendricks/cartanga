import React from 'react'

function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Welcome to CarTanga</h1>
      <p className="text-xl text-center mb-12">Car Subscription Crowdfunding Platform</p>
      
      <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">1</span>
            <div>
              <h3 className="font-medium">Car Subscriptions</h3>
              <p className="text-gray-600">Choose from various subscription tiers for different vehicle types.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">2</span>
            <div>
              <h3 className="font-medium">Crowdfunding Campaigns</h3>
              <p className="text-gray-600">Pool resources with others to make premium vehicles accessible.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">3</span>
            <div>
              <h3 className="font-medium">Community Features</h3>
              <p className="text-gray-600">Connect with other car enthusiasts and share resources.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
