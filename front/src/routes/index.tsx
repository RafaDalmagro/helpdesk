import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { ClientRoutes } from "./ClientRoutes";
import { TechRoutes } from "./TechRoutes";
import { AdminRoutes } from "./AdminRoutes";

const session: UserAPIResponse = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjY0OTU0ODAsImV4cCI6MTc2NjU4MTg4MCwic3ViIjoiYzdkNzM2ZjYtMzdhYi00ZDE4LTlhOTItYzI4ZGEzMGQ3NWU5In0.yGIEYbGcklc5ZRMA4KhY8yxdNGlIHPVoou80VEWr_Mc",
    user: {
        id: "c7d736f6-37ab-4d18-9a92-c28da30d75e9",
        name: "Admin User",
        email: "admin@email.com",
        role: "client",
    },
};

export function Routes() {
    const context = useAuth();
    console.log(context?.session?.user?.role);

    function Route() {
        switch (session.user.role) {
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
