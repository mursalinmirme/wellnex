import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../mainlayout/Mainlayout";
import Home from "../pages/publicPages/home/Home";
import AvailableCamps from "../pages/publicPages/home/AvailableCamps";
import ContactUs from "../pages/publicPages/home/ContactUs";
import Signup from "../pages/signup/Signup";
import Signin from "../pages/signin/Signin";
import CampDetails from "../pages/publicPages/CampDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import OrganizerProfile from "../pages/dashboard/OrganizerProfile";
import AddaCampPage from "../pages/dashboard/AddaCampPage";
import ManageCamps from "../pages/dashboard/ManageCamps";
import ManageRegisteredPage from "../pages/dashboard/ManageRegisteredPage";
import PrivateRouter from "../privateRouter/PrivateRouter";

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
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
            {
                path: 'organizer-profile',
                element: <PrivateRouter><OrganizerProfile></OrganizerProfile></PrivateRouter>
            },
            {
                path: 'add-a-camp',
                element: <PrivateRouter><AddaCampPage></AddaCampPage></PrivateRouter>
            },
            {
                path: 'manage-camps',
                element: <PrivateRouter><ManageCamps></ManageCamps></PrivateRouter>
            },
            {
                path: 'manage-registered-camps',
                element: <PrivateRouter><ManageRegisteredPage></ManageRegisteredPage></PrivateRouter>
            },
        ]
    }
])

export default router;