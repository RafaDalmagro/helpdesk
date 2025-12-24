import { Outlet } from "react-router";

export function AdminLayout() {
    return (
        <div className="w-screen h-screen bg-gray-100 overflow-hidden box-border">
            <main className="flex flex-col h-full w-full md:flex-row md:pt-3 box-border">
                <div>ADMIN LAYOUT</div>

                <Outlet />
            </main>
        </div>
    );
}
