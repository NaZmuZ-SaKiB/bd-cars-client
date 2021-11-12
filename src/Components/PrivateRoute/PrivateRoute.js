import { Outlet, Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children, path }) => {
    const { user, authLoading } = useAuth();
    const location = useLocation();

    if (authLoading) return null;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;

};

export default PrivateRoute;