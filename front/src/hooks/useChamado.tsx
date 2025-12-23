import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useChamado() {
    const [chamados, setChamados] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchChamados() {
            try {
                const response = await api.get("/chamados");
                setChamados(response.data.items);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchChamados();
    }, []);

    return { chamados, loading, error };
}
