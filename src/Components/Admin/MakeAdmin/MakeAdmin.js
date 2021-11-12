import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import { Autocomplete, Button, TextField } from '@mui/material';

// Local Imports
import Loading from '../../Loading/Loading';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [email, setEmail] = useState(null);

    const { setSuccess, setError } = useAuth();

    useEffect(() => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/users?role=regular`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let emails = [];
        users.forEach(user => {
            const item = { label: user.email }
            emails.push(item);
            setEmails(emails);
        })
    }, [users.length])

    const makeAdmin = () => {
        setLoading(true);

        axios.put(`${process.env.REACT_APP_SERVER_URL}/users/admin/${email}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setSuccess('Successfully made admin');
                    setError('');
                    setEmail(null)
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <h2>MAKE ADMIN</h2>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={emails}
                sx={{ mt: 5 }}
                renderInput={(params) => <TextField value={email} onBlur={e => setEmail(e.target.value)} {...params} placeholder="Email" />}
            />
            <Button sx={{ mt: 2 }} onClick={makeAdmin} variant="contained">Make Admin</Button>
            {loading && <Loading />}
        </div>
    );
};

export default MakeAdmin;