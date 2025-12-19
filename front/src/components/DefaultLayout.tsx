import { Outlet } from "react-router";

import logoSvg from "../assets/logo.svg";
import toggle from "../assets/toggle.svg";
export function DefaultLayout() {
    return (
        <div className="w-screen h-screen bg-gray-100 overflow-hidden box-border">
            <main className="flex flex-col h-full w-full md:flex-row md:pt-3 box-border">
                <nav className="flex md:flex-col justify-between items-center p-6 box-border">
                    <div className="flex gap-4 items-center">
                        <img
                            src={toggle}
                            alt="Logo"
                            className="h-11 md:hidden"
                        />
                        <div className="flex gap-3 items-center">
                            <img src={logoSvg} alt="Logo" className="h-11" />
                            <div className="flex flex-col">
                                <h1 className="text-lg text-gray-600 font-bold">
                                    HelpDesk
                                </h1>
                                <span className="text-xxs text-purple-100 uppercase font-bold">
                                    Técnico
                                </span>
                            </div>
                        </div>
                    </div>

					

                    <div className="flex gap-3 py-3">
                        <span className="flex items-center justify-center bg-purple-800 rounded-4xl size-10 py-2 px-1.5 text-gray-600 text-sm leading-5">
                            RD
                        </span>
                        <div className="hidden md:flex md:flex-col md:justify-center">
                            <span className="text-sm text-gray-600">
                                Usuário Técnico
                            </span>
                            <span className="text-xs text-gray-400">
                                user.tech@test.com
                            </span>
                        </div>
                    </div>
                </nav>
                <div className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto justify-center box-border">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
