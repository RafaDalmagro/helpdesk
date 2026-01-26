import { Route, Routes, Navigate } from "react-router";

import { AdminLayout } from "../components/layouts/AdminLayout";

import { Chamados } from "../pages/admin/Chamados";
import { Chamado } from "../pages/admin/Chamado";
import { Tecnicos } from "../pages/admin/Tecnicos";
import { Tecnico } from "../pages/admin/Tecnico";
import { NovoTecnico } from "../pages/admin/NovoTecnico";
import { Clientes } from "../pages/admin/Clientes";
import { Servicos } from "../pages/admin/Servicos";

import { TicketsProvider } from "../context/TicketContext";
import { TechProvider } from "../context/TechContext";

import { Outlet } from "react-router";

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
                    element={
                        <TechProvider>
                            <Outlet />
                        </TechProvider>
                    }>
                    <Route path="tecnicos" element={<Tecnicos />} />
                    <Route path="users/:id" element={<Tecnico />} />
                </Route>
                <Route path="novo-tecnico" element={<NovoTecnico />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="servicos" element={<Servicos />} />
            </Route>
        </Routes>
    );
}
