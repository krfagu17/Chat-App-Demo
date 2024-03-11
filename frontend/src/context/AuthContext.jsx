import { createContext,useState,useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [loading, setLoading] = useState(false);

    return (
        <AuthContext.Provider value={{userAuth,setUserAuth,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}