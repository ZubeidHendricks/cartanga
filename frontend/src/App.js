import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import VehicleDetails from './pages/VehicleDetails'
import Subscriptions from './pages/Subscriptions'
import Campaigns from './pages/Campaigns'
import CampaignDetails from './pages/CampaignDetails'
import AdminPanel from './pages/AdminPanel'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='container mx-auto px-4 py-6 flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/vehicles' element={<Vehicles />} />
              <Route path='/vehicles/:id' element={<VehicleDetails />} />
              <Route path='/campaigns' element={<Campaigns />} />
              <Route path='/campaigns/:id' element={<CampaignDetails />} />
              
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
              </Route>
              
              <Route path='/subscriptions' element={<PrivateRoute />}>
                <Route path='/subscriptions' element={<Subscriptions />} />
              </Route>

              <Route path='/admin' element={<AdminRoute />}>
                <Route path='/admin' element={<AdminPanel />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
