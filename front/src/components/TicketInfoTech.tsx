import { Status } from "./Status";
import { UserInitials } from "./UserInitials";
import { Button } from "./Button";
import { AddServiceModal } from "./AddServiceModal";

import { useTickets } from "../context/TicketContext";
import { useServices } from "../hooks/useServices";
import { useEffect, useState } from "react";

import { formatDate } from "../utils/formatDate";
import { formatCurrency } from "../utils/formatCurrency";

type Props = {
    chamado: Ticket;
};

export function TicketInfoTech({ chamado }: Props) {
    const {
        getAdditionalServicesByTicketId,
        additionalServicesByTicketId,
        clearAdditionalServicesCache,
        refetch,
    } = useTickets();

    const { addServiceToTicket, deleteServiceFromTicket } = useServices();

    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    useEffect(() => {
        getAdditionalServicesByTicketId(chamado.id);
    }, [chamado.id]);

    const services = additionalServicesByTicketId[chamado.id] ?? [];

    const handleAddService = () => {
        setShowAddServiceModal(true);
    };

    const handleAddServiceSubmit = async (name: string, price: number) => {
        try {
            await addServiceToTicket(chamado.id, {
                name,
                description: "",
                price,
            });
            clearAdditionalServicesCache(chamado.id);
            await getAdditionalServicesByTicketId(chamado.id);
            await refetch();
            setShowAddServiceModal(false);
        } catch (error) {
            console.error("Erro ao adicionar serviço:", error);
        }
    };

    const handdleRemoveService = async (serviceId: string) => {
        if (confirm("Tem certeza que deseja remover este serviço adicional?")) {
            try {
                await deleteServiceFromTicket(serviceId);
                clearAdditionalServicesCache(chamado.id);
                await getAdditionalServicesByTicketId(chamado.id);
                await refetch();
            } catch (error) {
                console.error("Erro ao remover serviço:", error);
            }
        }
    };

    return (
        <section className=" h-full grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-[60%_1fr] lg:h-fit">
            <div className="flex flex-col gap-5 border border-gray-500 rounded-md p-5 md:p-6">
                <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-gray-300 font-bold">
                            {chamado.id}
                        </span>
                        <Status
                            status={chamado.status}
                            className="max-[500px]:hidden block"
                        />
                    </div>
                    <h3 className="font-md font-bold">{chamado.title}</h3>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Descrição
                    </h4>
                    <p className="text-sm text-gray-200">
                        {chamado.description}
                    </p>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Categoria
                    </h4>
                    <p className="text-sm text-gray-200">
                        {chamado.category.name}
                    </p>
                </div>
                <div className="flex flex-1 gap-8">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Criado em
                        </h4>
                        <p className="text-sm text-gray-200">
                            {formatDate(chamado.createdAt)}
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Atualizado em
                        </h4>
                        <p className="text-sm text-gray-200">
                            {formatDate(chamado.updatedAt)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <h4 className="text-xs text-gray-400 font-bold">Cliente</h4>
                    <UserInitials
                        name={chamado.client.name}
                        variant="with-name"
                    />
                </div>
            </div>

            <div className="flex flex-col border border-gray-500 rounded-md p-5 gap-8">
                <div className="flex flex-1 flex-col gap-2">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Técnico responsável
                    </h4>
                    <div className="flex items-center justify-start gap-2">
                        <UserInitials
                            name={chamado.tech.name}
                            email={chamado.tech.email}
                            variant="with-details"
                            className="size-8 text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Valores
                        </h4>
                        <div className="flex justify-between text-xs text-gray-200">
                            <span>Preço base</span>
                            <span>
                                {formatCurrency(
                                    chamado.ticketServices[0].service.price,
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-200">
                            <span>Adicionais</span>
                            <span>
                                {formatCurrency(
                                    additionalServicesByTicketId[
                                        chamado.id
                                    ]?.reduce(
                                        (acc, curr) => acc + curr.service.price,
                                        0,
                                    ) || 0,
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="pt-3 border-t border-gray-500">
                        <div className="flex justify-between">
                            <span className="text-gray-200 font-bold text-sm">
                                Total
                            </span>
                            <span className="text-gray-200 font-bold text-sm">
                                {formatCurrency(chamado.totalValue)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border border-gray-500 rounded-md p-5 gap-8">
                <div className="flex flex-col gap-4">
                    {services.length !== 0 ? (
                        <table className="w-full text-xs text-gray-200">
                            <thead>
                                <tr className="grid items-center gap-6 grid-cols-[1fr_1fr_auto] border-b border-gray-500 py-2">
                                    <th className="text-left font-bold text-gray-300">
                                        Serviços adicionais
                                    </th>
                                    <th></th>
                                    <th className="text-right">
                                        {chamado.status !== "closed" && (
                                            <Button
                                                svg="new"
                                                className="text-xs px-2 py-1"
                                                onClick={handleAddService}
                                            />
                                        )}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((servico) => (
                                    <tr
                                        key={servico.service.id}
                                        className="grid items-center gap-6 grid-cols-[1fr_1fr_auto] border-b border-gray-500 py-2 last:border-b-0">
                                        <td className="text-left font-bold">
                                            {servico.service.name}
                                        </td>
                                        <td className="text-right whitespace-nowrap">
                                            {formatCurrency(
                                                servico.service.price,
                                            )}
                                        </td>
                                        <td className="text-right">
                                            {chamado.status !== "closed" && (
                                                <Button
                                                    variant="primary"
                                                    svg="delete"
                                                    className="text-xs px-2 py-1"
                                                    onClick={() =>
                                                        handdleRemoveService(
                                                            servico.id,
                                                        )
                                                    }
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex items-center justify-between gap-4 border border-gray-500 rounded-md p-4">
                            <span className="text-xs text-gray-300 font-bold">
                                Serviços adicionais
                            </span>
                            {chamado.status !== "closed" && (
                                <div className="w-7 h-7">
                                    <Button
                                        svg="new"
                                        className="text-xs px-2 py-1"
                                        onClick={handleAddService}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showAddServiceModal && (
                <AddServiceModal
                    onClose={() => setShowAddServiceModal(false)}
                    onSubmit={handleAddServiceSubmit}
                />
            )}
        </section>
    );
}
