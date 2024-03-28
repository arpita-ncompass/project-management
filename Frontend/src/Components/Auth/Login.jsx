import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ApiResponse from "../../Utils/ApiResponse";

import "./Auth.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const LogIn = async () => {
    try {
      const response = await ApiResponse("post", "login", null, userDetails);
      const token = response.data.token;
      console.log(token);

      if (token) {
        localStorage.setItem("token", token);
        alert("Welcome User!");
        navigate("/getProjects");
      }
    } catch (error) {
      if (error instanceof Error) alert("Login unsuccessful");
    }
  };

  return (
    <div className="login-container">
      <form className="form">
        <div className="form-input-container" autoComplete="on">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="submit-button" onClick={LogIn}>
            <button className="submit-btn">
                Log In
            </button>
        </div>

        <div className="form-signup-container">
          <NavLink to="/signup" className="form-signup-link">
            Don't have an account? Create an account
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
