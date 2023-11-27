import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './Dashboard.css';
import { Paper } from "@mui/material";
import DashboardNavItems from "./dashboardComponent/DashboardNavItems";
const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div style={{display: 'flex', gap: '20px', marginTop: '30px', margin: '0 auto'}}>
                <Paper style={{minHeight: '70vh', width: '300px', padding: '10px', marginTop: '10px', marginBottom: '10px' ,background: '#023E8A'}}>
                <DashboardNavItems></DashboardNavItems>
                </Paper>
                <div style={{marginTop: '10px', marginBottom: '10px', flex: '1'}}>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;