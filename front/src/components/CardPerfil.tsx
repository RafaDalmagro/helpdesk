import { ButtonLink } from "./ButtonLink";

export function CardPerfil() {
    return (
        <div className="bg-gray-100 px-5 py-4 flex flex-col gap-4 rounded-lg border border-gray-300 z-10 w-35 absolute left-2 top-2 md:left-2 md:bottom-2 md:top-auto">
            <span className="uppercase font-bold text-gray-400 text-xxs">
                Opções
            </span>
            <ButtonLink title="Perfil" variant="perfil" to="/perfil" />
            <ButtonLink title="Sair" variant="sair" to="/login" />
        </div>
    );
}
