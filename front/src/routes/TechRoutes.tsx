import { Route, Routes, Navigate } from "react-router";

import { TechLayout } from "../components/layouts/TechLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";

import { TicketsProvider } from "../context/TicketContext";

import { Chamados } from "../pages/tech/Chamados";

export function TechRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="tech">
                        <TicketsProvider>
                            <TechLayout />
                        </TicketsProvider>
                    </ProtectedRoute>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route path="chamados" element={<Chamados />} />
            </Route>
        </Routes>
    );
}
