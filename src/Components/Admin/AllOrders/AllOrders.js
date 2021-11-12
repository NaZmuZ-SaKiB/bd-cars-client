import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Local Imports
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../Loading/Loading';
import OrdersTable from '../OrdersTable/OrdersTable';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    const getAllOrders = () => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/orders`)
            .then((res) => setOrders(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getAllOrders();
    }, [user])

    return (
        <div>
            <h2>All Pending Orders</h2>
            {!loading ? <OrdersTable orders={orders} getMyOrders={null} getAllOrders={getAllOrders} /> : <Loading />}
        </div>
    );
};

export default AllOrders;