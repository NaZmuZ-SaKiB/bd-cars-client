import React from 'react';
import { useNavigate } from 'react-router-dom';

// Material UI
import {
    CardActions,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Local Imports
import './CarCard.css';

const CarCard = ({ car }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className="car-card">
                <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={car?.image}
                        alt={car?.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontWeight='500'>
                            {car?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {car?.features}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='500' mt={2}>
                            <span style={{ display: 'flex', alignItems: 'center' }}> Price: <AttachMoneyIcon />{car?.price}</span>
                        </Typography>
                    </CardContent>

                    <CardActions sx={{ p: 0 }}>
                        <button onClick={() => navigate(`/place-order/${car?._id}`)} className="car-card-action">Buy Now</button>
                    </CardActions>
                </Card>
            </div>
        </Grid>
    );
};

export default CarCard;