import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCar, FaCalendarAlt, FaDollarSign, FaChartLine } from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { subscriptions, isLoading: subLoading } = useSelector((state) => state.subscriptions)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    // Here we would fetch the user's subscriptions and contributions data
    // This functionality will be implemented when we add the subscription slice
  }, [user, navigate, dispatch])

  if (subLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user && user.name}</h1>
        <p className="text-lg">Your CarTanga dashboard gives you access to your subscriptions, bookings, and contributions.</p>
      </section>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-blue-50">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Active Subscriptions</h3>
              <FaCar className="text-blue-500 text-xl" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <Link to="/subscriptions" className="text-blue-600 text-sm hover:underline inline-block mt-2">View details</Link>
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
              <FaCalendarAlt className="text-green-500 text-xl" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <Link to="/bookings" className="text-green-600 text-sm hover:underline inline-block mt-2">View details</Link>
          </div>
        </div>

        <div className="card bg-purple-50">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Total Spend</h3>
              <FaDollarSign className="text-purple-500 text-xl" />
            </div>
            <p className="text-3xl font-bold">$0</p>
            <span className="text-purple-600 text-sm inline-block mt-2">All Time</span>
          </div>
        </div>

        <div className="card bg-orange-50">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Campaign Contributions</h3>
              <FaChartLine className="text-orange-500 text-xl" />
            </div>
            <p className="text-3xl font-bold">0</p>
            <Link to="/campaigns" className="text-orange-600 text-sm hover:underline inline-block mt-2">View campaigns</Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Link to="/vehicles" className="btn btn-primary text-center">Browse Vehicles</Link>
              <Link to="/campaigns" className="btn btn-secondary text-center">Join a Campaign</Link>
              <Link to="/subscriptions/new" className="btn btn-success text-center">New Subscription</Link>
              <Link to="/profile" className="btn text-center bg-gray-200 hover:bg-gray-300 text-gray-800">Edit Profile</Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="mt-4 text-center py-6 text-gray-500">
              <p>No recent activity to display.</p>
              <p className="text-sm mt-2">Your recent subscriptions and contributions will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
