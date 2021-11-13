import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

// Local Imports
import './OrdersTable.css';
import useAuth from '../../../Hooks/useAuth';

const OrdersTable = ({ orders, getMyOrders, getAllOrders }) => {
    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState('');

    const { setSuccess, setError } = useAuth();

    const location = useLocation();

    // Functions

    const handleOpenConfirm = id => {
        setOrderId(id)
        setOpen(true);
    };

    const handleCloseConfirm = () => {
        setOpen(false);
    };

    const updateOrder = (id, status) => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/orders/${id}?status=${status}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setSuccess(`Successfully ${status === 'Canceled' ? 'canceled' : 'updated'} order`);
                    setError('');
                    getMyOrders && getMyOrders();
                    getAllOrders && getAllOrders();
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
    }
    return (
        <>
            <TableContainer sx={{ mt: 5, maxWidth: '85vw', overflowX: 'scroll' }}>
                <Table stickyHeader aria-label="orders table" sx={{ minWidth: '800px' }} >
                    <TableHead>
                        <TableRow>

                            <TableCell sx={{ fontWeight: '600' }}>
                                Name
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>
                                Car
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>
                                Price
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>
                                Status
                            </TableCell>
                            <TableCell align='right' sx={{ fontWeight: '600' }}>
                                Actions
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={order?._id} sx={{ backgroundColor: `${order?.status === 'Canceled' ? '#ffefef' : order?.status === 'Shipped' ? 'rgba(0, 0, 0, 0.04)' : 'white'}` }}>

                                    <TableCell>
                                        {order?.name}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {order?.car}
                                    </TableCell>
                                    <TableCell align='center'>
                                        ${order?.price}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {order?.status}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {order?.status === 'Pending' && <button onClick={() => handleOpenConfirm(order?._id)} className='action-btn-delete action-btn'><DeleteIcon /></button>}
                                        {location.pathname === '/dashboard/all-orders' && <button onClick={() => updateOrder(order?._id, 'Shipped')} className='action-btn-check action-btn'><CheckCircleIcon /></button>}
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* order Delete dialog box */}
            <Dialog
                open={open}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to cancel this order?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button color='error' onClick={() => updateOrder(orderId, 'Canceled')} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OrdersTable;