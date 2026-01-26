import logoSvg from "../assets/logo.svg";
import toggle from "../assets/toggle.svg";

import { Menu } from "./Menu";
import { UserInitials } from "./UserInitials";
import { Toggle } from "./Toggle";

import { useState } from "react";

export function Header({
    role,
    email,
    name,
}: {
    role?: string;
    email?: string;
    name?: string;
}) {
    const [isToggleOpen, setIsToggleOpen] = useState(false);

    return (
        <>
            <header>
                <nav className="relative flex md:flex-col justify-between items-center box-border p-6 md:p-0 md:h-full">
                    <div className="flex md:flex-1 gap-4 items-center md:py-6 w-full md:justify-center md:px-5">
                        <Toggle
                            icon={toggle}
                            onClick={() => {
                                setIsToggleOpen((prev) => !prev);
                            }}
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

                    <Menu
                        className={`hidden md:static md:bg-transparent md:shadow-none md:opacity-100 md:translate-y-0 md:visible md:block`}
                    />

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

            <Menu
                className={`w-full bg-gray-100 overflow-hidden transition-all duration-300 ease-in-out md:hidden
                    ${
                        isToggleOpen
                            ? "max-h-96 opacity-100 py-5"
                            : "max-h-0 opacity-0"
                    }`}
            />
        </>
    );
}
