import logoSvg from "../assets/logo.svg";
import toggle from "../assets/toggle.svg";

import { Menu } from "./Menu";

export function Header() {
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
                                Técnico
                            </span>
                        </div>
                    </div>
                </div>

                <Menu />

                <div className="flex md:flex-1 gap-3 md:py-5 md:px-5">
                    <span className="flex items-center justify-center bg-purple-800 rounded-4xl size-10 py-2 px-1.5 text-gray-600 text-sm leading-5">
                        RD
                    </span>
                    <div className="hidden md:flex md:flex-col md:justify-center">
                        <span className="text-sm text-gray-600">
                            Usuário Técnico
                        </span>
                        <span className="text-xs text-gray-400">
                            user.tech@test.com
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    );
}
