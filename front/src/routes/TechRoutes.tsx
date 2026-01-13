import { Route, Routes, Navigate } from "react-router";

import { TechLayout } from "../components/layouts/TechLayout";

import { TicketsProvider } from "../context/TicketContext";

import { Chamados } from "../pages/client/Chamados";
import { getUserRole } from "../utils/getUserRole";

export function TechRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <TicketsProvider>
                        <TechLayout />
                    </TicketsProvider>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route
                    path="chamados"
                    element={<Chamados role={getUserRole()} />}
                />
            </Route>
        </Routes>
    );
}
