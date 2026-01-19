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
        console.error("Erro na resposta");
        console.error("Data:", error.response?.data);
        console.error("Headers enviados:", error.config?.headers);
        return Promise.reject(error);
    },
);
