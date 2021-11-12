import React from 'react';

// Material UI
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Local Imports
import './Services.css';

const Services = () => {
    return (
        <Container sx={{ pb: 10 }}>
            <h2 style={{ marginBottom: '80px' }}>WE ARE THE BEST</h2>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="service-card">
                        <Card sx={{ minWidth: 275, boxShadow: 0, backgroundColor: 'transparent' }}>
                            <CardContent>
                                <div className="service-icon">
                                    <SecurityIcon fontSize="large" />
                                </div>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    Highly Secured
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ px: 1 }}>
                                    All payments and delivery are done very securely. Online payment is safe.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="service-card">
                        <Card sx={{ minWidth: 275, boxShadow: 0, backgroundColor: 'transparent' }}>
                            <CardContent>
                                <div className="service-icon">
                                    <ThumbUpAltIcon fontSize="large" />
                                </div>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    Trusted Agents
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ px: 1 }}>
                                    All our agents are very trusted. All of them are professional and works sincerely.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="service-card">
                        <Card sx={{ minWidth: 275, boxShadow: 0, backgroundColor: 'transparent' }}>
                            <CardContent>
                                <div className="service-icon">
                                    <MonetizationOnIcon fontSize="large" />
                                </div>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    Get an Offer
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ px: 1 }}>
                                    We start offers at black friday. Here you can buy your dream car upto 30% off.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className="service-card">
                        <Card sx={{ minWidth: 275, boxShadow: 0, backgroundColor: 'transparent' }}>
                            <CardContent>
                                <div className="service-icon">
                                    <LocalShippingIcon fontSize="large" />
                                </div>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    Super Fast
                                </Typography>
                                <Typography variant="body1" textAlign="center" sx={{ px: 1 }}>
                                    Our delivery service is very fast and secure. You will get your car in 48hrs.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Services;