import { useContext } from "react";
import { TechContext } from "../context/TechContext";

export function useTechs() {
    const context = useContext(TechContext);

    if (!context) {
        throw new Error("useTechs must be used within a TechProvider");
    }

    return context;
}
