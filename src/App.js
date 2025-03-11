import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <main className='container mx-auto px-4 py-6 flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
