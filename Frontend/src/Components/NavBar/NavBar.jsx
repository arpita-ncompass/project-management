import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

import Logo from '../../Assets/Logo.png';

const NavBar = ({ isLoggedIn }) => {
    // const [showAddProject, setShowAddProject] = useState(false);

    // const toggleContent = () => {
    //     setShowAddProject(!showAddProject);
    // };
    // onClick={toggleContent}

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="buttons">
                {isLoggedIn ? (
                    <Link to='/addProject' className='project-btn'>
                        Add New Project
                    </Link>
                ) : (
                    <Link to="/signup" className="signup-btn">
                        Signup
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
