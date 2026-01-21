import { Perfil } from "./Perfil";
import { ButtonLink } from "./ButtonLink";
import { useState } from "react";

export function getUserNameEmail(): { name: string; email: string } | null {
    try {
        const userString = localStorage.getItem("@HelpDesk:session:user");
        if (!userString) return null;

        const user = JSON.parse(userString);
        return user;
    } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
        return null;
    }
}

export function CardPerfil() {
    const [isOpen, setIsOpen] = useState(false);

    const user = getUserNameEmail();

    return (
        <div className="absolute bg-gray-100 px-3 py-2 md:px-5 md:py-4 flex flex-col gap-2 md:gap-4 rounded-md md:rounded-lg border border-gray-300 z-10 md:w-35 -right-5 -bottom-31 md:-right-11/12 md:-bottom-6/12">
            <span className="uppercase font-bold text-gray-400 text-xxs">
                Opções
            </span>
            <ButtonLink
                title="Perfil"
                variant="perfil"
                to=""
                onClick={() => {
                    setIsOpen(true);
                }}
            />
            {isOpen && (
                <Perfil
                    name={user?.name}
                    email={user?.email}
                    onClose={() => setIsOpen(false)}
                />
            )}
            <ButtonLink title="Sair" variant="sair" to="/login" />
        </div>
    );
}
