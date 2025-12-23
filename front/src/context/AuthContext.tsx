import { createContext, useState } from "react";

type AuthContext = {
    session: UserAPIResponse | null;
    save: (data: UserAPIResponse) => void;
};

const LOCAL_STORAGE_KEY = "@HelpDesk:session";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserAPIResponse | null>(null);

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

    return (
        <AuthContext.Provider value={{ session, save }}>
            {children}
        </AuthContext.Provider>
    );
}
