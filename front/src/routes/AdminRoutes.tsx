import { Route, Routes, Navigate } from "react-router";

import { AdminLayout } from "../components/layouts/AdminLayout";
import { Chamados } from "../pages/admin/Chamados";
import { Chamado } from "../pages/admin/Chamado";

import { TicketsProvider } from "../context/TicketContext";
import { getUserRole } from "../utils/getUserRole";

export function AdminRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <TicketsProvider>
                        <AdminLayout />
                    </TicketsProvider>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route
                    path="chamados"
                    element={<Chamados role={getUserRole()} />}
                />
                <Route path="chamado/:id" element={<Chamado />} />
                {/* <Route path="tecnicos" element={<Techs />} />
                <Route path="clientes" element={<Clients />} />
                <Route path="services" element={<Services />} /> */}
            </Route>
        </Routes>
    );
}
