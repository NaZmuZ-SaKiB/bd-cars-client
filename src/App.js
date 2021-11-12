import { forwardRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Material UI
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

// Local Imports
import Home from './Components/Home/Home';
import Cars from './Components/Cars/Cars';
import Authentications from './Components/Authentications/Authentications';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import useAuth from './Hooks/useAuth';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Admin from './Components/Admin/Admin';
import Pay from './Components/Admin/Pay/Pay';
import MyOrders from './Components/Admin/MyOrders/MyOrders';
import AllOrders from './Components/Admin/AllOrders/AllOrders';
import AddReview from './Components/Admin/AddReview/AddReview';
import MakeAdmin from './Components/Admin/MakeAdmin/MakeAdmin';

function App() {
  const { user, success, error, openSuccess, openError, setOpenSuccess, setOpenError } = useAuth();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/login' element={<Authentications />} />

        <Route element={<PrivateRoute />} >
          <Route path='/place-order/:id' element={<PlaceOrder />} />
        </Route>

        <Route element={<PrivateRoute />} >
          <Route path='/dashboard/*' element={<Admin />}>
            <Route path='pay' element={<Pay />} />
            <Route path='' element={<MyOrders />} />
            {
              user?.role === 'admin' && <>
                <Route path='all-orders' element={<AllOrders />} />
                <Route path='make-admin' element={<MakeAdmin />} />
              </>
            }
            <Route path='review' element={<AddReview />} />
          </Route>
        </Route>

      </Routes>

      {/* Alerts */}

      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={() => setOpenSuccess(false)}>
        <Alert onClose={() => setOpenSuccess(false)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={5000} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
