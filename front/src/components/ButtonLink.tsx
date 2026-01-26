import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

import pranchetaIcon from "../assets/clipboard-list.svg";
import techIcon from "../assets/users.svg";
import clientIcon from "../assets/briefcase-business.svg";
import serviceIcon from "../assets/wrench.svg";
import createIcon from "../assets/plus.svg";
import sairIcon from "../assets/logout.svg";
import perfilIcon from "../assets/circle-user.svg";

type Props = {
    title: string;
    variant?:
        | "chamados"
        | "tecnicos"
        | "clientes"
        | "servicos"
        | "create"
        | "perfil"
        | "sair";
    iconSvg?: string;
    to: string;
    onClick?: () => void;
};

export function ButtonLink({ title, iconSvg, variant, to, onClick }: Props) {
    const location = useLocation();
    const isActive = location.pathname === to;

    const auth = useAuth();

    const variantClasses = {
        chamados: pranchetaIcon,
        tecnicos: techIcon,
        clientes: clientIcon,
        servicos: serviceIcon,
        create: createIcon,
        perfil: perfilIcon,
        sair: sairIcon,
    };

    const iconSrc = variant ? variantClasses[variant] : iconSvg;
    const iconAlt = variant ? `Ícone de ${variant}` : "Ícone";

    return (
        <Link
            to={to}
            onClick={
                onClick
                    ? onClick
                    : variant === "sair"
                      ? auth.removeSession
                      : undefined
            }
            className={
                variant !== "sair" && variant !== "perfil"
                    ? `flex gap-3 p-3 rounded-lg hover:cursor-pointer hover:opacity-70 transition ease-linear ${
                          variant === "create"
                              ? "bg-gray-200"
                              : isActive
                                ? "bg-purple-800"
                                : "bg-inherit"
                      }`
                    : `flex gap-2 w-20 p-0 rounded-lg hover:cursor-pointer hover:opacity-70 transition ease-linear ${
                          isActive ? "bg-purple-800" : "bg-inherit"
                      }`
            }>
            {iconSrc && <img src={iconSrc} alt={iconAlt} />}
            <span
                className={
                    variant === "sair"
                        ? "text-sm md:text-md text-red"
                        : variant === "perfil"
                          ? "text-sm md:text-md text-gray-500"
                          : "text-sm text-gray-600"
                }>
                {title}
            </span>
        </Link>
    );
}
