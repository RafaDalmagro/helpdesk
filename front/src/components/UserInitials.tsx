import { useState, useRef, useEffect } from "react";
import { CardPerfil } from "./CardPerfil";
import { getInitials } from "../utils/getInitials";

type Props = {
    name?: string;
    email?: string;
    role?: string;
    enablePerfilCard?: boolean;
};

export function UserInitials({ name, email, role, enablePerfilCard }: Props) {
    const [showPerfil, setShowPerfil] = useState(false);

    const userInitials = getInitials(name || "Usuário Sem Nome");

    const handleTogglePerfil = () => {
        setShowPerfil((prev) => !prev);
    };

    if (enablePerfilCard) {
        const wrapperRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (!showPerfil) return;
            function handleClickOutside(event: MouseEvent) {
                if (
                    wrapperRef.current &&
                    !wrapperRef.current.contains(event.target as Node)
                ) {
                    setShowPerfil(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showPerfil]);

        return (
            <div
                ref={wrapperRef}
                className="relative flex md:flex-1 gap-3 items-center h-fit">
                <button
                    type="button"
                    className="flex items-center gap-3 focus:outline-none hover:cursor-pointer hover:opacity-60 transition ease-linear"
                    onClick={handleTogglePerfil}>
                    <span className="flex items-center justify-center bg-purple-800 rounded-4xl size-10 py-2 px-1.5 text-gray-600 text-sm leading-5">
                        {userInitials}
                    </span>
                    {name && !userInitials && (
                        <span className="hidden xl:flex items-center">
                            {name}
                        </span>
                    )}
                    {email && (
                        <div className="hidden md:flex md:flex-col md:justify-center items-center">
                            <span className="text-sm text-gray-600 capitalize">
                                {`Usuário ${role}`}
                            </span>
                            {email && (
                                <span className="text-xs text-gray-400">
                                    {email}
                                </span>
                            )}
                        </div>
                    )}
                </button>
                {showPerfil && <CardPerfil />}
            </div>
        );
    }

    return (
        <div className="flex md:flex-1 gap-3 items-center h-fit">
            <span className="flex items-center justify-center bg-purple-800 rounded-4xl size-10 py-2 px-1.5 text-gray-600 text-sm leading-5">
                {userInitials}
            </span>
            {name && !userInitials && (
                <span className="hidden xl:flex items-center">{name}</span>
            )}
            {role && (
                <div className="hidden md:flex md:flex-col md:justify-center items-center">
                    <span className="text-sm text-gray-600 capitalize">
                        {`Usuário ${role}`}
                    </span>
                    {email && (
                        <span className="text-xs text-gray-400">{email}</span>
                    )}
                </div>
            )}
        </div>
    );
}
