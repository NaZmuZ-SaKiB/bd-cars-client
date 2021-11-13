import React, { useState } from 'react';
import axios from 'axios';

// Material UI
import { LinearProgress, Rating } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';

// Local Imports
import './AddReview.css';

const AddReview = () => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setSuccess, setError } = useAuth();

    const addReview = e => {
        e.preventDefault();
        if (rating === 0 || !message) return;

        setLoading(true);

        const review = {
            star: rating,
            message: message,
            name: user?.name
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews`, review)
            .then(res => {
                if (res.data?.insertedId) {
                    setSuccess('Successfully added review');
                    setError('');
                    setMessage('');
                    setRating(0)
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
            .finally(() => setLoading(false))
    }

    return (
        <div>
            <h2>ADD A REVIEW</h2>
            <form className='review-form'>
                {loading && <LinearProgress color='success' />}
                <div className="rating-input">
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>

                <p>Give Your Thoughts About us</p>
                <textarea onChange={e => setMessage(e.target.value)} value={message} placeholder='Your message'></textarea>
                <button disabled={!message || rating === 0} onClick={addReview} type='submit'>Send Review</button>
            </form>
        </div>
    );
};

export default AddReview;