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
import ParticipantProfile from "../pages/dashboard/ParticipantProfile";
import RegisteredCamps from "../pages/dashboard/RegisteredCamps";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import ProfessionalsProfile from "../pages/dashboard/ProfessionalsProfile";
import ErrorPage from "../components/ErrorPage";
import OrganizerRoute from "../privateRouter/OrganizerRoute";
import ParticipantRoute from "../privateRouter/ParticipantRoute";
import ProfessionalHealthCareRoute from "../privateRouter/ProfessionalHealthCareRoute";
import PaymentPage from "../pages/dashboard/PaymentPage";
import FeedbackAndRatings from "../pages/dashboard/FeedbackAndRatings";
import AddUpcommingCamps from "../pages/dashboard/AddUpcommingCamps";
import UpcommingCampsDetails from "../pages/publicPages/UpcommingCampsDetails";
import ManageUpcommingCamps from "../pages/dashboard/ManageUpcommingCamps";
import ProfessionalDashboard from "../pages/dashboard/ProfessionalDashboard";
import AcceptedCamps from "../pages/dashboard/AcceptedCamps";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'available_camp',
                element: <PrivateRouter><AvailableCamps></AvailableCamps></PrivateRouter>
            },
            {
                path: 'camps-details/:id',
                element: <PrivateRouter><CampDetails></CampDetails></PrivateRouter>
            },
            {
                path: 'upcomming-camps-details/:id',
                element: <PrivateRouter><UpcommingCampsDetails></UpcommingCampsDetails></PrivateRouter>
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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'organizer-profile',
                element: <PrivateRouter><OrganizerRoute><OrganizerProfile></OrganizerProfile></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'add-a-camp',
                element: <PrivateRouter><OrganizerRoute><AddaCampPage></AddaCampPage></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'add-upcoming-camp',
                element: <PrivateRouter><OrganizerRoute><AddUpcommingCamps></AddUpcommingCamps></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'manage-upcoming-camps',
                element: <PrivateRouter><OrganizerRoute><ManageUpcommingCamps></ManageUpcommingCamps></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'manage-camps',
                element: <PrivateRouter><OrganizerRoute><ManageCamps></ManageCamps></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'manage-registered-camps',
                element: <PrivateRouter><OrganizerRoute><ManageRegisteredPage></ManageRegisteredPage></OrganizerRoute></PrivateRouter>
            },
            {
                path: 'participant-profile',
                element: <PrivateRouter><ParticipantRoute><ParticipantProfile></ParticipantProfile></ParticipantRoute></PrivateRouter>
            },
            {
                path: 'registered-camps',
                element: <PrivateRouter><ParticipantRoute><RegisteredCamps></RegisteredCamps></ParticipantRoute></PrivateRouter>
            },
            {
                path: 'payment-history',
                element: <PrivateRouter><ParticipantRoute><PaymentHistory></PaymentHistory></ParticipantRoute></PrivateRouter>
            },
            {
                path: 'feedback-and-ratings',
                element: <PrivateRouter><ParticipantRoute><FeedbackAndRatings></FeedbackAndRatings></ParticipantRoute></PrivateRouter>
            },
            {
                path: 'payment-page/:id',
                element: <PrivateRouter><ParticipantRoute><PaymentPage></PaymentPage></ParticipantRoute></PrivateRouter>
            },
        ]
    },
    // {
    //     path: 'professional-profile', 
    //     element: <PrivateRouter><ProfessionalHealthCareRoute><ProfessionalsProfile></ProfessionalsProfile></ProfessionalHealthCareRoute></PrivateRouter>,
    //     errorElement: <ErrorPage></ErrorPage>,
    //     children:[
    //         {
                
    //         }
    //     ]
    // }
    {
        path: '', 
        element: <PrivateRouter><ProfessionalHealthCareRoute><ProfessionalDashboard></ProfessionalDashboard></ProfessionalHealthCareRoute></PrivateRouter>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: 'professional-dashboard',
                element: <PrivateRouter><ProfessionalHealthCareRoute><ProfessionalsProfile></ProfessionalsProfile></ProfessionalHealthCareRoute></PrivateRouter>,
            },
            {
                path: 'accepted-camps',
                element: <PrivateRouter><ProfessionalHealthCareRoute><AcceptedCamps></AcceptedCamps></ProfessionalHealthCareRoute></PrivateRouter>,
            },
        ]
    }
])

export default router;