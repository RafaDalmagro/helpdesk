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
            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                localStorage.removeItem("@HelpDesk:session:user");
                localStorage.removeItem("@HelpDesk:session:token");

                if (
                    !window.location.pathname.includes("/login") &&
                    !window.location.pathname.includes("/signup") &&
                    window.location.pathname !== "/"
                ) {
                    window.location.assign("/");
                }
                return Promise.reject(error);
            }

            console.error("Erro Axios detectado");
            console.error("Data:", error.response?.data);
            console.error("Mensagem:", error.response?.data.message);
            console.error("URL:", error.config?.url);
        } else {
            console.error("Erro desconhecido");
            console.error(error);
        }
        return Promise.reject(error);
    },
);
