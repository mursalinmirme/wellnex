import useUserRole from "../hooks/useUserRole";

const ParticipantRoute = ({children}) => {
    const getRole = useUserRole();
    if(getRole?.userRole === "Participants"){
        return children;
    }
    return;
};

export default ParticipantRoute;