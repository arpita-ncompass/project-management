import React from 'react';
import Login from '../Auth/Login'; 
import './HomePage.css'

import StaticImage from '../../Assets/StaticImage.jpg'

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="left-side">
                <img src={StaticImage} />
            </div>
            <div className="right-side">
                <Login />
            </div>
        </div>
    );
}

export default HomePage;
