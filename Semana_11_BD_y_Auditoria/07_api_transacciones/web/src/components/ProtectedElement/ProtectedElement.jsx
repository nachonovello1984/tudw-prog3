import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const ProtectedElement = ({mustBeAdmin, children }) => {

    const { isLoggedIn, isAdmin } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeAdmin && !isAdmin())) {
        return <></>;
    }
    return children;
};
export { ProtectedElement };