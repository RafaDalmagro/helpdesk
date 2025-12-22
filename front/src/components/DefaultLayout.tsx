import { Outlet } from "react-router";
import { Header } from "./Header";

import { useParams } from "react-router";
import { useChamados } from "../context/ChamadosContext";

export function DefaultLayout() {
    const { id } = useParams();
    const { getChamadoById } = useChamados();

    const chamado = id ? getChamadoById(id) : undefined;

    return (
        <div className="w-screen h-screen bg-gray-100 overflow-hidden box-border">
            <main className="flex flex-col h-full w-full md:flex-row md:pt-3 box-border">
                <Header
                    userInitials={chamado?.user.iniciais ?? "US"}
                    userRole={chamado?.user.role ?? "cliente"}
                    userEmail={chamado?.user.email ?? "teste@teste.com"}
                />

                <Outlet />
            </main>
        </div>
    );
}
