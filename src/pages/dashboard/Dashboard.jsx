import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './Dashboard.css';
import { Box, Paper } from "@mui/material";
import DashboardNavItems from "./dashboardComponent/DashboardNavItems";
const Dashboard = () => {
    return (
        <div style={{maxWidth: '1536px', margin: '0 auto'}}>
            <Navbar></Navbar>
            <Box sx={{display: {xs: 'block', lg:'flex'}, gap: '20px', marginTop: '30px', margin: '0 auto'}}>
                <Paper sx={{minHeight: '70vh', width: {xs: '100%', lg:'350px'}, padding: '10px', marginTop: '10px', marginBottom: '10px' ,background: '#023E8A'}}>
                <DashboardNavItems></DashboardNavItems>
                </Paper>
                <div style={{marginTop: '10px', marginBottom: '10px', flex: '1'}}>
                    <Outlet></Outlet>
                </div>
            </Box>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;