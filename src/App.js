import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import ContextState from './ContextAPI/ContextState'
import ProtectedRoute from './Components/ProtectedRoute';
import Spinner from './Components/Spinner';
import Alert from './Components/Alert';
import Confirm from './Components/Confirm';

console.log(process.env.REACT_APP_API_URL, 'Not showing at all')
function App() {
  return (
    <ContextState>
      <Router>
        <Navbar />
        <Spinner/>
        <Alert/>
        <Confirm/>
        <Routes>
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/' element={<Navigate to={'/dashboard'}/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ContextState>
  );
}

export default App;
