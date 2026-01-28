import { Voltar } from "../../components/VoltarLink";
import { Info } from "../../components/Info";
import { Button } from "../../components/Button";

import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useTickets } from "../../context/TicketContext";

export function Chamado() {
    const { id } = useParams();
    const { getTicketById, updateTicketStatus } = useTickets();

    const ticketDoContexto = id ? getTicketById(id) : undefined;

    const [ticketAtual, setTicketAtual] = useState<Ticket | undefined>(
        ticketDoContexto,
    );

    useEffect(() => {
        if (ticketDoContexto) {
            setTicketAtual(ticketDoContexto);
        }
    }, [ticketDoContexto]);

    if (!ticketAtual) return <div>Chamado não encontrado</div>;

    async function handleEncerrarChamado() {
        if (!ticketAtual) return;

        try {
            if (!confirm("Tem certeza que deseja encerrar este chamado?")) {
                return;
            }
            await updateTicketStatus(ticketAtual.id, "closed" as TicketStatus);
            setTicketAtual((prev) =>
                prev ? { ...prev, status: "closed" as TicketStatus } : prev,
            );
        } catch (error) {
            console.error("Erro ao encerrar chamado:", error);
            alert("Erro ao encerrar chamado");
        }
    }

    async function handleIniciarAtendimento() {
        if (!ticketAtual) return;

        try {
            if (!confirm("Deseja iniciar o atendimento deste chamado?")) {
                return;
            }
            await updateTicketStatus(
                ticketAtual.id,
                "in_progress" as TicketStatus,
            );
            setTicketAtual((prev) =>
                prev
                    ? { ...prev, status: "in_progress" as TicketStatus }
                    : prev,
            );
        } catch (error) {
            console.error("Erro ao iniciar atendimento:", error);
            alert("Erro ao iniciar atendimento");
        }
    }

    return (
        <article className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 md:items-stretch lg:items-center">
            <div className="flex flex-col gap-4 md:gap-6 lg:w-200">
                <header className="flex gap-4 justify-between">
                    <div className="flex flex-col gap-1">
                        <Voltar title="Voltar" />
                        <h2 className="text-xl text-purple-800 font-bold">
                            Chamado detalhado
                        </h2>
                    </div>

                    <div className="flex gap-2 items-center">
                        {ticketAtual.status === "open" && (
                            <Button
                                svg="iniciar"
                                variant="primary"
                                buttonName="Iniciar atendimento"
                                className="h-fit px-4 w-fit"
                                onClick={handleIniciarAtendimento}
                            />
                        )}
                        {ticketAtual.status !== "closed" && (
                            <Button
                                svg="encerrar"
                                variant="primary"
                                buttonName="Encerrar"
                                className="h-fit px-4 w-fit"
                                onClick={handleEncerrarChamado}
                            />
                        )}

                        {ticketAtual.status === "closed" && (
                            <Button
                                svg="iniciar"
                                variant="default"
                                buttonName="Reabrir chamado"
                                className="h-fit px-4 w-fit"
                                onClick={handleIniciarAtendimento}
                            />
                        )}
                    </div>
                </header>

                <Info chamado={ticketAtual} />
            </div>
        </article>
    );
}
