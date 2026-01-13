import { ButtonLink } from "./ButtonLink";

import { useAuth } from "../hooks/useAuth";

export function Menu() {
    const { session, isLoading } = useAuth();

    if (!session?.userWithoutPassword?.role) {
        return;
    }
    switch (session.userWithoutPassword.role) {
        case "admin":
            return (
                <nav className="hidden md:flex md:flex-col md:gap-1 border-t border-b border-gray-200 w-full py-5 px-4 md:flex-10">
                    <ButtonLink
                        title="Meus Chamados"
                        variant="chamados"
                        to="/chamados"
                    />
                    <ButtonLink
                        title="Técnicos"
                        variant="tecnicos"
                        to="/tecnicos"
                    />
                    <ButtonLink
                        title="Clientes"
                        variant="clientes"
                        to="/clientes"
                    />
                    <ButtonLink
                        title="Serviços"
                        variant="servicos"
                        to="/servicos"
                    />
                </nav>
            );
        case "tech":
            return (
                <nav className="hidden md:flex md:flex-col md:gap-1 border-t border-b border-gray-200 w-full py-5 px-4 md:flex-10">
                    <ButtonLink
                        title="Meus Chamados"
                        variant="chamados"
                        to="/chamados"
                    />
                </nav>
            );
        case "client":
            return (
                <nav className="hidden md:flex md:flex-col md:gap-1 border-t border-b border-gray-200 w-full py-5 px-4 md:flex-10">
                    <ButtonLink
                        title="Meus Chamados"
                        variant="chamados"
                        to="/chamados"
                    />
                    <ButtonLink
                        title="Criar chamado"
                        variant="create"
                        to="/novo-chamado"
                    />
                </nav>
            );
        default:
            return (
                <nav className="hidden md:flex md:flex-col md:gap-1 border-t border-b border-gray-200 w-full py-5 px-4 md:flex-10">
                    <ButtonLink
                        title="Meus Chamados"
                        variant="chamados"
                        to="/chamados"
                    />
                    <ButtonLink
                        title="Criar chamado"
                        variant="create"
                        to="/novo-chamado"
                    />
                </nav>
            );
    }
}
