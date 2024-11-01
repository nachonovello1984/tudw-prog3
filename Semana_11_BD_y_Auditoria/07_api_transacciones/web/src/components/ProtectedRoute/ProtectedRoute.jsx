import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';

const ProtectedRoute = ({mustBeAdmin, children }) => {

    const { isLoggedIn, isAdmin } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeAdmin && !isAdmin())) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export { ProtectedRoute };