import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    }

    const isAdmin = () => {
        return (userData != null && userData.user.rol === "admin");
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };