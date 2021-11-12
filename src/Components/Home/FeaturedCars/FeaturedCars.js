import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// Local Imports
import './FeaturedCars.css';
import CarCard from '../../CarCard/CarCard';
import { Container } from '@mui/material';

const FeaturedCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/cars?limit=6`)
            .then(res => setCars(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))

    }, [])

    return (
        <div className="featured-cars">
            <h2>FEATURED CAR</h2>
            {
                !loading ?
                    <Container>
                        <Grid container spacing={5}>
                            {
                                cars.map(car => <CarCard key={car._id} car={car} />)
                            }
                        </Grid>
                    </Container>
                    :
                    <Container>
                        <Grid container spacing={2}>
                            {
                                Array(6).fill().map((x, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={4}>
                                        <Box sx={{ width: 210, marginRight: 0.5, my: 5, mx: 'auto' }}>
                                            <Skeleton animation='wave' variant="rectangular" width={210} height={118} />
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
    );
};

export default FeaturedCars;