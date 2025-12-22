import { createContext } from "react";

export const AuthContext = createContext({ name: "Rafael" });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthContext.Provider value={{ name: "Rafael" }}>
            {children}
        </AuthContext.Provider>
    );
}
