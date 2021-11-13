import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Material UI
import CallIcon from '@mui/icons-material/Call';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Local imports
import Logo from '../../Images/logo-white.png';
import useAuth from '../../Hooks/useAuth';
import './Nav.css';

const Nav = () => {
    const [hideMenu, setHideMenu] = useState(true);
    const { user, logOut } = useAuth();

    return (
        <div className="nav-container">
            <nav className="nav">
                <Link to='/home' >
                    <img src={Logo} alt="Bd cars" className="nav__brand" />
                </Link>
                <div className={`nav__phone ${hideMenu ? 'hide' : ''}`}>
                    <CallIcon sx={{ mr: 1 }} /> +88 0177 7677 877
                </div>
                <div onClick={() => setHideMenu(true)} className={`nav__links ${hideMenu ? 'hide' : ''}`}>
                    <NavLink to='/home' >Home</NavLink>
                    <NavLink to='/cars' >All Cars</NavLink>
                    {user && <>
                        <NavLink to='/dashboard' >Dashboard</NavLink>
                    </>}
                    {user ? <a onClick={() => logOut()}>Log out</a> : <NavLink to='/login' >Login</NavLink>}
                </div>
            </nav>
            <div onClick={() => setHideMenu(!hideMenu)} className="nav__menu-toggle">
                <MenuIcon sx={{ color: 'white' }} />
            </div>
        </div>
    );
};

export default Nav;