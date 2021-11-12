import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
    from 'firebase/auth'

//Local Imports
import initializeFirebase from '../Firebase/firebase';

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [error, setError] = useState('');
    const [openError, setOpenError] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                axios.get(`${process.env.REACT_APP_SERVER_URL}/users?email=${user?.email}`)
                    .then(res => {
                        setUser(res.data);
                    })
                    .catch(err => console.log(err.message))
                    .finally(() => setAuthLoading(false))
            }
            else {
                setUser(null);
                setAuthLoading(false);
            }
        })
    }, [])

    useEffect(() => {
        if (success) {
            setOpenSuccess(true);
            setTimeout(() => {
                setSuccess('');
            }, 6000);
        }
        else { setOpenSuccess(false) }
    }, [success])

    useEffect(() => {
        if (error) {
            setOpenError(true);
            setTimeout(() => {
                setError('');
            }, 6000);
        }
    }, [error])

    const signup = (name, email, password, location, navigate) => {
        setAuthLoading(true);
        const url = location?.state?.from?.pathname || '/home';
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const user = {
                    name,
                    email,
                    role: 'regular',
                    phone: null,
                    address: null
                }

                setSuccess('Successfully Created Account');
                setError('');

                axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, user)
                    .then(() => {
                        navigate(url);
                        window.location.reload();
                    })
                    .catch(err => console.log(err.message))
                    .finally(() => {
                        setAuthLoading(false)
                    })
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
    }

    const login = (email, password, location, navigate) => {
        setAuthLoading(true);
        const url = location?.state?.from?.pathname || '/home';
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSuccess('Successfully Logged in');
                setError('');
                console.log(url);
                navigate(url);
                window.location.reload();
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
            .finally(() => {
                setAuthLoading(false)
            })
    }

    const logOut = () => {
        signOut(auth)
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })

    }

    return {
        authLoading,
        user,
        signup,
        login,
        logOut,
        success,
        setSuccess,
        openSuccess,
        setOpenSuccess,
        error,
        setError,
        openError,
        setOpenError
    }
};

export default useFirebase;