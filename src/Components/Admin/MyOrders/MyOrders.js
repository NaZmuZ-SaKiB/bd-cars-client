import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Local Imports
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../Loading/Loading';
import OrdersTable from '../OrdersTable/OrdersTable';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    const getMyOrders = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER_URL}/orders?email=${user?.email}`)
            .then((res) => setOrders(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getMyOrders()
    }, [user])

    return (
        <div>
            <h2>MY ORDERS</h2>
            {!loading ? <OrdersTable orders={orders} getMyOrders={getMyOrders} getAllOrders={null} /> : <Loading />}
        </div>
    );
};

export default MyOrders;