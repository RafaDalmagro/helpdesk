import { TicketsList } from "../../components/TicketsList";
import { useTickets } from "../../context/TicketContext";

export function Chamados() {
    const { updateTicketStatus, tickets } = useTickets();

    const handleIniciar = async (id: string) => {
        try {
            await updateTicketStatus(id, "in_progress" as TicketStatus);
        } catch (error) {
            console.error("Erro ao iniciar chamado:", error);
            alert("Erro ao iniciar chamado");
        }
    };

    const handleClose = async (id: string) => {
        try {
            await updateTicketStatus(id, "closed" as TicketStatus);
        } catch (error) {
            console.error("Erro ao encerrar chamado:", error);
            alert("Erro ao encerrar chamado");
        }
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border p-6">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Meus chamados
            </h2>
            <TicketsList
                data={tickets}
                onIniciar={handleIniciar}
                onClose={handleClose}
            />
        </section>
    );
}
