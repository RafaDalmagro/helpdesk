import { useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";
import { UpdatePassword } from "./UpdatePassword";

import x from "../assets/x.svg";
import uploadIcon from "../assets/uploadIcon.svg";
import trashIcon from "../assets/trash.svg";

type Props = {
    name?: string;
    email?: string;
    onClose?: () => void;
};

export function Perfil({ name, email, onClose }: Props) {
    const [isOpen, setIsOpen] = useState(true);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);

    function handleOpenUpdatePassword() {
        setShowUpdatePassword(true);
    }

    function onsubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    function handleClose() {
        setIsOpen(false);
        if (typeof onClose === "function") onClose();
    }

    if (!isOpen) return null;

    if (showUpdatePassword) {
        return (
            <UpdatePassword
                onBack={() => setShowUpdatePassword(false)}
                onClose={handleClose}
            />
        );
    }

    return (
        <div
            id="background"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50"
            onClick={handleClose}>
            <div
                className="flex flex-col rounded-md bg-gray-600 md:min-w-2xl h-fit mx-4"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between px-7 py-5 w-full border-b border-gray-500">
                    <h2 className="text-gray-200">Perfil</h2>
                    <button
                        className="hover:cursor-pointer opacity-80"
                        onClick={handleClose}>
                        <img src={x} alt="X" />
                    </button>
                </div>
                <form onSubmit={onsubmit} className="flex flex-col">
                    <div className="flex flex-col gap-5 px-7 pt-7 pb-8">
                        <div className="flex items-center">
                            <img
                                className="rounded-full w-12 h-12"
                                src=""
                                alt=""
                            />
                            <div className="flex items-center gap-1">
                                <button className="rounded-md bg-gray-500 flex items-center p-2 h-full gap-2 hover:bg-gray-400 transition ease-linear hover:cursor-pointer">
                                    <img src={uploadIcon} alt="Upload" />
                                    <span className="text-xs text-gray-200 font-bold">
                                        Nova imagem
                                    </span>
                                </button>
                                <button
                                    onClick={() => {}}
                                    className="flex p-2 bg-gray-500 rounded-md hover:bg-gray-400 transition ease-linear hover:cursor-pointer">
                                    <img src={trashIcon} alt="Trash" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Input
                                label="Nome"
                                type="text"
                                placeholder={name}
                                disabled
                            />
                            <Input
                                label="E-mail"
                                type="email"
                                placeholder={email}
                                disabled
                            />
                            <div className="flex items-center gap-2 justify-between">
                                <Input
                                    label="Senha"
                                    type="password"
                                    placeholder="123456"
                                    value="123456"
                                    disabled
                                    className=""
                                />
                                <Button
                                    variant="primary"
                                    className="w-fit h-fit px-2 text-xs"
                                    onClick={handleOpenUpdatePassword}>
                                    Alterar
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="px-7 py-6 border-t border-gray-500 flex justify-end">
                        <Button type="submit" variant="default">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
