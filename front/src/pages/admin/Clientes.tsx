import { useState } from "react";

import { useClients } from "../../hooks/useClients";
import { ClientTable } from "../../components/ClientTable";
import { ClientProfile } from "../../components/ClientProfile";
import { CardDelete } from "../../components/CardDelete";

export function Clientes() {
    const [selectedClientId, setSelectedClientId] = useState<string | null>(
        null,
    );
    const [clientToDelete, setClientToDelete] = useState<string | null>(null);

    const { users = [], loading, error } = useClients();

    const handleVisualizar = (id: string) => {
        setSelectedClientId(id);
    };

    const handleCloseModal = () => {
        setSelectedClientId(null);
    };

    const handleDelete = (id: string) => {
        setClientToDelete(id);
        console.log("Deletar cliente com ID:", id);
    };

    if (!users) {
        return null;
    }

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Clientes
            </h2>

            <div className="overflow-x-auto border border-gray-500 rounded-xl">
                {loading ? (
                    <div className="p-4 text-center text-gray-400">
                        Carregando clientes...
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-400">{error}</div>
                ) : users.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        Nenhum cliente encontrado.
                    </div>
                ) : (
                    <ClientTable
                        data={users}
                        onVisualizar={handleVisualizar}
                        deleteClient={handleDelete}
                    />
                )}
            </div>

            {selectedClientId && (
                <ClientProfile
                    clientId={selectedClientId}
                    onClose={handleCloseModal}
                />
            )}
            {clientToDelete && (
                <CardDelete
                    id={clientToDelete}
                    onClose={() => setClientToDelete(null)}
                />
            )}
        </section>
    );
}
