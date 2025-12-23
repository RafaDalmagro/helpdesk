import { Route, Routes, Navigate } from "react-router";

import { DefaultLayout } from "../components/layouts/DefaultLayout";

import { ChamadosProvider } from "../context/ChamadosContext";

import { Chamados } from "../pages/client/Chamados";
import { Chamado } from "../pages/client/Chamado";
import { NovoChamado } from "../pages/client/NovoChamado";

export function ClientRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ChamadosProvider>
                        <DefaultLayout />
                    </ChamadosProvider>
                }>
                <Route index element={<Navigate to="/chamados" replace />} />
                <Route path="chamados" element={<Chamados />} />
                <Route path="chamado/:id" element={<Chamado />} />
                <Route path="novo-chamado" element={<NovoChamado />} />
            </Route>
        </Routes>
    );
}
