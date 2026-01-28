import { useState } from "react";
import x from "../assets/x.svg";

import { Button } from "./Button";
import { Input } from "./Input";

interface AddServiceModalProps {
    onClose: () => void;
    onSubmit: (name: string, price: number) => Promise<void>;
}

export function AddServiceModal({ onClose, onSubmit }: AddServiceModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useState(() => {
        setTimeout(() => setIsOpen(true), 50);
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Nome é obrigatório");
            return;
        }

        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            setError("Preço deve ser um número positivo");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);
            await onSubmit(name, priceNumber);
            setIsOpen(false);
            setTimeout(() => onClose(), 300);
        } catch (err) {
            setError("Erro ao adicionar serviço");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                isOpen
                    ? "bg-gray-400/50 opacity-100"
                    : "bg-gray-400/0 opacity-0 pointer-events-none"
            }`}>
            <div
                className={`bg-gray-600 rounded-lg px-7 pt-7 pb-8 max-w-md w-full transition-all duration-300 transform mx-4 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}>
                <header className="flex justify-between pb-5">
                    <h2 className="text-md font-bold text-gray-200">
                        Serviço adicional
                    </h2>
                    <button
                        type="button"
                        className="hover:cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        onClick={handleClose}>
                        <img src={x} alt="X" />
                    </button>
                </header>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Nome"
                            required
                            className="py-2"
                            placeholder="Nome do serviço"
                        />
                        <Input
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            label="Valor"
                            className="py-2"
                            type="number"
                            step="10"
                            min="0"
                            prefix="R$"
                            placeholder="0,00"
                        />
                        {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                        )}
                    </div>
                </div>

                <div className="pt-6">
                    <Button
                        variant="default"
                        buttonName={isSaving ? "Salvando..." : "Salvar"}
                        type="submit"
                        disabled={isSaving}
                    />
                </div>
            </div>
        </form>
    );
}
