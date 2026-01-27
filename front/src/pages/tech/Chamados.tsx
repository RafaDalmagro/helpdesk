import { TicketsList } from "../../components/TicketsList";
import { useTicket } from "../../hooks/useTicket";

export function Chamados() {
    const { tickets } = useTicket();

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border p-6">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Meus chamados
            </h2>
            <TicketsList data={tickets} />
        </section>
    );
}
