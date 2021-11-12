import React from 'react';

// Material UI
import { Grid, Rating } from '@mui/material';

// Local Imports
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <div className="review-card">
                <div className="rating">
                    <Rating className="rate" name='read-only' value={parseInt(review?.star)} readOnly />
                </div>
                <p className="name">{review?.name}</p>
                <p className="message">{review?.message}</p>
            </div>

        </Grid>
    );
};

export default ReviewCard;