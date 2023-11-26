import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../loading/Loading";

const PrivateRouter = ({children}) => {
    const { user, loading } = useAuth();
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
    return <Navigate to={'/signin'}></Navigate>
};

export default PrivateRouter;