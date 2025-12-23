import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { TechRoutes } from "./TechRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { Loading } from "../components/Loading";

export function Routes() {
    const { session, isLoading } = useAuth();
    function Route() {
        if (!session?.userWithoutPassword?.role) {
            return <AuthRoutes />;
        }
        switch (session.userWithoutPassword.role) {
            case "admin":
                return <AdminRoutes />;
            case "tech":
                return <TechRoutes />;
            case "client":
                return <ClientRoutes />;
            default:
                return <AuthRoutes />;
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    );
}
