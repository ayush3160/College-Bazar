import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { setAuthProps } from "./context/authSlice";
import { useState } from "react";
import jwt_decode from 'jwt-decode'
import Chat from "./pages/Chat";

export default function App() {

  const dispatch = useDispatch();

  const [login,setLogin] = useState(0)

  const[isAdmin,setAdmin] = useState(false)

  const handleLogin = () => {
    setLogin(login+1)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if(token){
      const user = jwt_decode(token);

      if(user.name == 'admin'){
        setAdmin(true)
      }else {
        const props = {
          name : user.name,
          token : token,
          userId : user.id,
          loggedIn : true 
        }
        
        dispatch(setAuthProps(props))
      }
    }
  })

  if(!isAdmin){
    return (
      <Router>
        <Navbar login = {login}/>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path="/login" element={<Login handleLogin = {handleLogin}/>}/>
          {/* <Route path="/register" element={<Register />}/> */}
          <Route path="/home" element={<Home />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/chat/:id" element={<Chat />}/>
        </Routes>
      </Router>
    );
  }else{
    return(
      <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
    )
    
  }  
  
}
