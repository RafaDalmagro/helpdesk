import { useState, useRef, useEffect } from "react";
import { CardPerfil } from "./CardPerfil";
import { getInitials } from "../utils/getInitials";

type Props = {
    name?: string;
    email?: string;
    role?: string;
    enablePerfilCard?: boolean;
    variant?: "simple" | "with-name" | "with-details" | "with-profile-card";
    className?: string;
};

export function UserInitials({
    name = "Usuário Sem Nome",
    email,
    variant = "simple",
    enablePerfilCard,
    className = "",
}: Props) {
    const [showPerfil, setShowPerfil] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const effectiveVariant = enablePerfilCard ? "with-profile-card" : variant;
    const initials = getInitials(name);

    useEffect(() => {
        if (!showPerfil) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setShowPerfil(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showPerfil]);

    const avatarClass = `flex items-center justify-center bg-purple-800 rounded-full text-gray-600  shrink-0 ${className} ${
        className.includes("text-sm") ? "text-sm" : "text-xxxs"
    } ${className.includes("size-8") ? "size-8" : "size-5"}`;

    return (
        <div
            ref={wrapperRef}
            className="relative inline-flex items-center gap-3 h-fit">
            {effectiveVariant === "with-profile-card" ? (
                <button
                    type="button"
                    onClick={() => setShowPerfil(!showPerfil)}
                    className="flex items-center gap-3 hover:opacity-80 transition cursor-pointer outline-none">
                    <span className={avatarClass}>{initials}</span>
                    <div className="hidden md:flex flex-col text-left">
                        <span className="text-sm text-gray-600 font-medium capitalize">
                            {name}
                        </span>
                        {email && (
                            <span className="text-xs text-gray-400">
                                {email}
                            </span>
                        )}
                    </div>
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <span className={avatarClass}>{initials}</span>

                    {effectiveVariant === "with-name" && (
                        <span className="text-gray-700">{name}</span>
                    )}

                    {effectiveVariant === "with-details" && (
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-700 font-medium capitalize">
                                {name}
                            </span>
                            {email && (
                                <span className="text-xs text-gray-400">
                                    {email}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {showPerfil && effectiveVariant === "with-profile-card" && (
                <CardPerfil />
            )}
        </div>
    );
}
