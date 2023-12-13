import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Box, Paper } from "@mui/material";
import '../dashboard/Dashboard.css';
const AdminDashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Box sx={{display: 'flex', gap: '20px'}}>
            <Box sx={{width: {xs: '100%', lg: '350px'}}}> 
                    <Paper style={{minHeight: {xs: 'auto', lg:'100%'}, width: {xs: '100%', lg: '350px'}, padding: '10px', marginTop: '10px', marginBottom: '10px' ,background: '#023E8A', paddingTop: '30px'}}>
                    <Box sx={{minHeight: {xs: 'auto', lg: '100vh'}}}>
                    <NavLink style={{textDecoration: 'none'}} to={'/manage-users'}>
                          {({ isActive }) => (
                          <span
                        className={isActive ? "activedashboardRoute" : ""}
                        style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                           >
                            Manage Users
                         </span>
                        )}
                      </NavLink>
                    <NavLink style={{textDecoration: 'none', paddingTop: '30px'}} to={'/Add-Blog'}>
                          {({ isActive }) => (
                          <span
                        className={isActive ? "activedashboardRoute" : ""}
                        style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                           >
                            Add Blog
                         </span>
                        )}
                      </NavLink>
                    <NavLink style={{textDecoration: 'none', paddingTop: '30px'}} to={'/manage-blogs'}>
                          {({ isActive }) => (
                          <span
                        className={isActive ? "activedashboardRoute" : ""}
                        style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                           >
                            Manage Blogs
                         </span>
                        )}
                      </NavLink>
                    </Box>
                    </Paper>
                </Box>
            
            <Box sx={{width: '100%'}}>
                <Outlet></Outlet>
            </Box>
            </Box>
            <Footer></Footer>
        </div>
    );
};

export default AdminDashboard;