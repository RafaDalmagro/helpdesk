import atendendoSvg from "../assets/clock-2.svg";
import encerradoSvg from "../assets/circle-check-big.svg";
import abertoSvg from "../assets/circle-help.svg";

type StatusProps = {
    status: TicketStatus;
    className?: string;
};

const STATUS_UI: Record<
    TicketStatus,
    { icon: string; bg: string; text: string }
> = {
    open: {
        icon: abertoSvg,
        bg: "bg-pink/20",
        text: "text-pink",
    },
    in_progress: {
        icon: atendendoSvg,
        bg: "bg-blue/20",
        text: "text-blue",
    },
    closed: {
        icon: encerradoSvg,
        bg: "bg-green/20",
        text: "text-green",
    },
};

export function Status({ status, className = "" }: StatusProps) {
    const variant = STATUS_UI[status];

    return (
        <div
            className={`p-1.5 lg:px-3 flex items-center gap-2 rounded-full w-fit shrink-0 ${variant.bg}`}>
            <img
                src={variant.icon}
                alt={`Status ${status}`}
                className="size-4 shrink-0"
            />

            <span
                className={`text-xs font-semibold whitespace-nowrap max-[500px]:hidden block capitalize ${variant.text} ${className}`}>
                {status === "open"
                    ? "Aberto"
                    : status === "in_progress"
                    ? "Em Andamento"
                    : "Encerrado"}
            </span>
        </div>
    );
}
