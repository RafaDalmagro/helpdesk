import axios from "axios";

import { BASE_URL } from "./env";

export const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("@HelpDesk:session:token");

    if (token) {
        const cleanToken = token.replace(/^"|"$/g, "").trim();
        config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            console.error("Erro Axios detectado");
            console.error("Data:", error.response?.data);
            console.error("Headers enviados:", error.config?.headers);
            console.error("URL:", error.config?.url);
            console.log(BASE_URL);
        } else {
            console.error("Erro desconhecido");
            console.error(error);
            console.log(BASE_URL);
        }
        return Promise.reject(error);
    },
);
