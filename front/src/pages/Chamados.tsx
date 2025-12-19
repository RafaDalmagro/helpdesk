import { Table } from "../components/Table";

export function Chamados() {
    // Dados de exemplo - substitua por dados reais da API
    const chamadosData = [
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
            status: "pendente" as const,
        },
        {
            id: 12,
            atualizadoEm: "12/10/2025 20:56",
            titulo: "Testando",
            servico: "Cobrança",
            valorTotal: "R$ 1.222,00",
            tecnico: {
                nome: "Rafael Lima",
                iniciais: "RL",
            },
            status: "pendente" as const,
        },
        // Adicione mais chamados aqui
    ];

    const handleVisualizar = (id: string | number) => {
        console.log("Visualizar chamado:", id);
        // Implemente a lógica de visualização aqui
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Meus Chamados
            </h2>

            <div className="overflow-x-auto border border-gray-400 rounded-xl">
                <Table data={chamadosData} onVisualizar={handleVisualizar} />
            </div>
        </section>
    );
}
