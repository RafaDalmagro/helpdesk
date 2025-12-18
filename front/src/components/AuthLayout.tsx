import { Outlet } from "react-router";

import logoSvg from "../assets/logo.svg";
import loginBackground from "../assets/Login_Background.svg";

export function AuthLayout() {
    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${loginBackground})` }}>
            <main className="flex gap-2 justify-end">
                <div className="h-screen bg-gray-50 py-12 px-35 mt-3 rounded-tl-xl">
                    <img src={logoSvg} alt="Logo" className="w-10" />
                    <span className="text-purple-800 text-xl font-bold content-center">
                        Help Desk
                    </span>

                    <Outlet />
                </div>
            </main>
        </div>
    );
}
