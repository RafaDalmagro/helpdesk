import { Route, Routes, Navigate } from "react-router";

import { DefaultLayout } from "../components/layouts/DefaultLayout";

import { TicketsProvider } from "../context/TicketContext";

import { Chamados } from "../pages/client/Chamados";
import { Chamado } from "../pages/client/Chamado";
import { NovoChamado } from "../pages/client/NovoChamado";
import { getUserRole } from "../utils/getUserRole";

export function ClientRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <TicketsProvider>
                        <DefaultLayout />
                    </TicketsProvider>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route
                    path="chamados"
                    element={<Chamados role={getUserRole()} />}
                />
                <Route path="chamado/:id" element={<Chamado />} />
                <Route path="novo-chamado" element={<NovoChamado />} />
            </Route>
        </Routes>
    );
}
