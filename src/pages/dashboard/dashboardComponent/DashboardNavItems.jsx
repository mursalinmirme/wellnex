import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import useUserRole from "../../../hooks/useUserRole";

const DashboardNavItems = () => {
    const getRole = useUserRole();
    return (
        <Box>
            {
                getRole?.userRole === 'Organizers' ? 
                <>
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
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/add-upcoming-camp'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Add Upcoming Camps
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/manage-upcoming-camps'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Manage Upcoming Camps
              </span>
              )}
            </NavLink>
                </> :
                <>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/participant-profile'}>
              {({ isActive }) => (
                  <span
                  style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
                className={isActive ? "activedashboardRoute" : ""}
              >
                Profile
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/registered-camps'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Registered Camps
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/payment-history'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Payment History
              </span>
              )}
            </NavLink>
                <NavLink style={{textDecoration: 'none'}} to={'/dashboard/feedback-and-ratings'}>
              {({ isActive }) => (
                  <span
                className={isActive ? "activedashboardRoute" : ""}
                style={{ padding: '20px', color: '#ffffff', display: 'block', fontSize: '18px', fontWeight: '500' }}
              >
                Feedback and Ratings
              </span>
              )}
            </NavLink>
                </>
            }
            
        </Box>
    );
};

export default DashboardNavItems;