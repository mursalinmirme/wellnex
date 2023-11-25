import { createContext } from "react";

export const AuthContext = createContext(null);
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import app from "../firebase.config";
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    // create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // update profile
    const updateUserProfile = (name, photourl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photourl
        })
    }




    const authInfo = {
        createUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;