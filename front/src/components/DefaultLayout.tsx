import { Outlet } from "react-router";
import { Header } from "./Header";

export function DefaultLayout() {
    return (
        <div className="w-screen h-screen bg-gray-100 overflow-hidden box-border">
            <main className="flex flex-col h-full w-full md:flex-row md:pt-3 box-border">
                <Header />

                <Outlet />
            </main>
        </div>
    );
}
