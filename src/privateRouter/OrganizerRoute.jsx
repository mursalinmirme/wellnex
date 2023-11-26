import useUserRole from "../hooks/useUserRole";

const OrganizerRoute = ({children}) => {
    const getRole = useUserRole();
    if(getRole?.userRole === "Organizers"){
        return children;
    }
    return;
};

export default OrganizerRoute;