import { createContext, useState, useEffect, use } from "react";

type AuthContext = {
    isLoading: boolean;
    session: UserAPIResponse | null;
    save: (data: UserAPIResponse) => void;
};

const LOCAL_STORAGE_KEY = "@HelpDesk:session";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserAPIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function save(data: UserAPIResponse) {
        localStorage.setItem(
            `${LOCAL_STORAGE_KEY}:user`,
            JSON.stringify(data.userWithoutPassword)
        );

        localStorage.setItem(
            `${LOCAL_STORAGE_KEY}:token`,
            JSON.stringify(data.token)
        );
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

    useEffect(() => {
        loadSession();
    }, []);

    return (
        <AuthContext.Provider value={{ session, save, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
