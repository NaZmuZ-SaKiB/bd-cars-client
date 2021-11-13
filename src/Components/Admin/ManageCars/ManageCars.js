import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog,
    DialogTitle,
    DialogActions,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Local Imports
import Loading from '../../Loading/Loading';
import useAuth from '../../../Hooks/useAuth';

const ManageCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [carId, setCarId] = useState('');

    const { setSuccess, setError } = useAuth();

    const getAllCars = () => {
        setLoading(true);

        axios.get(`${process.env.REACT_APP_SERVER_URL}/cars`)
            .then(res => setCars(res.data))
            .catch(err => console.log(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getAllCars();
    }, [])

    // Functions

    const handleOpenConfirm = id => {
        setCarId(id)
        setOpen(true);
    };

    const handleCloseConfirm = () => {
        setOpen(false);
    };

    const deleteCar = (id) => {
        setLoading(true);
        handleCloseConfirm();

        axios.delete(`${process.env.REACT_APP_SERVER_URL}/cars/${id}`)
            .then(res => {
                if (res.data.deletedCount === 1) {
                    setSuccess(`Successfully Deleted Car`);
                    setError('');
                    getAllCars();
                }
            })
            .catch(err => {
                setError(err.message);
                setSuccess('');
            })
    }

    return (
        <div>
            {loading && <Loading />}
            <h2>Manage Cars</h2>

            <TableContainer sx={{ mt: 5, maxWidth: '100vw', overflowX: 'scroll' }}>
                <Table stickyHeader aria-label="orders table" sx={{ minWidth: '800px' }} >
                    <TableHead>
                        <TableRow>

                            <TableCell sx={{ fontWeight: '600' }}>
                                Image
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>
                                Car Name
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: '600' }}>
                                Price
                            </TableCell>
                            <TableCell align='right' sx={{ fontWeight: '600' }}>
                                Actions
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map(car => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={car?._id}>

                                    <TableCell sx={{ p: 1 }}>
                                        <img src={car?.image} alt={car?.title} height='40' style={{ borderRadius: '5px' }} />
                                    </TableCell>
                                    <TableCell align='center' sx={{ p: 1 }}>
                                        {car?.title}
                                    </TableCell>
                                    <TableCell align='center' sx={{ p: 1 }}>
                                        ${car?.price}
                                    </TableCell>
                                    <TableCell align='right' sx={{ p: 1 }}>
                                        <button onClick={() => handleOpenConfirm(car?._id)} className='action-btn-delete action-btn'><DeleteIcon /></button>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Car Delete dialog box */}
            <Dialog
                open={open}
                onClose={handleCloseConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this order?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button color='error' onClick={() => deleteCar(carId, 'Canceled')} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageCars;