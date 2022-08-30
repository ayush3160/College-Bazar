import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuthProps } from "../context/authSlice";


export default function Navbar(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  var [log, setLog] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      if (!user) {
        localStorage.removeItem("token");
      } else {
        const login = document.getElementById("login");
        // const register = document.getElementById("register");
        login.style.display = "none";
        // register.style.display = "none";
        const logout = document.getElementById("logout");
        logout.style.display = "block";
      }
    } else {
      const logout = document.getElementById("logout");
      logout.style.display = "none";
      const login = document.getElementById("login");
      // const register = document.getElementById("register");
      login.style.display = "block";
      // register.style.display = "block";
    }
  }, [log,props.login]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    const props = {
      name : '',
      token : '',
      userId : '',
      loggedIn : false 
    }
    
    dispatch(setAuthProps(props))

    setLog(1);
    navigate("/");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link
        class="navbar-brand"
        to="/"
        style={{ fontSize: "40px",color : "rgba(25, 4, 100)",fontWeight : "bold" }}
      >
        College<span style={{ color: "red" }}>Bazar</span>
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto mx-auto">
          <li class="nav-item active">
            <Link class="nav-link text-dark mx-3" style={{fontSize : "20px"}} to="/home">
              Home
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-dark mx-3" style={{fontSize : "20px"}} to="/dashboard">
              MyDashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-dark mx-3" style={{fontSize : "20px"}} to="/chat/0">
              Chat
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link text-dark mx-3" style={{fontSize : "20px"}} to="/login" id="login">
              Login
            </Link>
          </li>
          <li class="nav-item">
            <button
              class="nav-link text-dark mx-3 btn btn-danger my-0"
              style={{ display: "none" }}
              id="logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
          {/* <li class="nav-item">
            <Link class="nav-link text-dark mx-3" id="register" style={{fontSize : "20px"}} to="/register">
              Register
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
