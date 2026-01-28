import pencilSvg from "../assets/pen-line.svg";

import { Button } from "./Button";
import { UserInitials } from "./UserInitials";
import { Status } from "./Status";

import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";

import { useNavigate } from "react-router";

type TicketsListProps = {
    data: Ticket[];
    onEdit?: (id: string) => void;
    onIniciar?: (id: string) => void;
    onClose?: (id: string) => void;
};

const TICKET_SECTIONS = {
    in_progress: { label: "Em atendimento", status: "in_progress" },
    open: { label: "Aberto", status: "open" },
    closed: { label: "Encerrado", status: "closed" },
};

export function TicketsList({
    data,
    onEdit,
    onIniciar,
    onClose,
}: TicketsListProps) {
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/chamados/${id}`);
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleClose = (id: string) => {
        if (onClose) {
            onClose(id);
        }
    };

    const handleIniciar = (id: string) => {
        if (onIniciar) {
            onIniciar(id);
        }
    };

    const renderSection = (
        sectionKey: string,
        sectionData: (typeof TICKET_SECTIONS)[keyof typeof TICKET_SECTIONS],
    ) => {
        const tickets = data.filter(
            (ticket) => ticket.status === sectionData.status,
        );

        return (
            <div key={sectionKey} className="mb-8">
                <div className="flex items-center mb-4">
                    <Status status={sectionData.status as TicketStatus} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="rounded-lg border border-gray-500 overflow-hidden transition-colors">
                            {/* Header */}
                            <div className="bg-gray-600 pt-5 px-5 flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-bold text-gray-400 truncate">
                                    {ticket.id}
                                </span>
                                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                    <button
                                        onClick={() => handleEdit(ticket.id)}
                                        className="p-2 bg-gray-500 rounded-md hover:opacity-70 hover:cursor-pointer transition-opacity flex items-center justify-center h-8 sm:h-9">
                                        <img
                                            src={pencilSvg}
                                            alt="Editar"
                                            className="size-4 shrink-0"
                                        />
                                    </button>
                                    {ticket.status !== "closed" && (
                                        <Button
                                            onClick={
                                                ticket.status === "in_progress"
                                                    ? () =>
                                                          handleClose(ticket.id)
                                                    : () =>
                                                          handleIniciar(
                                                              ticket.id,
                                                          )
                                            }
                                            svg={
                                                ticket.status === "in_progress"
                                                    ? "encerrar"
                                                    : "iniciar"
                                            }
                                            buttonName={
                                                ticket.status === "in_progress"
                                                    ? "Encerrar"
                                                    : "Iniciar"
                                            }
                                            className="w-fit px-1.5 sm:px-2 text-xs sm:text-sm py-1.5 sm:py-2.5"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="flex flex-col gap-4 bg-gray-600 pb-5 px-5 pt-4">
                                <div className="flex flex-col ">
                                    <p className="text-md font-bold text-gray-200 wrap-break-words">
                                        {ticket.title}
                                    </p>
                                    <p className="text-xs text-gray-200 line-clamp-2">
                                        {ticket.description}
                                    </p>
                                </div>

                                <div className="space-y-1 sm:space-y-2 text-xs text-gray-300">
                                    <div className="flex justify-between gap-2">
                                        <span className="text-xs text-gray-200">
                                            {formatDate(ticket.createdAt)}
                                        </span>
                                        <span className="font-semibold text-sm text-gray-200 text-right">
                                            {formatCurrency(ticket.totalValue)}
                                        </span>
                                    </div>
                                </div>
                                <span className="h-px block bg-gray-500"></span>
                                <div className="flex items-center justify-between gap-2 border-t border-gray-600">
                                    <UserInitials
                                        name={ticket.client?.name || "Cliente"}
                                        email={ticket.client?.email}
                                        variant="with-name"
                                        className="size-5 text-xxs"
                                    />
                                    <Status status={ticket.status} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            {Object.entries(TICKET_SECTIONS).map(([key, section]) =>
                renderSection(key, section),
            )}
        </div>
    );
}
