import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiResponse from "../../Utils/ApiResponse";

import './Auth.css'

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        name: "", email: "", password: "" 
    })

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
          ...userDetails,
          [name]: value,
        });
    };

    const signUp = async () => {
        try {
            const response = await ApiResponse("post", "signup", null, userDetails)
            // setDataToLocalStorage("token", response.data);

            if(response) {
                alert("User created successfully")
                navigate("/")
            }
        } catch (error) {
            if(error instanceof Error) alert("Couldn't create User")
        }
    };

    return(
        <>
            <div className="login-container">
                <form className="form" autoComplete="on">
                    <div className="form-input-container">
                        <input label="text" placeholder="Enter your name" name="name" value={userDetails.name} required onChange={handleInputChange} />
                        <input type="email" placeholder="Enter your email" name="email" value={userDetails.email} required onChange={handleInputChange} />
                        <input type="password" placeholder="Enter your password" name="password" value={userDetails.password} required onChange={handleInputChange} />
                    </div>

                    <div className="submit-button" onClick={signUp}>
                        <button className="submit-btn">Sign Up</button>
                        <NavLink to="/" ></NavLink>
                    </div>

                    {/* <div className="form-login-container">
                        <NavLink to="/login" className="form-login-link">Already have an account? Login</NavLink>
                    </div> */}
                </form>
            </div>
        </>
    )
}

export default Signup;