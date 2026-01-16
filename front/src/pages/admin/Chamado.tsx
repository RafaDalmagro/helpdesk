import { Voltar } from "../../components/VoltarLink";
import { Info } from "../../components/Info";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useTickets } from "../../context/TicketContext";

export function Chamado() {
    const { id } = useParams();
    const { getTicketById } = useTickets();

    const ticketDoContexto = id ? getTicketById(id) : undefined;

    const [ticketAtual, setTicketAtual] = useState<Ticket | undefined>(
        ticketDoContexto
    );

    useEffect(() => {
        if (ticketDoContexto) {
            setTicketAtual(ticketDoContexto);
        }
    }, [ticketDoContexto]);

    if (!ticketAtual) return <div>Chamado não encontrado</div>;

    async function handleEncerrarChamado() {
        try {
            if (!confirm("Tem certeza que deseja encerrar este chamado?")) {
                return;
            }
            await api.patch(`/tickets/${ticketAtual?.id}/status`, {
                status: "closed",
            });

            setTicketAtual((prev) =>
                prev ? { ...prev, status: "closed" as TicketStatus } : prev
            );
        } catch (error) {
            tratarErro(error, "encerrar chamado");
        }
    }

    async function handleIniciarAtendimento() {
        try {
            if (!confirm("Deseja iniciar o atendimento deste chamado?")) {
                return;
            }
            await api.patch(`/tickets/${ticketAtual?.id}/status`, {
                status: "in_progress",
            });

            setTicketAtual((prev) =>
                prev ? { ...prev, status: "in_progress" as TicketStatus } : prev
            );
        } catch (error) {
            tratarErro(error, "iniciar atendimento");
        }
    }
    function tratarErro(error: unknown, contexto: string) {
        if (error instanceof AxiosError) {
            const errorMessage =
                error.response?.data?.message || `Axios Error ao ${contexto}`;
            console.log(errorMessage);
        } else {
            console.error(`Erro ao ${contexto}:`, error);
        }
    }

    return (
        <article className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 md:items-stretch lg:items-center">
            <div className="flex flex-col gap-4 md:gap-6 lg:w-200">
                <header className="flex gap-4 justify-between">
                    <div className="flex flex-col gap-1">
                        <Voltar title="Voltar" to="/chamados" />
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
                                variant="primary"
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
