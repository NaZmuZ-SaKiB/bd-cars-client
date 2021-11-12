import React from 'react';
import './Loading.css';
import Logo from '../../Images/logo-red.png';

const Loading = () => {
    return (
        <div className='loading-container'>
            <img src={Logo} alt="bd cars" className="logo" />
            <div className="loading"></div>
        </div>
    );
};

export default Loading;