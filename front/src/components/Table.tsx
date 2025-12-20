import olhoSvg from "../assets/eye.svg";

import { Status } from "./Status";

type TableProps = {
    data: Chamado[];
    onVisualizar?: (id: string | number) => void;
};

export function Table({ data, onVisualizar }: TableProps) {
    const handleVisualizar = (id: string | number) => {
        if (onVisualizar) {
            onVisualizar(id);
        }
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="border-b border-t border-gray-500">
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Atualizado em
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Id
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Título
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Serviço
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Valor total
                    </th>
                    <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Técnico
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Status
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((chamado) => (
                    <tr key={chamado.id} className="border-b border-gray-500">
                        <td className="text-xs font-medium text-gray-200 py-3 px-3">
                            {chamado.atualizadoEm}
                        </td>
                        <td className="text-xs font-bold text-gray-200 hidden md:table-cell py-3 px-3">
                            {chamado.id}
                        </td>
                        <td className="text-sm font-bold text-gray-200 py-3 px-3">
                            {chamado.titulo}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-3">
                            {chamado.servico}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-3">
                            {chamado.valorTotal}
                        </td>
                        <td className="text-sm text-gray-200 hidden md:table-cell py-3 px-3">
                            <div className="flex items-center justify-start gap-2">
                                <span className="flex items-center justify-center bg-purple-800 rounded-full text-gray-600 text-xxs leading-none h-5 w-5">
                                    {chamado.tecnico.iniciais}
                                </span>
                                <span className="hidden xl:block">
                                    {chamado.tecnico.nome}
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-3">
                            <Status status={chamado.status} />
                        </td>
                        <td className="px-3 py-4.5 flex items-center justify-center">
                            <span
                                className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                onClick={() => handleVisualizar(chamado.id)}>
                                <img src={olhoSvg} alt="Visualizar" />
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
