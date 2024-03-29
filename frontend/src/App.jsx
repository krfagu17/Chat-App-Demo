

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import  { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'

function App() {
  const {userAuth} = useAuthContext()
  

  return (
    <div className="p-4 flex h-screen items-center justify-center">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={userAuth ? <Navigate to="/"/>:<Signup/> } />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
