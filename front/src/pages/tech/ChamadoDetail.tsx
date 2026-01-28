import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import { Voltar } from "../../components/VoltarLink";
import { TicketInfoTech } from "../../components/TicketInfoTech";

import { api } from "../../services/api";
import { AxiosError } from "axios";

import { useParams } from "react-router";
import { useState, useEffect } from "react";

import { useTickets } from "../../context/TicketContext";

export function ChamadoDetail() {
    const { id } = useParams();
    const { getTicketById, loading } = useTickets();
    const ticketDoContexto = id ? getTicketById(id) : undefined;

    const [ticket, setTicket] = useState<Ticket | undefined>(ticketDoContexto);

    useEffect(() => {
        if (ticketDoContexto) {
            setTicket(ticketDoContexto);
        }
    }, [ticketDoContexto]);

    async function handleEncerrarChamado() {
        try {
            if (!confirm("Tem certeza que deseja encerrar este chamado?")) {
                return;
            }
            await api.patch(`/tickets/${ticket?.id}/status`, {
                status: "closed",
            });

            setTicket((prev) =>
                prev ? { ...prev, status: "closed" as TicketStatus } : prev,
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
            await api.patch(`/tickets/${ticket?.id}/status`, {
                status: "in_progress",
            });

            setTicket((prev) =>
                prev
                    ? { ...prev, status: "in_progress" as TicketStatus }
                    : prev,
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

    if (!ticket) {
        return (
            <section className="flex flex-1 bg-gray-600 rounded-t-xl md:rounded-t-none md:rounded-tl-xl flex-col gap-4 overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
                <header className="flex flex-col md:flex-row gap-4 justify-between max-w-4xl w-full">
                    <div className="flex flex-col gap-1">
                        <Voltar title="Voltar" />
                        <h2 className="text-xl text-purple-800 font-bold">
                            Chamado não encontrado.
                        </h2>
                    </div>
                </header>
            </section>
        );
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="flex flex-1 bg-gray-600 rounded-t-xl md:rounded-t-none md:rounded-tl-xl flex-col gap-4 overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
            <header className="flex flex-col md:flex-row gap-4 justify-between  w-full">
                <div className="flex flex-col gap-1">
                    <Voltar title="Voltar" />
                    <h2 className="text-xl text-purple-800 font-bold">
                        Chamado detalhado
                    </h2>
                </div>
                <div className="flex gap-2 items-center">
                    {ticket.status !== "closed" && (
                        <Button
                            onClick={handleEncerrarChamado}
                            variant="primary"
                            svg="encerrar"
                            buttonName="Encerrar"
                            className="w-full md:h-fit px-4 md:w-fit"
                        />
                    )}
                    {ticket.status !== "closed" &&
                        ticket.status !== "in_progress" && (
                            <Button
                                onClick={handleIniciarAtendimento}
                                buttonName="Iniciar atendimento"
                                svg="iniciar"
                                type="submit"
                                className="w-full md:h-fit px-4 md:w-fit"
                            />
                        )}
                </div>
            </header>
            <div className="">
                <TicketInfoTech chamado={ticket} />
            </div>
        </section>
    );
}
