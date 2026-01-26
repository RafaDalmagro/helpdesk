import { useContext } from "react";
import { ClientContext } from "../context/ClientContext";

export function useClients() {
    const context = useContext(ClientContext);

    if (!context || !context.fetchClientById) {
        throw new Error(
            "useClientes deve ser usado dentro de um ClientProvider",
        );
    }

    return context;
}
