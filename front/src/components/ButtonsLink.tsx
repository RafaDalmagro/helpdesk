import { Link, useLocation } from "react-router";

import pranchetaIcon from "../assets/clipboard-list.svg";
import techIcon from "../assets/users.svg";
import clientIcon from "../assets/briefcase-business.svg";
import serviceIcon from "../assets/wrench.svg";
import createIcon from "../assets/plus.svg";

type Props = {
    title: string;
    variant?: "chamados" | "tecnicos" | "clientes" | "servicos" | "create";
    iconSvg?: string;
    to: string;
};

export function ButtonLink({ title, iconSvg, variant, to }: Props) {
    const location = useLocation();
    const isActive = location.pathname === to;

    const variantClasses = {
        chamados: pranchetaIcon,
        tecnicos: techIcon,
        clientes: clientIcon,
        servicos: serviceIcon,
        create: createIcon,
    };

    const iconSrc = variant ? variantClasses[variant] : iconSvg;
    const iconAlt = variant ? `Ícone de ${variant}` : "Ícone";

    return (
        <Link
            to={to}
            className={`flex gap-3 p-3 rounded-lg hover:cursor-pointer hover:opacity-70 transition ease-linear w-full ${
                isActive ? "bg-purple-800" : "bg-inherit"
            }`}>
            {iconSrc && <img src={iconSrc} alt={iconAlt} />}
            <span className="text-sm text-gray-600">{title}</span>
        </Link>
    );
}
