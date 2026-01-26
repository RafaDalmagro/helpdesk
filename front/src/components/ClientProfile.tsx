import { useEffect, useState } from "react";
import { useClients } from "../hooks/useClients";

import x from "../assets/x.svg";

import { Loading } from "./Loading";
import { Button } from "./Button";
import { Input } from "./Input";
import { UserInitials } from "./UserInitials";

interface ClientProfileProps {
    clientId: string;
    onClose: () => void;
}

export function ClientProfile({ clientId, onClose }: ClientProfileProps) {
    const { fetchClientById, updateClient } = useClients();
    const [client, setClient] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loadClient = async () => {
            try {
                setLoading(true);
                const clientData = await fetchClientById(clientId);
                setClient(clientData);
                if (clientData) {
                    setName(clientData.name);
                    setEmail(clientData.email);
                }
                setLoading(false);

                setTimeout(() => setIsOpen(true), 50);
            } catch (err) {
                setError("Erro ao carregar dados do cliente");
                console.error(err);
                setLoading(false);
            }
        };

        loadClient();
    }, [clientId, fetchClientById]);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            setIsSaving(true);
            await updateClient(clientId, { name, email });
            setIsOpen(false);
            setTimeout(() => onClose(), 300);
        } catch (err) {
            setError("Erro ao atualizar cliente");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => onClose(), 300);
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex">
                <Loading />
            </div>
        );
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
                    <h2 className="text-md font-bold text-gray-200">Cliente</h2>
                    <button
                        type="button"
                        className="hover:cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        onClick={handleClose}>
                        <img src={x} alt="X" />
                    </button>
                </header>

                <div className="flex flex-col gap-5">
                    <UserInitials
                        variant="simple"
                        name={name}
                        className="size-8 text-sm"
                    />
                    <div className="flex flex-col gap-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Nome"
                            className="py-2"
                        />
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            className="py-2"
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
