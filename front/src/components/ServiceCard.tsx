import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useServices } from "../hooks/useServices";

import x from "../assets/x.svg";

type ServiceCardProps = {
    isOpen: boolean;
    onClose: () => void;
    serviceId?: string;
    initialData?: {
        name: string;
        price: string;
    };
};

export function ServiceCard({
    isOpen,
    onClose,
    serviceId,
    initialData,
}: ServiceCardProps) {
    const { updateService, createService } = useServices();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
        } else {
            setName("");
            setPrice("");
        }
    }, [initialData, isOpen]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !price.trim()) {
            return;
        }

        try {
            setLoading(true);
            if (serviceId) {
                await updateService(serviceId, {
                    name,
                    price,
                    description: "",
                });
            } else {
                await createService({ name, price, description: "" });
            }
            setName("");
            setPrice("");
            onClose();
        } catch (error) {
            console.error("Erro ao salvar serviço:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName("");
        setPrice("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 bg-gray-400/50">
            <div className="bg-gray-600 rounded-lg px-7 pt-7 pb-8 max-w-md w-full transition-all duration-300 transform">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-100">
                        {serviceId ? "Editar Serviço" : "Novo Serviço"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-200 hover:cursor-pointer text-2xl leading-none">
                        <img src={x} alt="X" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        label="Nome do Serviço"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome do serviço"
                        className="py-2"
                        required
                    />

                    <Input
                        label="Valor"
                        type="number"
                        step="0.1"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        prefix="R$"
                        className="py-2"
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={loading}
                            buttonName={loading ? "Salvando..." : "Salvar"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
