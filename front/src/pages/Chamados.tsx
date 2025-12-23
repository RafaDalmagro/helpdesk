import { useNavigate } from "react-router";

import { Table } from "../components/Table";

import { useChamados } from "../context/ChamadosContext";
import { useChamado } from "../hooks/useChamado";

export function Chamados() {
    const navigate = useNavigate();

    const { chamados } = useChamados();
    const { chamados: chamadosData, loading, error } = useChamado();

    console.log(chamadosData);

    const handleVisualizar = (id: string | number) => {
        navigate(`/chamado/${id}`);
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Meus Chamados
            </h2>

            <div className="overflow-x-auto border border-gray-500 rounded-xl">
                <Table data={chamados} onVisualizar={handleVisualizar} />
            </div>
        </section>
    );
}
