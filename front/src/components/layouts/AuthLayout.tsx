import { Outlet } from "react-router";

import NavHeader from "../../assets/NavHeader.svg";
import loginBackground from "../../assets/Login_Background.svg";

export function AuthLayout() {
    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat pt-8 md:pt-3 overflow-hidden"
            style={{ backgroundImage: `url(${loginBackground})` }}>
            <main
                className="flex w-screen h-screen bg-gray-50 py-8 px-6 rounded-t-xl  overflow-y-auto justify-center
            sm:justify-self-end sm:w-1/2 xl:py-12 xl:px-35 sm:rounded-tl-xl sm:rounded-t-none">
                <div className="flex flex-col gap-6 content-center w-screen">
                    <img src={NavHeader} alt="Logo" className="h-10" />

                    <Outlet />
                </div>
            </main>
        </div>
    );
}
