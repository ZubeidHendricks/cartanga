import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'

const AdminRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <Spinner />
  }

  return user && user.isAdmin ? <Outlet /> : <Navigate to='/login' />
}

export default AdminRoute
