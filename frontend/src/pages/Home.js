import { Link } from 'react-router-dom'
import { FaCar, FaUsers, FaChartLine } from 'react-icons/fa'

function Home() {
  return (
    <div>
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CarTanga</h1>
          <p className="text-xl md:text-2xl mb-8">Car Subscription Crowdfunding Platform</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Subscribe to your dream car, join forces with others through crowdfunding, 
            and access vehicles on your terms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
              Join Today
            </Link>
            <Link to="/vehicles" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Explore Vehicles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Choose Your Subscription</h3>
              <p className="text-gray-600">
                Select from Basic, Standard, Premium, or Custom subscription tiers based on your needs and budget.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Join or Start a Campaign</h3>
              <p className="text-gray-600">
                Contribute to existing vehicle campaigns or start your own to bring your dream car to the platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Drive and Enjoy</h3>
              <p className="text-gray-600">
                Book your vehicle through our easy dashboard, pick it up, and enjoy your driving experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Subscription Tiers</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-200 p-4 text-center">
                <h3 className="text-xl font-bold">Basic</h3>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold mb-4 text-center">$99<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>Weekend-only access</li>
                  <li>Economy cars</li>
                  <li>Basic insurance</li>
                  <li>No maintenance fees</li>
                </ul>
                <Link to="/register" className="btn btn-primary w-full block text-center">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-200 p-4 text-center">
                <h3 className="text-xl font-bold">Standard</h3>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold mb-4 text-center">$199<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>Weekly access</li>
                  <li>Mid-range vehicles</li>
                  <li>Standard insurance</li>
                  <li>Basic maintenance included</li>
                </ul>
                <Link to="/register" className="btn btn-primary w-full block text-center">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden border-blue-600 shadow-lg">
              <div className="bg-blue-600 text-white p-4 text-center">
                <h3 className="text-xl font-bold">Premium</h3>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold mb-4 text-center">$399<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>Full-time access</li>
                  <li>Luxury vehicles</li>
                  <li>Premium insurance</li>
                  <li>All maintenance included</li>
                </ul>
                <Link to="/register" className="btn btn-primary w-full block text-center">
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-200 p-4 text-center">
                <h3 className="text-xl font-bold">Custom</h3>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold mb-4 text-center">$???<span className="text-sm text-gray-600">/month</span></p>
                <ul className="space-y-2 mb-6">
                  <li>Tailored access schedule</li>
                  <li>Choose your vehicle type</li>
                  <li>Customizable insurance</li>
                  <li>Flexible maintenance options</li>
                </ul>
                <Link to="/register" className="btn btn-primary w-full block text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
