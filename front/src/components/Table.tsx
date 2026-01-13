import olhoSvg from "../assets/eye.svg";
import pencilSvg from "../assets/pen-line.svg";

import { formatDate } from "../utils/formatDate";

import { Status } from "./Status";
import { UserInitials } from "./UserInitials";

type TableProps = {
    data: Ticket[];
    role: "admin" | "tech" | "client";
    onVisualizar?: (id: string | number) => void;
};

export function Table({ data, onVisualizar, role }: TableProps) {
    const handleVisualizar = (id: string | number) => {
        if (onVisualizar) {
            onVisualizar(id);
        }
    };
    if (role === "admin") {
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
                            Título e Serviço
                        </th>
                        <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                            Valor total
                        </th>
                        <th className="hidden md:table-cell text-left text-sm text-gray-400 font-bold py-3 px-3">
                            Cliente
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
                        <tr
                            key={chamado.id}
                            className="border-b border-gray-500">
                            <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                                {formatDate(chamado.updatedAt)}
                            </td>
                            <td className="text-xs font-bold text-gray-200 hidden md:table-cell md:p-3 p-2">
                                {chamado.id}
                            </td>
                            <td className="text-gray-200 md:p-3 p-2">
                                <div className=" flex flex-col gap-1 justify-center">
                                    <span className="text-sm font-bold">
                                        {chamado.title}
                                    </span>
                                    <span className="text-xs">
                                        {
                                            chamado.ticketServices[0]?.service
                                                .name
                                        }
                                    </span>
                                </div>
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                {chamado.totalValue}
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                <div className="flex items-center justify-start gap-2">
                                    <UserInitials
                                        enablePerfilCard={false}
                                        name={chamado.client.name}
                                        variant="with-name"
                                    />
                                </div>
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                <div className="flex items-center justify-start gap-2">
                                    <UserInitials
                                        enablePerfilCard={false}
                                        name={chamado.tech.name}
                                        variant="with-name"
                                    />
                                </div>
                            </td>
                            <td className="md:p-3 p-2 ">
                                <Status
                                    status={chamado.status}
                                    className="max-[500px]:hidden sm:block md:hidden lg:block"
                                />
                            </td>
                            <td className="md:px-3 md:py-4.5 px-2 py-3.5 flex h-full items-center">
                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() =>
                                        handleVisualizar(chamado.id)
                                    }>
                                    <img src={pencilSvg} alt="Visualizar" />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    if (role === "client") {
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
                        <tr
                            key={chamado.id}
                            className="border-b border-gray-500">
                            <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                                {formatDate(chamado.updatedAt)}
                            </td>
                            <td className="text-xs font-bold text-gray-200 hidden md:table-cell md:p-3 p-2">
                                {chamado.id}
                            </td>
                            <td className="text-sm font-bold text-gray-200 md:p-3 p-2">
                                {chamado.title}
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                {chamado.ticketServices[0]?.service.name}
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                {chamado.totalValue}
                            </td>
                            <td className="text-sm text-gray-200 hidden md:table-cell md:p-3 p-2">
                                <div className="flex items-center justify-start gap-2">
                                    <UserInitials
                                        enablePerfilCard={false}
                                        name={chamado.tech.name}
                                        variant="with-name"
                                    />
                                </div>
                            </td>
                            <td className="md:p-3 p-2 ">
                                <Status
                                    status={chamado.status}
                                    className="max-[500px]:hidden sm:block md:hidden lg:block"
                                />
                            </td>
                            <td className="md:px-3 md:py-4.5 px-2 py-3.5 flex h-full">
                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() =>
                                        handleVisualizar(chamado.id)
                                    }>
                                    <img src={olhoSvg} alt="Visualizar" />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
