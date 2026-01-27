import { useServices } from "../../hooks/useServices";

import { ServiceTable } from "../../components/ServiceTable";
import { ButtonLink } from "../../components/ButtonLink";
import { ServiceCard } from "../../components/ServiceCard";
import { useState } from "react";

export function Servicos() {
    const { services, loading, error } = useServices();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<
        string | undefined
    >();

    const handleVisualizar = (id: string) => {
        setSelectedServiceId(id);
        setIsModalOpen(true);
    };

    const handleNovoServico = () => {
        setSelectedServiceId(undefined);
        setIsModalOpen(true);
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative">
            <header className="flex justify-between items-center">
                <h2 className="text-2xl text-purple-800 font-bold mb-4">
                    Serviços
                </h2>
                <ButtonLink
                    variant="create"
                    title="Novo"
                    to="/servicos"
                    onClick={handleNovoServico}
                />
            </header>
            <div className="overflow-x-auto border border-gray-500 rounded-xl">
                {loading ? (
                    <div className="p-4 text-center text-gray-400">
                        Carregando chamados...
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-400">{error}</div>
                ) : services.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        Nenhum chamado encontrado.
                    </div>
                ) : (
                    <ServiceTable
                        data={services}
                        onVisualizar={handleVisualizar}
                    />
                )}
            </div>
            <ServiceCard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceId={selectedServiceId}
                initialData={
                    selectedServiceId
                        ? {
                              name:
                                  services.find(
                                      (s) => s.id === selectedServiceId,
                                  )?.name || "",
                              price:
                                  services
                                      .find((s) => s.id === selectedServiceId)
                                      ?.price.toString() || "",
                          }
                        : undefined
                }
            />
        </section>
    );
}
