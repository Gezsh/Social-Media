// import './App.css'
import {Routes,Route, Navigate} from 'react-router-dom'
import Profile from './components/profile/Profile'
import Register from './pages/Register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
//import axios from 'axios'

//import PersonIcon from '@mui/icons-material/Person';
function App() {

  // const token = window.localStorage.getItem('token');
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {user} =useContext(AuthContext)
  return (
    <>
      <Routes>
          <Route path="/" element={user ? <Home/> : <Register/>}/>
          <Route path="/login" element={user ? <Navigate to ='/'/> : <Login/>}/>
          <Route path="/register" element={user ? <Navigate to ='/'/> : <Register/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
   
    </>
  )
}

export default App