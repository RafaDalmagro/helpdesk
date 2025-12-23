import { createContext, useState } from "react";

type AuthContext = {
    session: UserAPIResponse | null;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<UserAPIResponse | null>(null);
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}
