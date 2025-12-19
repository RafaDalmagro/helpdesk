import { Route, Routes, Navigate } from "react-router";

import { DefaultLayout } from "../components/DefaultLayout";
import { Chamados } from "../pages/Chamados";
import { NewTicket } from "../pages/NewTicket";

export function ClientRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Navigate to="/chamados" replace />} />
                <Route path="/chamados" element={<Chamados />} />
                <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
        </Routes>
    );
}
