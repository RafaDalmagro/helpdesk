import { useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";

import arrowLeft from "../assets/arrow-left.svg";
import x from "../assets/x.svg";

type Props = {
    onBack?: () => void;
    onClose?: () => void;
};

export function UpdatePassword({ onBack, onClose }: Props) {
    const [prevPassword, setPrevPassword] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50">
            <form
                onSubmit={onSubmit}
                className="flex flex-col rounded-md bg-gray-600 w-screen max-w-md h-fit mx-4 border-gray-500 border">
                <div className="flex items-center gap-2 border-b border-gray-500 px-6 py-5">
                    <button onClick={onBack} className="hover:cursor-pointer">
                        <img
                            src={arrowLeft}
                            alt="Arrow Left"
                            className="w-5 h-5"
                        />
                    </button>
                    <h2 className="text-gray-200 text-md font-bold flex-10">
                        Alterar senha
                    </h2>
                    <img
                        src={x}
                        alt="X"
                        className="w-5 h-5 cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <div className="px-7 pt-7 pb-8 flex flex-col gap-4">
                    <Input
                        label="Senha atual"
                        required
                        type="password"
                        placeholder="Digite sua senha atual"
                        onChange={(e) => setPrevPassword(e.target.value)}
                    />
                    <Input
                        label="Nova senha"
                        required
                        type="password"
                        placeholder="Digite a nova senha"
                        onChange={(e) => setPassword(e.target.value)}
                        span="Mínimo de 6 dígitos"
                    />
                    {error && (
                        <p className="text-xs text-red font-bold">{error}</p>
                    )}
                </div>
                <div className="px-7 py-6 border-t border-gray-500">
                    <Button type="submit" isLoading={isLoading}>
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
