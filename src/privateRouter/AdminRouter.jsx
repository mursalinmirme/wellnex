import { Navigate, useNavigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import Loading from "../loading/Loading";

const AdminRouter = ({children}) => {
    const {loading} = useAuth();
    const navigate = useNavigate();
    const getRole = useUserRole();
    if(loading){
        return <Loading></Loading>
    }
    if(getRole?.userRole === "admin"){
        return children;
    }
    if(getRole?.userRole !== "admin"){
        return navigate('/');
    }
};

export default AdminRouter;