import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Material UI
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

// Local Imports
import BG1 from '../../../Images/banner/car-1.jpg';
import BG2 from '../../../Images/banner/car-2.jpg';
import BG3 from '../../../Images/banner/car-3.jpg';
import './Header.css';

const Header = () => {
    return (
        <div className="header-container">
            <Carousel infiniteLoop interval={5000} transitionTime={1000} autoPlay showThumbs={false} showArrows={false} showStatus={false}>

                <div className="slide">
                    <img src={BG1} alt='Background 1' />
                    <div className="content">
                        <h1>Welcome to <span>BD cars</span> place</h1>
                        <Link to="/cars" className="header-btn"><span style={{ marginRight: '10px' }}>Explore Now</span> <DoubleArrowIcon /></Link>
                    </div>
                </div>
                <div className="slide">
                    <img src={BG2} alt='Background 2' />
                    <div className="content">
                        <h1>Find your <span>dream</span> car</h1>
                        <Link to="/cars" className="header-btn"><span style={{ marginRight: '10px' }}>Explore Now</span> <DoubleArrowIcon /></Link>
                    </div>

                </div>
                <div className="slide">
                    <img src={BG3} alt='Background 3' />
                    <div className="content">
                        <h1>Best place to <span>buy</span> cars</h1>
                        <Link to="/cars" className="header-btn"><span style={{ marginRight: '10px' }}>Explore Now</span> <DoubleArrowIcon /></Link>
                    </div>
                </div>


            </Carousel>
        </div>
    );
};

export default Header;