import { BrowserRouter } from "react-router";

import { AuthRoutes } from "./AuthRoutes";
import { ClientRoutes } from "./ClientRoutes";

export function Routes() {
    return (
        <BrowserRouter>
            <AuthRoutes />
        </BrowserRouter>
    );
}
