import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// Material UI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import StarsIcon from '@mui/icons-material/Stars';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

// Local Imports
import Nav from '../Nav/Nav';
import './Admin.css';
import useAuth from '../../Hooks/useAuth';
import AdminNav from './AdminNav/AdminNav';
import { Divider } from '@mui/material';

const drawerWidth = 300;

const Admin = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const { user, logOut } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    const drawer = (
        <div className='drawer'>
            <List>
                <Toolbar />
                <Divider />
                <Link to='pay'>
                    <ListItem button>
                        <ListItemIcon>
                            <PaymentIcon />
                        </ListItemIcon>
                        <ListItemText >Pay</ListItemText>
                    </ListItem>
                </Link>
                <Link to=''>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText >My Orders</ListItemText>
                    </ListItem>
                </Link>
                <Link to='review'>
                    <ListItem button>
                        <ListItemIcon>
                            <StarsIcon />
                        </ListItemIcon>
                        <ListItemText >Review</ListItemText>
                    </ListItem>
                </Link>
                {
                    user?.role === 'admin' &&
                    <>
                        <Divider />
                        <Link to='all-orders'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIcon />
                                </ListItemIcon>
                                <ListItemText >All Orders</ListItemText>
                            </ListItem>
                        </Link>
                        <Link to='add-car'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AddBoxIcon />
                                </ListItemIcon>
                                <ListItemText >Add Car</ListItemText>
                            </ListItem>
                        </Link>
                        <Link to='manage-cars'>
                            <ListItem button>
                                <ListItemIcon>
                                    <DirectionsCarIcon />
                                </ListItemIcon>
                                <ListItemText >Manage Cars</ListItemText>
                            </ListItem>
                        </Link>
                        <Link to='make-admin'>
                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText >Make Admin</ListItemText>
                            </ListItem>
                        </Link>
                    </>
                }
                <Divider />
                <Link to='/home'>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText >Back to Home</ListItemText>
                    </ListItem>
                </Link>
                <ListItem button onClick={logOut}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText >Logout</ListItemText>
                </ListItem>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AdminNav handleDrawerToggle={handleDrawerToggle} />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: '50' }}
                    aria-label="mailbox folders"
                >

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Admin;