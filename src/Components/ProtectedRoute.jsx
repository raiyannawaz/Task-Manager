import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () =>{
    let isAuthorized = sessionStorage.getItem('token')
    return isAuthorized ? <Outlet/> : <Navigate to={'/log-in'}/>
}

export default ProtectedRoute