import {
    createContext,
    type ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";

import { api } from "../services/api";
import { AxiosError } from "axios";

type ApiService = Omit<Service, "createdAt" | "updatedAt" | "deletedAt"> & {
    createdAt: string;
    updatedAt: string | null;
    deletedAt?: string | null;
};

type ServicePayload = {
    name: string;
    description: string;
    price: number | string;
};

type ServiceContext = {
    services: Service[];
    loading: boolean;
    error: string | null;
    fetchServiceById: (id: string) => Promise<Service | null>;
    createService: (data: ServicePayload) => Promise<boolean>;
    deleteService: (id: string) => Promise<boolean>;
    updateService: (
        id: string,
        data: Partial<ServicePayload>,
    ) => Promise<boolean>;
};

export const ServiceContext = createContext({} as ServiceContext);

export function ServiceProvider({ children }: { children: ReactNode }) {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapService = useCallback((item: ApiService): Service => {
        return {
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: item.updatedAt ? new Date(item.updatedAt) : null,
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
        };
    }, []);

    const fetchServiceById = useCallback(
        async (id: string): Promise<Service | null> => {
            try {
                setError(null);
                const response = await api.get<{ item: ApiService }>(
                    `/services/${id}`,
                );

                const item = response.data?.item;
                return item ? mapService(item) : null;
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar serviço";
                    setError(errorMessage);
                } else {
                    setError("Erro ao buscar serviço");
                }

                console.error("Erro ao buscar serviço:", error);
                return null;
            }
        },
        [],
    );

    const createService = useCallback(
        async (data: ServicePayload): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);

                const payload = {
                    ...data,
                    price: Number(data.price),
                };

                await api.post("/services", payload);

                const response = await api.get<{ items: ApiService[] }>(
                    "/services",
                );
                setServices(
                    (response.data?.items ?? []).map((item) =>
                        mapService(item),
                    ),
                );

                setLoading(false);
                return true;
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao criar serviço";
                    setError(errorMessage);
                    console.error("Erro ao criar serviço:", error);
                    throw error;
                } else {
                    console.error("Erro ao criar serviço:", error);
                    setError("Erro ao criar serviço");
                    throw new Error("Erro ao criar serviço");
                }
            }
        },
        [],
    );

    const deleteService = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);
            setLoading(true);

            await api.delete(`/services/${id}`);

            const response = await api.get<{ items: ApiService[] }>(
                "/services",
            );
            setServices(
                (response.data?.items ?? []).map((item) => mapService(item)),
            );

            setLoading(false);
            return true;
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof AxiosError) {
                const errorMessage =
                    error.response?.data?.message || "Erro ao deletar serviço";
                setError(errorMessage);
                console.error("Erro ao deletar serviço:", error);
                throw error;
            } else {
                console.error("Erro ao deletar serviço:", error);
                setError("Erro ao deletar serviço");
                throw new Error("Erro ao deletar serviço");
            }
        }
    }, []);

    const updateService = useCallback(
        async (id: string, data: Partial<ServicePayload>): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);

                const payload = {
                    ...data,
                    price:
                        data.price !== undefined
                            ? Number(data.price)
                            : undefined,
                };

                await api.put(`/services/${id}`, payload);

                const response = await api.get<{ items: ApiService[] }>(
                    "/services",
                );
                setServices(
                    (response.data?.items ?? []).map((item) =>
                        mapService(item),
                    ),
                );

                setLoading(false);
                return true;
            } catch (error: unknown) {
                setLoading(false);
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao atualizar serviço";
                    setError(errorMessage);
                    console.error("Erro ao atualizar serviço:", error);
                    throw error;
                } else {
                    console.error("Erro ao atualizar serviço:", error);
                    setError("Erro ao atualizar serviço");
                    throw new Error("Erro ao atualizar serviço");
                }
            }
        },
        [],
    );

    useEffect(() => {
        async function fetchServices() {
            try {
                setError(null);
                const response = await api.get<{ items: ApiService[] }>(
                    "/services",
                );

                setServices(
                    (response.data?.items ?? []).map((item) =>
                        mapService(item),
                    ),
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Erro ao buscar serviços";
                    setError(errorMessage);
                } else {
                    setError("Erro ao buscar serviços");
                }

                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    return (
        <ServiceContext.Provider
            value={{
                services,
                loading,
                error,
                fetchServiceById,
                createService,
                deleteService,
                updateService,
            }}>
            {children}
        </ServiceContext.Provider>
    );
}
