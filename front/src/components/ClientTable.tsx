import pencilSvg from "../assets/pen-line.svg";
import trashSvg from "../assets/trash.svg";

import { UserInitials } from "./UserInitials";

type TableProps = {
    data: UserResponse[];
    onVisualizar?: (id: string | number) => void;
};

export function ClientTable({ data, onVisualizar }: TableProps) {
    const handleVisualizar = (id: string | number) => {
        console.log("Visualizar cliente com ID:", id);
        // if (onVisualizar) {
        //     onVisualizar(id);
        // }
    };

    const handleDelete = (id: string | number) => {
        console.log("Excluir cliente com ID:", id);
    };
    console.log(data);
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="grid grid-cols-[2fr_2fr_1fr_auto] items-center border-b border-t border-gray-500">
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Nome
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        E-mail
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3 justify-self-end"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((client) => (
                    <tr
                        key={client.id}
                        className="grid grid-cols-[2fr_2fr_1fr_auto] items-center border-b border-gray-500">
                        <td className="text-sm text-gray-200 md:flex md:p-3 p-2">
                            <div className="flex items-center justify-start gap-2">
                                <UserInitials
                                    enablePerfilCard={false}
                                    name={client.name}
                                    variant="with-name"
                                    className="size-8 text-sm"
                                />
                            </div>
                        </td>
                        <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                            {client.email}
                        </td>
                        <td className="flex gap-2 md:px-3 md:py-4.5 px-2 py-3.5 justify-self-end">
                            <div className="flex h-full items-center">
                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() => handleVisualizar(client.id)}>
                                    <img src={pencilSvg} alt="Visualizar" />
                                </span>
                            </div>
                            <div className="flex h-full items-center">
                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() => handleDelete(client.id)}>
                                    <img src={trashSvg} alt="Excluir" />
                                </span>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
