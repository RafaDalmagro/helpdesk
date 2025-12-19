import { Route, Routes } from "react-router";

import { NewTicket } from "../pages/NewTicket";
import { DefaultLayout } from "../components/DefaultLayout";

export function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<NewTicket />} />
            </Route>
        </Routes>
    );
}
