import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { ClientRoutes } from "./ClientRoutes";

export function Routes() {
    const context = useAuth();

    return (
        <BrowserRouter>
            <ClientRoutes />
        </BrowserRouter>
    );
}
