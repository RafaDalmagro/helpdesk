import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { TechRoutes } from "./TechRoutes";
import { AdminRoutes } from "./AdminRoutes";

export function Routes() {
    const { session } = useAuth();
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

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    );
}
