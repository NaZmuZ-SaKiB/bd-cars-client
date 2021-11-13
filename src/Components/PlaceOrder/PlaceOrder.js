import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Material UI
import { Container, Grid, LinearProgress } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Local Imports
import './PlaceOrder.css';
import Loading from '../Loading/Loading';
import useAuth from '../../Hooks/useAuth';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const PlaceOrder = () => {
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true);
    const [postLoading, setPostLoading] = useState(false);

    const [form, setForm] = useState({})

    const { user, setSuccess, setError } = useAuth();

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/cars/${id}`)
            .then(res => setCar(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [id])

    // Functions

    const savePhone = () => {
        if (!form?.phone) return;

        axios.put(`${process.env.REACT_APP_SERVER_URL}/users/phone/${user?._id}`, { phone: form.phone })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setSuccess('Successfully saved phone number');
                    setError('');
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
    }

    const saveAddress = () => {
        if (!form?.address) return;

        axios.put(`${process.env.REACT_APP_SERVER_URL}/users/address/${user?._id}`, { address: form.address })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setSuccess('Successfully saved address');
                    setError('');
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ((!form?.phone && !user.phone) || (!form?.address && !user.address)) return;

        const newOrder = {
            name: user.name,
            email: user.email,
            car: car?.title,
            price: car?.price,
            status: 'Pending',
            phone: form?.phone || user.phone,
            address: form?.address || user.address
        }

        setOrder(newOrder);
    };

    const handlePlaceOrder = () => {
        setPostLoading(true);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/orders`, order)
            .then(res => {
                if (res.data?.insertedId) {
                    setSuccess('Successfully Placed Order');
                    setError('');
                    navigate('/home');
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
            .finally(() => setPostLoading(false))
    }

    return (
        <>
            <Nav />
            {!loading && <div className='place-order'>
                <h2>PLACE YOUR ORDER</h2>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <form onSubmit={handleSubmit} className='order-form'>
                                <h3>Fill up the form to place order</h3>
                                <input
                                    value={user?.name}
                                    disabled
                                />
                                <input
                                    value={user?.email}
                                    disabled
                                />
                                <input
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    name='phone'
                                    defaultValue={user?.phone}
                                />
                                <p onClick={savePhone} className='save-btn'>Save phone</p>
                                <input
                                    onChange={handleChange}
                                    placeholder="Address"
                                    name='address'
                                    defaultValue={user?.address}
                                />
                                <p onClick={saveAddress} className='save-btn'>Save address</p>
                                <button type="submit">Confirm Details</button>
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={6} md={7} lg={8}>
                            <div className="car">
                                {postLoading && <LinearProgress color='success' sx={{ mb: 2 }} />}
                                <Grid container spacing={2} alignItems='center'>
                                    <Grid item xs={12} sm={12} md={6} lg={5}>
                                        <img src={car?.image} alt={car?.title} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={7}>
                                        <h3>{car?.title}</h3>
                                        <p className='features'>{car?.features}</p>
                                        <p>{car?.price}</p>
                                    </Grid>
                                </Grid>
                                <div className="price">Total Price: &nbsp; <AttachMoneyIcon sx={{ fontSize: '35px' }} /> {car?.price}</div>
                                <button disabled={Object.keys(order).length === 0} onClick={handlePlaceOrder}>Place Order</button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>}
            {loading && <Loading />}
            <Footer />
        </>
    );
};

export default PlaceOrder;