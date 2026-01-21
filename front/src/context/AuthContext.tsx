import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

type Credentials = {
    email: string;
    password: string;
};

type AuthContext = {
    isLoading: boolean;
    session: LoginAPIResponse | null;
    save: (data: LoginAPIResponse) => void;
    removeSession: () => void;
    signIn: (data: Credentials) => Promise<void>;
};

const LOCAL_STORAGE_KEY = "@HelpDesk:session";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<LoginAPIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function save(data: LoginAPIResponse) {
        localStorage.setItem(
            `${LOCAL_STORAGE_KEY}:user`,
            JSON.stringify(data.userWithoutPassword),
        );

        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);
        setSession(data);
    }

    function loadSession() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

        if (user && token) {
            setSession({
                userWithoutPassword: JSON.parse(user),
                token,
            });
        }

        setIsLoading(false);
    }

    function removeSession() {
        setSession(null);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

        window.location.assign("/");
    }

    async function signIn({ email, password }: Credentials) {
        setIsLoading(true);

        try {
            const response = await api.post<LoginAPIResponse>("/sessions", {
                email,
                password,
            });

            save(response.data);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{ session, save, isLoading, removeSession, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
