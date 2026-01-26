import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { TechRoutes } from "./TechRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { Loading } from "../components/Loading";

export function Routes() {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex">
                <Loading />
            </div>
        );
    }

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
