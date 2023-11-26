import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './Dashboard.css';
import { Paper } from "@mui/material";
const Dashboard = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div style={{display: 'flex', gap: '20px', marginTop: '30px', margin: '0 auto'}}>
                <Paper style={{minHeight: '70vh', width: '300px', paddingTop: '20px', marginTop: '0px', background: '#023E8A'}}>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/organizer-profile'}>
              {({ isActive }) => (
                  <span
                  style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                className={isActive ? "activedashboardRoute" : ""}
              >
                Profile
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/add-a-camp'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Add a camp
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/manage-camps'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Manage Camps
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/manage-registered-camps'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Manage Registered Camps
              </span>
              )}
            </NavLink>
                </Paper>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;