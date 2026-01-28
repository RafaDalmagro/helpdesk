import encerrarSvg from "../assets/circle-check-big-gray.svg";
import iniciarSvg from "../assets/clock-2-white.svg";
import deleteSvg from "../assets/trash.svg";
import newSvg from "../assets/plus-white.svg";

type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean;
    variant?: "default" | "primary";
    svg?: "encerrar" | "iniciar" | "delete" | "new";
    buttonName?: string;
    className?: string;
};

export function Button({
    isLoading,
    className,
    type = "button",
    variant = "default",
    buttonName,
    svg,
    ...rest
}: Props) {
    const variantClasses = {
        default: "bg-gray-200 text-gray-600 hover:bg-gray-300",
        primary: "bg-gray-500 text-gray-200 hover:bg-gray-400",
    };

    const widthClass = className?.includes("w-fit") ? "" : "w-full";

    return (
        <button
            className={`flex gap-2 justify-center items-center ${widthClass} py-2.5 text-nowrap rounded-md text-sm font-bold cursor-pointer transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed ${
                variantClasses[variant]
            } ${className || ""}`}
            type={type}
            disabled={isLoading}
            {...rest}>
            {svg === "encerrar" ? (
                <img
                    src={encerrarSvg}
                    alt="Ícone de encerrar chamado"
                    className="size-4"
                />
            ) : svg === "iniciar" ? (
                <img
                    src={iniciarSvg}
                    alt="Ícone de iniciar atendimento"
                    className="size-4"
                />
            ) : svg === "delete" ? (
                <img
                    src={deleteSvg}
                    alt="Ícone de deletar"
                    className="size-4"
                />
            ) : svg === "new" ? (
                <img src={newSvg} alt="Ícone de novo" className="size-4" />
            ) : null}
            {buttonName}
        </button>
    );
}
