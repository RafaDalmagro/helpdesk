import { Route, Routes, Navigate } from "react-router";

import { TechLayout } from "../components/layouts/TechLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";

import { TicketsProvider } from "../context/TicketContext";
import { ServiceProvider } from "../context/ServiceContext";

import { Chamados } from "../pages/tech/Chamados";
import { ChamadoDetail } from "../pages/tech/ChamadoDetail";

export function TechRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="tech">
                        <TicketsProvider>
                            <ServiceProvider>
                                <TechLayout />
                            </ServiceProvider>
                        </TicketsProvider>
                    </ProtectedRoute>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route path="chamados" element={<Chamados />} />
                <Route path="chamados/:id" element={<ChamadoDetail />} />
            </Route>
        </Routes>
    );
}
