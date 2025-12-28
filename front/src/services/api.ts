// api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("@HelpDesk:session:token");

    if (token) {
        const cleanToken = token.replace(/^"|"$/g, "").trim();
        config.headers.Authorization = `Bearer ${cleanToken}`;
    } else {
        console.log("Token não encontrado!");
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("=== ERRO NA RESPOSTA ===");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Headers enviados:", error.config?.headers);
        return Promise.reject(error);
    }
);
