import React from 'react';
import { Link } from 'react-router-dom';

// Material UI
import DashboardIcon from '@mui/icons-material/Dashboard';

// Local imports
import './AdminNav.css';

const AdminNav = ({ handleDrawerToggle }) => {
    return (
        <div className="nav-container">
            <div className="dashboard-icon" onClick={handleDrawerToggle}><DashboardIcon /></div>
            <nav className="nav admin-nav">
                <div className="title">Dashboard</div>
            </nav>
        </div>
    );
};

export default AdminNav;