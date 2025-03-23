import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true;
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    // Function to fetch user data
    const getUserdata = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/user/data`, { withCredentials: true });
            if (data.success) {
                setUserData(data.userData);
                setIsLoggedin(true);
                email: data.userData.email;
                localStorage.setItem("isLoggedin", "true");
            } else {
                setIsLoggedin(false);
                localStorage.removeItem("isLoggedin");
            }
        } catch (error) {const wasLoggedIn = localStorage.getItem("isLoggedin") === "true";

            if (error.response?.status === 401) {
                if (wasLoggedIn) {  
                    toast.warn("Session expired. Redirecting to login...");
                    navigate("/login");
                }
                // console.clear();
                setIsLoggedin(false);
                setUserData(null);
                localStorage.removeItem("isLoggedin");
            } else {
                toast.error(error.response?.data?.message || "Failed to fetch user data");
            }
            
        }
    };

    // Function to log out the user
    const logoutUser = async () => {
        try {
            await axios.post(`${backendurl}/api/auth/logout`, {}, { withCredentials: true });
            setUserData(null);
            setIsLoggedin(false);
            localStorage.removeItem("isLoggedin");
            navigate("/");
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Failed to log out. Try again.");
        }
    };

    // Automatically check login status on page load
    useEffect(() => {
        getUserdata();
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedin(true);
        localStorage.setItem("isLoggedin", "true");
    };

    const value = {
        backendurl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserdata,
        logoutUser
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
