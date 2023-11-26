import useUserRole from "../hooks/useUserRole";

const ProfessionalHealthCareRoute = ({children}) => {
    const getRole = useUserRole();
    if(getRole?.userRole === "Healthcare Professionals"){
        return children;
    }
    return;
};

export default ProfessionalHealthCareRoute;