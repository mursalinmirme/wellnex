import { Box, Paper } from "@mui/material";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { NavLink, Outlet } from "react-router-dom";

const ProfessionalDashboard = () => {
    return (
        <div style={{maxWidth: '1536px', margin: '0 auto'}}>
            <Navbar></Navbar>
            {/* sidebar */}
                <Box sx={{display: {xs: 'block', lg:'flex'}}} gap={'20px'} marginBottom={'20px'}>
                <Box> 
                    <Paper style={{minHeight: {xs: 'auto', lg:'99%'}, width: {xs: '100%', lg: '350px'}, padding: '10px', marginTop: '10px', marginBottom: '10px' ,background: '#023E8A', paddingTop: '30px'}}>
                    <Box sx={{minHeight: {xs: 'auto', lg: '70vh'}}}>
                    <NavLink style={{textDecoration: 'none'}} to={'/professional-dashboard'}>
                          {({ isActive }) => (
                          <span
                        className={isActive ? "activedashboardRoute" : ""}
                        style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                           >
                            Profile
                         </span>
                        )}
                      </NavLink>
                    <NavLink style={{textDecoration: 'none', paddingTop: '30px'}} to={'accepted-camps'}>
                          {({ isActive }) => (
                          <span
                        className={isActive ? "activedashboardRoute" : ""}
                        style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                           >
                             Accepted Camps
                         </span>
                        )}
                      </NavLink>
                    </Box>
                    </Paper>
                </Box>
                <div style={{ marginTop: '10px', marginBottom: '10px', flex: '1'}}>
                    <Outlet></Outlet>
                </div>
                </Box>
            <Footer></Footer>
        </div>
    );
};

export default ProfessionalDashboard;