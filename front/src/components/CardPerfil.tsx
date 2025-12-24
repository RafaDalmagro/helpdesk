import { ButtonLink } from "./ButtonLink";
import { useAuth } from "../hooks/useAuth";

export function CardPerfil() {
    const auth = useAuth();

    return (
        <div className="absolute bg-gray-100 px-3 py-2 md:px-5 md:py-4 flex flex-col gap-2 md:gap-4 rounded-md md:rounded-lg border border-gray-300 z-10 md:w-35 right-0 -bottom-30 md:-right-14/12 md:-bottom-3/12">
            <span className="uppercase font-bold text-gray-400 text-xxs">
                Opções
            </span>
            <ButtonLink
                title="Perfil"
                variant="perfil"
                to="/perfil"
                onClick={() => {}}
            />
            <ButtonLink title="Sair" variant="sair" to="/login" />
        </div>
    );
}
