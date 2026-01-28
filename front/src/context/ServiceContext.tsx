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
    addServiceToTicket: (ticketId: string, data: ServicePayload) => Promise<boolean>;
    deleteServiceFromTicket: (id: string) => Promise<boolean>;
    updateService: (
        id: string,
        data: Partial<ServicePayload>,
    ) => Promise<boolean>;
    updateServiceStatus: (id: string, isActive: boolean) => Promise<boolean>;
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

    const deleteServiceFromTicket = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);

            await api.delete(`/ticket-services/${id}`);

            return true;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage =
                    error.response?.data?.message || "Erro ao remover serviço do ticket";
                setError(errorMessage);
                console.error("Erro ao remover serviço do ticket:", error);
                throw error;
            } else {
                console.error("Erro ao remover serviço do ticket:", error);
                setError("Erro ao remover serviço do ticket");
                throw new Error("Erro ao remover serviço do ticket");
            }
        }
    }, []);

    const addServiceToTicket = useCallback(
        async (ticketId: string, data: ServicePayload): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);

                const payload = {
                    ...data,
                    price: Number(data.price),
                };

                const serviceResponse = await api.post<{ service: ApiService }>(
                    "/services",
                    payload,
                );

                const serviceId = serviceResponse.data?.service?.id;

                if (!serviceId) {
                    throw new Error("Erro ao obter ID do serviço criado");
                }

                await api.post("/ticket-services", {
                    ticketId,
                    serviceId,
                });

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
                        "Erro ao adicionar serviço ao ticket";
                    setError(errorMessage);
                    console.error("Erro ao adicionar serviço ao ticket:", error);
                    throw error;
                } else {
                    console.error("Erro ao adicionar serviço ao ticket:", error);
                    setError("Erro ao adicionar serviço ao ticket");
                    throw new Error("Erro ao adicionar serviço ao ticket");
                }
            }
        },
        [mapService],
    );

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

    const updateServiceStatus = useCallback(
        async (id: string, isActive: boolean): Promise<boolean> => {
            try {
                setError(null);
                setLoading(true);

                await api.put(`/services/${id}/status`, { isActive });

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
                        "Erro ao atualizar status do serviço";
                    setError(errorMessage);
                    console.error(
                        "Erro ao atualizar status do serviço:",
                        error,
                    );
                    throw error;
                } else {
                    console.error(
                        "Erro ao atualizar status do serviço:",
                        error,
                    );
                    setError("Erro ao atualizar status do serviço");
                    throw new Error("Erro ao atualizar status do serviço");
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
                addServiceToTicket,
                deleteServiceFromTicket,
                updateService,
                updateServiceStatus,
            }}>
            {children}
        </ServiceContext.Provider>
    );
}
