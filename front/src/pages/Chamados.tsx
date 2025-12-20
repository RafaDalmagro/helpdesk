import { Table } from "../components/Table";
import { useNavigate } from "react-router";

export function Chamados() {
    const navigate = useNavigate();

    const chamadosData: Chamado[] = [
        {
            id: "00003",
            atualizadoEm: "13/04/25 20:56",
            titulo: "Instalação de Rede",
            servico: "Rede lenta",
            valorTotal: "R$ 180,00",
            tecnico: {
                nome: "Carlos Silva",
                iniciais: "CS",
            },
            status: "encerrado",
        },
        {
            id: "00002",
            atualizadoEm: "12/10/2025 20:56",
            titulo: "Testando",
            servico: "Cobrança",
            valorTotal: "R$ 1.222,00",
            tecnico: {
                nome: "Rafael Lima",
                iniciais: "RL",
            },
            status: "aberto",
        },
        {
            id: "00002",
            atualizadoEm: "12/10/2025 20:56",
            titulo: "Testando",
            servico: "Cobrança",
            valorTotal: "R$ 1.222,00",
            tecnico: {
                nome: "Rafael Lima",
                iniciais: "RL",
            },
            status: "em atendimento",
        },
    ];

    const handleVisualizar = (id: string | number) => {
        navigate(`/chamado/${id}`);
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Meus Chamados
            </h2>

            <div className="overflow-x-auto border border-gray-500 rounded-xl">
                <Table data={chamadosData} onVisualizar={handleVisualizar} />
            </div>
        </section>
    );
}
