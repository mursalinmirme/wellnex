import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfessionalsProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const {data} = useQuery({
    //     queryKey: ['healthProfessionals'],
    //     queryFn: async () => {
    //         const result = await axiosSecure.get('/ ')
    //     }
    // })
    return (
        <div>
            <Navbar></Navbar>
                <div>
                    <img src={user?.photoURL} alt="" />
                    <h4>{user?.displayName}</h4>
                </div>
            <Footer></Footer>
        </div>
    );
};

export default ProfessionalsProfile;