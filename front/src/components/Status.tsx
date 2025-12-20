import atendendoSvg from "../assets/clock-2.svg";
import encerradoSvg from "../assets/circle-check-big.svg";
import abertoSvg from "../assets/circle-help.svg";

type StatusProps = {
    status: ChamadoStatus;
    className?: string;
};

const STATUS_UI: Record<
    ChamadoStatus,
    { icon: string; bg: string; text: string }
> = {
    aberto: {
        icon: abertoSvg,
        bg: "bg-pink/20",
        text: "text-pink",
    },
    "em atendimento": {
        icon: atendendoSvg,
        bg: "bg-blue/20",
        text: "text-blue",
    },
    encerrado: {
        icon: encerradoSvg,
        bg: "bg-green/20",
        text: "text-green",
    },
};

export function Status({ status, className = "" }: StatusProps) {
    const variant = STATUS_UI[status];

    return (
        <div
            className={`py-3 px-3 flex items-center gap-2 rounded-4xl w-fit ${variant.bg} ${className}`}>
            <img src={variant.icon} alt={`Status ${status}`} />

            <span
                className={`text-sm hidden xl:block font-semibold capitalize ${variant.text}`}>
                {status}
            </span>
        </div>
    );
}
