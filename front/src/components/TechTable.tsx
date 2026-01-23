import pencilSvg from "../assets/pen-line.svg";

import { AvailabilityTime } from "./AvailabilityTime";
import { UserInitials } from "./UserInitials";

type TableProps = {
    data: UserTech[];
    onVisualizar?: (id: string | number) => void;
};

export function TechTable({ data, onVisualizar }: TableProps) {
    const handleVisualizar = (id: string | number) => {
        if (onVisualizar) {
            onVisualizar(id);
        }
    };

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="grid grid-cols-[1fr_1fr_2fr_auto] items-center border-b border-t border-gray-500">
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Nome
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        E-mail
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3">
                        Disponibilidade
                    </th>
                    <th className="text-left text-sm text-gray-400 font-bold py-3 px-3 justify-self-end"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((tech) => (
                    <tr
                        key={tech.id}
                        className="grid grid-cols-[1fr_1fr_2fr_auto] items-center border-b border-gray-500 gap-2">
                        <td className="text-sm text-gray-200 md:flex md:p-3 p-2">
                            <div className="flex items-center justify-start gap-2">
                                <UserInitials
                                    enablePerfilCard={false}
                                    name={tech.name}
                                    variant="with-name"
                                    className="size-5"
                                />
                            </div>
                        </td>
                        <td className="text-xs font-medium text-gray-200 md:p-3 p-2">
                            {tech.email}
                        </td>
                        <td className="flex md:p-3 p-2 flex-wrap gap-1">
                            {tech.TechAvailability.map((availability) => (
                                <AvailabilityTime
                                    key={availability.time}
                                    time={availability.time}
                                />
                            ))}
                        </td>
                        <td className="md:px-3 md:py-4.5 px-2 py-3.5 justify-self-end">
                            <div className="flex h-full items-center">
                                <span
                                    className="size-7 p-2 bg-gray-500 rounded-md cursor-pointer hover:opacity-70 transition-opacity "
                                    onClick={() => handleVisualizar(tech.id)}>
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
