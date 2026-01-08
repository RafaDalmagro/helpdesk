import { useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";

import x from "../assets/x.svg";
import uploadIcon from "../assets/uploadIcon.svg";
import trashIcon from "../assets/trash.svg";

type Props = {
    name?: string;
    email?: string;
};

export function Perfil({ name, email }: Props) {
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
    }

    if (!isOpen) return null;

    return (
        <div
            id="background"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50"
            onClick={handleClose}>
            <div
                className="flex flex-col rounded-md bg-gray-600 w-screen h-fit mx-4"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between px-7 py-5 w-full">
                    <h2 className="text-gray-200">Perfil</h2>
                    <button
                        className="hover:cursor-pointer opacity-80"
                        onClick={handleClose}>
                        <img src={x} alt="X" />
                    </button>
                </div>
                <form
                    onSubmit={onsubmit}
                    className="flex flex-col justify-between px-7 pt-7 pb-8 w-full gap-5">
                    <div className="flex items-center gap-3">
                        <img className="rounded-full w-12 h-12" src="" alt="" />
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
                    <div className="">
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
                                className="w-fit px-2"
                                onClick={handleOpenUpdatePassword}>
                                Alterar
                            </Button>
                        </div>
                        {/*
                        {showUpdatePassword && <UpdatePassword />}
                        */}
                    </div>
                    <div>
                        <Button type="submit" variant="default">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
