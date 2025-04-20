import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () =>{
    let isAuthorized = sessionStorage.getItem('token')
    return isAuthorized ? <Outlet/> : <Navigate to={'/sign-in'}/>
}

export default ProtectedRoute