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
    role,
    variant,
    enablePerfilCard,
    className = "",
}: Props) {
    const effectiveVariant = enablePerfilCard
        ? "with-profile-card"
        : variant || "simple";
    const [showPerfil, setShowPerfil] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const userInitials = getInitials(name);

    useEffect(() => {
        if (!showPerfil || effectiveVariant !== "with-profile-card") return;

        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowPerfil(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showPerfil, effectiveVariant]);

    const handleTogglePerfil = () => {
        setShowPerfil((prev) => !prev);
    };

    if (effectiveVariant === "simple") {
        return (
            <div
                className={`flex items-center ${
                    className.includes("h-full") ? "h-full" : "h-fit"
                }`}>
                <span
                    className={`flex items-center justify-center bg-purple-800 rounded-full size-10 text-white text-sm font-medium ${className}`}>
                    {userInitials}
                </span>
            </div>
        );
    }

    if (effectiveVariant === "with-name") {
        return (
            <div className="flex md:flex-1 gap-3 items-center h-fit">
                <span className="flex items-center justify-center bg-purple-800 rounded-full size-10 text-white text-sm font-medium">
                    {userInitials}
                </span>
                <span className="hidden xl:flex items-center text-gray-700">
                    {name}
                </span>
            </div>
        );
    }

    if (effectiveVariant === "with-details") {
        return (
            <div className="flex md:flex-1 gap-3 items-center h-fit">
                <span className="flex items-center justify-center bg-purple-800 rounded-full size-10 text-white text-sm font-medium">
                    {userInitials}
                </span>
                <div className="flex flex-col justify-center">
                    <span className="text-sm text-gray-700 capitalize font-medium">
                        {name}
                    </span>
                    {email && (
                        <span className="text-xs text-gray-400">{email}</span>
                    )}
                </div>
            </div>
        );
    }

    if (effectiveVariant === "with-profile-card") {
        return (
            <div
                ref={wrapperRef}
                className="relative flex md:flex-1 gap-3 items-center h-fit">
                <button
                    type="button"
                    className="flex items-center gap-3 focus:outline-none hover:cursor-pointer hover:opacity-70 transition ease-linear"
                    onClick={handleTogglePerfil}>
                    <span className="flex items-center justify-center bg-purple-800 rounded-full size-10 text-white text-sm font-medium">
                        {userInitials}
                    </span>
                    {(name || email) && (
                        <div className="hidden md:flex md:flex-col md:justify-center">
                            <span className="text-sm text-gray-600 capitalize font-medium">
                                {name}
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

    return null;
}
