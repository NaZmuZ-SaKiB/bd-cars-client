import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import { Container, Grid, Skeleton } from '@mui/material';

// Local Imports
import './Cars.css';
import CarCard from '../CarCard/CarCard';
import { Box } from '@mui/system';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/cars`)
            .then(res => setCars(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Nav />
            <div className='cars'>
                <h2>ALL CARS</h2>
                {
                    !loading ?
                        <Container>
                            <Grid container spacing={3}>
                                {
                                    cars.map(car => <CarCard key={car._id} car={car} />)
                                }
                            </Grid>
                        </Container>

                        :
                        <Container>
                            <Grid container spacing={3}>
                                {
                                    Array(5).fill().map((x, index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Box sx={{ marginRight: 0.5, my: 5, mx: 'auto' }}>
                                                <Skeleton animation='wave' variant="rectangular" height={180} />
                                                <Box sx={{ pt: 0.5 }}>
                                                    <Skeleton animation='wave' />
                                                    <Skeleton animation='wave' width="60%" />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Container>
                }
            </div>
            <Footer />
        </>
    );
};

export default Cars;