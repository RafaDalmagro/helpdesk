import userSvg from "../assets/circle-user.svg";
import logoutSvg from "../assets/logout.svg";

export function CardPerfil() {
    return (
        <div className="bg-gray-100 px-5 py-4 flex flex-col gap-4 rounded-lg border border-gray-300 z-10 w-35 absolute left-2 top-2 md:left-2 md:bottom-2 md:top-auto">
            <span className="capitalize text-gray-400 text-xxs">Opções</span>
            <div className="flex gap-2">
                <img src={userSvg} alt="Perfil" />
                <span className="text-gray-500 text-md">Perfil</span>
            </div>
            <div className="flex gap-2">
                <img src={logoutSvg} alt="Sair" />
                <span className="text-red text-md">Sair</span>
            </div>
        </div>
    );
}
