import { Route, Routes, Navigate } from "react-router";

import { TechLayout } from "../components/layouts/TechLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";

import { TechProvider } from "../context/TechContext";

import { Chamados } from "../pages/client/Chamados";
import { getUserRole } from "../utils/getUserRole";

export function TechRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute requiredRole="tech">
                        <TechProvider>
                            <TechLayout />
                        </TechProvider>
                    </ProtectedRoute>
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
