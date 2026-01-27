import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

export function useServices() {
    const context = useContext(ServiceContext);

    if (!context || !context.fetchServiceById) {
        throw new Error("useServices must be used within a ServiceProvider");
    }

    return context;
}
