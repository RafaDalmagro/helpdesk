import logoSvg from "../assets/logo.svg";
import toggle from "../assets/toggle.svg";

import { Menu } from "./Menu";
import { UserInitials } from "./UserInitials";

export function Header({
    role,
    email,
    name,
}: {
    role?: string;
    email?: string;
    name?: string;
}) {
    return (
        <header>
            <nav className="flex md:flex-col justify-between items-center box-border p-6 md:p-0 md:h-full">
                <div className="flex md:lex-1 gap-4 items-center md:py-6 w-full md:justify-center md:px-5">
                    <img
                        src={toggle}
                        alt="Icone toggle"
                        className="h-11 md:hidden"
                    />
                    <div className="flex gap-3 items-center">
                        <img src={logoSvg} alt="Logo" className="h-11" />
                        <div className="flex flex-col">
                            <h1 className="text-lg text-gray-600 font-bold">
                                HelpDesk
                            </h1>
                            <span className="text-xxs text-purple-100 uppercase font-bold">
                                {role}
                            </span>
                        </div>
                    </div>
                </div>

                <Menu />

                <div className="flex md:py-5 md:px-5">
                    <UserInitials
                        enablePerfilCard={true}
                        role={role}
                        name={name}
                        email={email}
                        variant="with-details"
                        className="size-8 text-sm"
                    />
                </div>
            </nav>
        </header>
    );
}
