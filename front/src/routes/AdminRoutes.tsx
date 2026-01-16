import { Route, Routes, Navigate } from "react-router";

import { AdminLayout } from "../components/layouts/AdminLayout";
import { Chamados } from "../pages/admin/Chamados";
import { Chamado } from "../pages/admin/Chamado";
import { Tecnicos } from "../pages/admin/Tecnicos";
import { Clientes } from "../pages/admin/Clientes";
import { Servicos } from "../pages/admin/Servicos";

import { TicketsProvider } from "../context/TicketContext";
import { TechProvider } from "../context/TechContext";
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
                <Route
                    path="tecnicos"
                    element={
                        <TechProvider>
                            <Tecnicos />
                        </TechProvider>
                    }
                />
                <Route path="clientes" element={<Clientes />} />
                <Route path="servicos" element={<Servicos />} />
            </Route>
        </Routes>
    );
}
