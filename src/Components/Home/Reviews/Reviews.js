import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import { Container, Grid, Skeleton } from '@mui/material';

// Local Imports
import './Reviews.css';
import ReviewCard from './ReviewCard/ReviewCard';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="reviews">
            <h2>CUSTOMER REVIEWS</h2>
            {
                !loading ? (
                    <Container>
                        <Grid container spacing={2}>
                            {
                                reviews.map(review => <ReviewCard key={review._id} review={review} />)
                            }
                        </Grid>
                    </Container>
                )
                    :
                    <Container>
                        <Grid container spacing={2}>
                            {
                                Array(4).fill().map((x, index) => (
                                    <Grid key={index} item xs={12} sm={4} md={3}>
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation="wave" />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Container>
            }
        </div>
    );
};

export default Reviews;