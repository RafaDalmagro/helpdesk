import atendendoSvg from "../assets/TagStatusAtendendo.svg";
import resolvidoSvg from "../assets/TagStatusResolvido.svg";
import pendenteSvg from "../assets/TagStatusPendente.svg";
import olhoSvg from "../assets/eye.svg";

type Chamado = {
    id: string | number;
    atualizadoEm: string;
    titulo: string;
    servico: string;
    valorTotal: string;
    tecnico: {
        nome: string;
        iniciais: string;
    };
    status: "pendente" | "atendendo" | "resolvido";
};

type TableProps = {
    data: Chamado[];
    onVisualizar?: (id: string | number) => void;
};

export function Table({ data, onVisualizar }: TableProps) {
    const getStatusIcon = (status: Chamado["status"]) => {
        switch (status) {
            case "pendente":
                return pendenteSvg;
            case "atendendo":
                return atendendoSvg;
            case "resolvido":
                return resolvidoSvg;
            default:
                return pendenteSvg;
        }
    };

    const handleVisualizar = (id: string | number) => {
        if (onVisualizar) {
            onVisualizar(id);
        }
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b border-t border-gray-500">
                    <th className="text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Atualizado em
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Id
                    </th>
                    <th className="text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Título
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Serviço
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Valor total
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Técnico
                    </th>
                    <th className="text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Status
                    </th>
                    <th className="text-left text-sm text-gray-400 font-semibold py-3 px-4">
                        Visualizar
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((chamado) => (
                    <tr key={chamado.id} className="border-b border-gray-500">
                        <td className="text-xs text-gray-200 py-3 px-4">
                            {chamado.atualizadoEm}
                        </td>
                        <td className="text-xs font-bold text-gray-200 hidden md:table-cell py-3 px-4">
                            {chamado.id}
                        </td>
                        <td className="text-sm font-bold text-gray-200 py-3 px-4">
                            {chamado.titulo}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-4">
                            {chamado.servico}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-4">
                            {chamado.valorTotal}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-4">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center bg-purple-800 rounded-full size-10 text-gray-600 text-sm leading-none">
                                    {chamado.tecnico.iniciais}
                                </span>
                                <span>{chamado.tecnico.nome}</span>
                            </div>
                        </td>
                        <td className="py-3 px-4">
                            <img
                                src={getStatusIcon(chamado.status)}
                                alt={`Status ${chamado.status}`}
                            />
                        </td>
                        <td className="py-3 px-4">
                            <img
                                src={olhoSvg}
                                alt="Visualizar"
                                className="cursor-pointer hover:opacity-70 transition-opacity"
                                onClick={() => handleVisualizar(chamado.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
