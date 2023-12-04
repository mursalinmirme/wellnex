import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update profile
    const updateUserProfile = (name, photourl) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photourl
        })
    }

    const signinUserByEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout user 
    const logoutUser = () => {
       return signOut(auth);
    }

    // catch current user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const loggerEmail = currentUser?.email;
                axiosPublic.post('/jwt', {email: loggerEmail})
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    setLoading(false);
                })
                
            }else{
                localStorage.removeItem('token');
                setLoading(false);

            }
        })
        return () => {
            unSubscribe()
        }
    }, [ axiosPublic ])


    // user sign in
    const authInfo = {
        createUser,
        updateUserProfile,
        signinUserByEmail,
        logoutUser,
        user,
        setUser,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;