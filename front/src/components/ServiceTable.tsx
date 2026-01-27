import pencilSvg from "../assets/pen-line.svg";
import curcleChecSvg from "../assets/circle-check.svg";
import banSvg from "../assets/ban.svg";

import { Status } from "./Status";
import { formatCurrency } from "../utils/formatCurrency";
import { useServices } from "../hooks/useServices";

type TableProps = {
    data: Service[];
    onVisualizar?: (id: string) => void;
    inativateService?: (id: string) => void;
};

export function ServiceTable({
    data,
    onVisualizar,
    inativateService,
}: TableProps) {
    const handleVisualizar = (id: string) => {
        if (onVisualizar) {
            onVisualizar(id);
        }
    };

    const handleInativate = (id: string) => {
        if (inativateService) {
            inativateService(id);
        }
    };

    const { services } = useServices();

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="grid grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-[4fr_1fr_1fr_2fr] items-center border-b border-t border-gray-500">
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Titulo
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Valor
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Status
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3 justify-self-end"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((service) => (
                    <tr
                        key={service.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr] md:grid-cols-[4fr_1fr_1fr_2fr] items-center border-b border-gray-500">
                        <td className="text-sm text-gray-200 md:flex md:p-3 p-2">
                            {service.name}
                        </td>
                        <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                            {formatCurrency(service.price)}
                        </td>
                        <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                            <Status status={service.isActive} />
                        </td>
                        <td className="flex gap-2 md:px-3 md:py-4.5 px-2 py-3.5 justify-self-end">
                            <div className="flex h-full items-center gap-2">
                                <button className="hover:cursor-pointer flex gap-1" onClick={}>
                                    <img
                                        className="size-3.5 shrink-0"
                                        src={
                                            service.isActive
                                                ? banSvg
                                                : curcleChecSvg
                                        }
                                        alt={
                                            service.isActive
                                                ? "Ativo"
                                                : "Inativo"
                                        }
                                    />
                                    <span className="text-xs font-bold text-gray-300 hidden md:block">
                                        {service.isActive
                                            ? "Desativar"
                                            : "Reativar"}
                                    </span>
                                </button>

                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() =>
                                        handleVisualizar(service.id)
                                    }>
                                    <img src={pencilSvg} alt="Visualizar" />
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
