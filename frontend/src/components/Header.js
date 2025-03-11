import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaCar, FaUsers, FaChartLine } from 'react-icons/fa'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='bg-blue-600 text-white'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <Link to='/' className='text-2xl font-bold'>CarTanga</Link>

          <nav>
            <ul className='flex space-x-6'>
              <li>
                <Link to='/vehicles' className='flex items-center hover:text-blue-200'>
                  <FaCar className='mr-1' /> Vehicles
                </Link>
              </li>
              <li>
                <Link to='/campaigns' className='flex items-center hover:text-blue-200'>
                  <FaChartLine className='mr-1' /> Campaigns
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to='/dashboard' className='flex items-center hover:text-blue-200'>
                      <FaUsers className='mr-1' /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to='/subscriptions' className='flex items-center hover:text-blue-200'>
                      <FaUsers className='mr-1' /> My Subscriptions
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <li>
                      <Link to='/admin' className='flex items-center hover:text-blue-200'>
                        <FaUsers className='mr-1' /> Admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={onLogout} className='flex items-center hover:text-blue-200'>
                      <FaSignOutAlt className='mr-1' /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/login' className='flex items-center hover:text-blue-200'>
                      <FaSignInAlt className='mr-1' /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to='/register' className='flex items-center hover:text-blue-200'>
                      <FaUser className='mr-1' /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
