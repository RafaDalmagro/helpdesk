import { Outlet } from "react-router";
import { Header } from "../Header";
import { useAuth } from "../../hooks/useAuth";

export function DefaultLayout() {
    const { session: user } = useAuth();

    let role = null;

    if (user?.userWithoutPassword.role === "client") {
        role = "Cliente";
    }

    return (
        <div className="w-screen h-screen bg-gray-100 overflow-hidden box-border">
            <main className="flex flex-col h-full w-full md:flex-row md:pt-3 box-border relative">
                <Header
                    role={role ?? "Sem função"}
                    email={user?.userWithoutPassword.email}
                    name={user?.userWithoutPassword.name}
                />

                <Outlet />
            </main>
        </div>
    );
}
