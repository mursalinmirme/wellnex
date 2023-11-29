import axios from 'axios';

const useAxiosSecure = () => {

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
        // withCredentials: true
    })

    // useEffect(() => {
    //     axiosSecure.interceptors.request.use((config) => {
    //         config.headers.user_access_token = localStorage.getItem('access_token');
    //         return config;
    //     }, (error) => {
    //         return Promise.reject(error);
    //     })
        
    //     axiosSecure.interceptors.response.use((response) => {
    //         return response
    //     }, (error) => {
    //         if(error.response.status === 401 || error.response.status === 403){
    //             userLogout();
    //             navigate('/signin');
    //         }
    //     }) 
    // }, [navigate, userLogout])


    return axiosSecure;
};

export default useAxiosSecure;