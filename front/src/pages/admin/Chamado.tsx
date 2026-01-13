import { Voltar } from "../../components/VoltarLink";
import { Info } from "../../components/Info";
import { Button } from "../../components/Button";

import { useParams } from "react-router";
import { useTickets } from "../../context/TicketContext";

export function Chamado() {
    const { id } = useParams();
    const { getTicketById } = useTickets();
    const ticket = id ? getTicketById(id) : undefined;

    if (!ticket) return <div>Chamado não encontrado</div>;

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
                        <Button
                            svg="encerrar"
                            variant="primary"
                            buttonName="Encerrar"
                            className="h-fit flex-1 px-4"
                        />
                        <Button
                            svg="iniciar"
                            buttonName="Iniciar atendimento"
                            className="h-fit flex-2 px-4"
                        />
                    </div>
                </header>

                <Info chamado={ticket} />
            </div>
        </article>
    );
}
