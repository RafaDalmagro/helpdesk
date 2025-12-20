import { Voltar } from "../components/VoltarLink";
import { Info } from "../components/Info";

import { useParams } from "react-router";
import { useChamados } from "../context/ChamadosContext";

export function Chamado() {
    const { id } = useParams();
    const { getChamadoById } = useChamados();

    const chamado = id ? getChamadoById(id) : undefined;

    if (!chamado) return <div>Chamado não encontrado</div>;

    return (
        <article className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7 gap-4">
            <header className="flex flex-col gap-1">
                <Voltar title="Voltar" to="/chamados" />

                <h2 className="text-2xl text-purple-800 font-bold">
                    Chamado detalhado
                </h2>
            </header>

            <Info chamado={chamado} />
        </article>
    );
}
