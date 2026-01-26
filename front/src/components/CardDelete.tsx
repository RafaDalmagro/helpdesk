import { Button } from "./Button";
import { useEffect, useState } from "react";
import { useClients } from "../hooks/useClients";

import x from "../assets/x.svg";

type CardDeleteProps = {
    id: string;
    onClose: () => void;
    clientName?: string;
};

export function CardDelete({ id, onClose, clientName }: CardDeleteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { deleteClient } = useClients();

    useEffect(() => {
        const t = setTimeout(() => setIsOpen(true), 50);
        return () => clearTimeout(t);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            setIsDeleting(true);
            await deleteClient(id);
            setIsOpen(false);
            setTimeout(() => onClose(), 300);
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                isOpen
                    ? "bg-gray-400/50 opacity-100"
                    : "bg-gray-400/0 opacity-0 pointer-events-none"
            }`}>
            <div
                className={`bg-gray-600 rounded-lg px-7 pt-7 pb-8 max-w-md w-full transition-all duration-300 transform ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}>
                <header className="flex justify-between pb-5">
                    <h2 className="text-md font-bold text-gray-200">
                        Excluir cliente
                    </h2>
                    <button
                        type="button"
                        className="hover:cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        onClick={handleClose}>
                        <img src={x} alt="X" />
                    </button>
                </header>
                <div className="flex flex-col gap-4">
                    <p className="text-md text-gray-200">
                        Deseja realmente excluir
                        <span className="font-bold text-gray-200 text-md">
                            {clientName ?? "este cliente"}?
                        </span>
                    </p>

                    <p className="text-md text-gray-200">
                        Ao excluir, todos os chamados deste cliente serão
                        removidos e esta ação não poderá ser desfeita.
                    </p>
                </div>
                <div className="flex gap-3 pt-4">
                    <Button
                        buttonName="Cancelar"
                        variant="primary"
                        onClick={handleClose}
                        type="button"
                    />
                    <Button
                        buttonName={
                            isDeleting ? "Excluindo..." : "Sim, excluir"
                        }
                        variant="default"
                        type="submit"
                        disabled={isDeleting}
                    />
                </div>
            </div>
        </form>
    );
}
