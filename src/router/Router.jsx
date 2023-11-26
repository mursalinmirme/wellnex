import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../mainlayout/Mainlayout";
import Home from "../pages/publicPages/home/Home";
import AvailableCamps from "../pages/publicPages/home/AvailableCamps";
import DashboardRoutes from "../pages/dashboard/dashboardRoutes/DashboardRoutes";
import ContactUs from "../pages/publicPages/home/ContactUs";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import CampDetails from "../pages/publicPages/CampDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'available_camp',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: 'camps-details/:id',
                element: <CampDetails></CampDetails>
            },
            {
                path: 'contact_us',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: 'signin',
                element: <Signin></Signin>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardRoutes></DashboardRoutes>,
        children: [
            {
                path: 'dashboard',
                element: <DashboardRoutes></DashboardRoutes>
            }
        ]
    }
])

export default router;