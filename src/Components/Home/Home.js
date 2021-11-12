import React, { useEffect } from 'react';
import FeaturedCars from './FeaturedCars/FeaturedCars';
import Header from './Header/Header';
import Reviews from './Reviews/Reviews';
import Services from './Services/Services';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Nav />
            <Header />
            <FeaturedCars />
            <Services />
            <Reviews />
            <Footer />
        </>
    );
};

export default Home;