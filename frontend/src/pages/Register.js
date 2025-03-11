import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    drivingLicense: ''
  })

  const { name, email, password, password2, phone, drivingLicense } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        phone,
        drivingLicense
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='max-w-md mx-auto mt-10'>
      <div className='card'>
        <div className='card-body'>
          <h1 className='card-title flex items-center gap-2'>
            <FaUser /> Register
          </h1>
          <p className='mb-4 text-gray-600'>Create your CarTanga account</p>

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='tel'
                className='form-control'
                id='phone'
                name='phone'
                value={phone}
                placeholder='Phone number (optional)'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='drivingLicense'
                name='drivingLicense'
                value={drivingLicense}
                placeholder='Driving license number (optional)'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary w-full'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
