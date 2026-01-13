import { useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { Input } from "./Input";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { getUserId } from "../utils/getUserId";

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
    const userId = getUserId();

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            setIsLoading(true);
            console.log({ prevPassword, password });

            const response = await api.patch(`/users/password/${userId}`, {
                password,
                oldPassword: prevPassword,
            });

            console.log(response.data);
            return onClose && onClose();
        } catch (error) {
            setError("Erro ao atualizar a senha. Verifique os dados.");
            if (error instanceof Error) {
                console.error("Error updating password:", error.message);
            }
            if (error instanceof AxiosError && error.response) {
                console.error("Response data:", error.response.data);
            }
            if (error instanceof ZodError) {
                console.error("Validation errors:", error.message);
            }
        } finally {
            setIsLoading(false);
        }
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
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        buttonName="Salvar"
                    />
                </div>
            </form>
        </div>
    );
}
