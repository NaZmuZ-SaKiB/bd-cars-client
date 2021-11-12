import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import { Container, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';

// Local Imports
import './Footer.css';
import Logo from '../../Images/logo-white.png';


const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <img src={Logo} alt="bd cars" className='logo' />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} >
                        <div className="address-card">
                            <div className="title">Gulshan Branch</div>
                            <div className="address">Block- D, House- 88 Rd No 13A, Dhaka 1213</div>
                            <div className="phone"><CallIcon sx={{ mr: 2 }} />01731-228000</div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <div className="address-card">
                            <div className="title">Uttara Branch</div>
                            <div className="address">House-9, Sector-b, 12 No, Uttara, Dhaka 1230</div>
                            <div className="phone"><CallIcon sx={{ mr: 2 }} />01718-959595</div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <div className="address-card">
                            <div className="title">Mirpur Branch</div>
                            <div className="address">222 Bir Uttam Mir Shawkat Sarak, Dhaka 1208</div>
                            <div className="phone"><CallIcon sx={{ mr: 2 }} />01971-181189</div>
                        </div>
                    </Grid>
                </Grid>
                <div className="links">
                    <p className="link" onClick={() => window.scrollTo(0, 0)}>Back to top</p>
                    <p className="link">About us</p>
                    <p className="link">Blog</p>
                    <p className="link">Terms & Conditions</p>
                    <p className="link">Privacy policy</p>
                    <p className="link">Refund policy</p>
                </div>
                <p className="copyright">&copy; 2021 Nazmuz Sakib | All Rights Reserved</p>
            </Container>
        </div>
    );
};

export default Footer;