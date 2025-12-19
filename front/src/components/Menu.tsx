import { ButtonLink } from "./ButtonsLink";

export function Menu() {
    return (
        <nav className="hidden md:flex md:flex-col md:gap-1 border-t border-b border-gray-200 w-full py-5 px-4 md:flex-10">
            <ButtonLink title="Meus Chamados" variant="chamados" isActive />
        </nav>
    );
}
