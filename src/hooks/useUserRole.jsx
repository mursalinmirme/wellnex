import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: userRole} = useQuery({
        queryKey: ['getUserRole'],
        enabled: !!user && !loading,
        queryFn: async () => {
            const userRole = await axiosSecure.get(`/user/${user?.email}`)
            return userRole.data;
        }
    })
    return userRole;
};

export default useUserRole;