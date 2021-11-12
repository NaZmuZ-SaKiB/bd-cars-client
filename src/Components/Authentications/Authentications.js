import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';

// Material UI
import LinearProgress from '@mui/material/LinearProgress';

// Local Imports
import useAuth from '../../Hooks/useAuth';
import Logo from '../../Images/logo-red.png';
import './Authentications.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

const Authentications = () => {
    const [newUser, setNewUser] = useState(false);

    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const { authLoading, signup, login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onsubmit = data => {
        const { name, email, password } = data;

        if (newUser) {
            signup(name, email, password, location, navigate);
        }

        else {
            login(email, password, location, navigate);
        }
    }

    return (
        <>
            <Nav />
            <div className="form-container" >
                <form onSubmit={handleSubmit(onsubmit)} className="form-container__form">
                    <img src={Logo} alt="bd cars" className='logo' />
                    <h1>{newUser ? 'Sign up' : 'Log in'}</h1>
                    {authLoading && <LinearProgress sx={{ mb: 3 }} color='success' />}
                    {
                        newUser && <>
                            <input
                                placeholder="Name"
                                style={{ borderColor: `${errors.name ? 'red' : ''}` }}
                                {...register(
                                    'name',
                                    {
                                        pattern: { value: /^[A-Za-z\s]+$/, message: 'Invalid Name' },
                                        required: "Name is required"
                                    },
                                )}
                            />
                            <p className="form-container__form__error">{errors.name?.message}&nbsp;</p>
                        </>
                    }
                    <input
                        placeholder="Email"
                        style={{ borderColor: `${errors.email ? 'red' : ''}` }}
                        {...register(
                            'email',
                            {
                                pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Invalid Email' },
                                required: "Email is required"
                            },
                        )}
                    />
                    <p className="form-container__form__error">{errors.email?.message}&nbsp;</p>
                    <input
                        type="password"
                        placeholder="Password"
                        style={{ borderColor: `${errors.password ? 'red' : ''}` }}
                        {...register(
                            'password',
                            {
                                minLength: { value: 6, message: "Password shoud be atleast 6 charecters long" },
                                required: "Password is required"
                            },
                        )}
                    />
                    <p className="form-container__form__error">{errors.password?.message}&nbsp;</p>
                    {
                        newUser && <>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                style={{ borderColor: `${errors.confirmPassword ? 'red' : ''}` }}
                                {...register(
                                    'confirmPassword',
                                    {
                                        validate: value => value === watch('password') || 'Password did not match',
                                        required: "Confirm Password is required"
                                    },
                                )}
                            />
                            <p className="form-container__form__error">{errors.confirmPassword?.message}&nbsp;</p>
                        </>
                    }

                    <button type="submit">
                        {newUser ? 'Sign up' : 'Log in'}
                    </button>

                    <p
                        onClick={() => setNewUser(!newUser)}
                        className="form-container__toggle"
                    >
                        {newUser ? 'Already have an account' : 'Create new account'}
                    </p>
                </form>

            </div >
            <Footer />
        </>
    );
};

export default Authentications;