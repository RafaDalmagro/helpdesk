import pranchetaIcon from "../assets/clipboard-list.svg";
import techIcon from "../assets/users.svg";
import clientIcon from "../assets/briefcase-business.svg";
import serviceIcon from "../assets/wrench.svg";

type Props = React.ComponentProps<"button"> & {
    title: string;
    variant?: "chamados" | "tecnicos" | "clientes" | "servicos";
    iconSvg?: string;
    isActive?: boolean;
};

export function ButtonLink({
    title,
    iconSvg,
    variant,
    isActive = false,
    ...rest
}: Props) {
    const variantClasses = {
        chamados: pranchetaIcon,
        tecnicos: techIcon,
        clientes: clientIcon,
        servicos: serviceIcon,
    };

    const iconSrc = variant ? variantClasses[variant] : iconSvg;
    const iconAlt = variant ? `Ícone de ${variant}` : "Ícone";

    return (
        <button
            {...rest}
            className={`flex gap-3 p-3 rounded-lg hover:cursor-pointer hover:opacity-70 transition ease-linear w-full ${
                isActive ? "bg-purple-800" : "bg-inherit"
            }`}>
            {iconSrc && <img src={iconSrc} alt={iconAlt} />}
            <span className="text-sm text-gray-600">{title}</span>
        </button>
    );
}
