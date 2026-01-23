import { useState } from "react";
import { Link } from "react-router";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";

import { useAuth } from "../../hooks/useAuth";

const signInSchema = z.object({
    email: z.email({ message: "Email inválido" }),
    password: z
        .string()
        .trim()
        .min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
});

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const auth = useAuth();
    const { isLoading } = useAuth();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const data = signInSchema.parse({ email, password });
            await auth.signIn(data);
        } catch (err) {
            if (err instanceof ZodError) {
                setError(err.issues[0]?.message ?? "Dados inválidos");
                return;
            }

            if (err instanceof AxiosError) {
                setError(
                    err.response?.data?.message ??
                        "Não foi possível iniciar a sessão",
                );
                return;
            }
            setError("Não foi possível iniciar a sessão");
        }
    }

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <form
                onSubmit={onSubmit}
                className="flex w-full flex-col gap-8 p-6 border-gray-500 border rounded-xl">
                <div className="">
                    <h1 className="text-lg text-gray-200 font-bold">
                        Acesse o portal
                    </h1>
                    <p className="text-xs text-gray-300">
                        Entre usando seu e-mail e senha cadastrados
                    </p>
                </div>
                <Input
                    label="E-mail"
                    required
                    type="email"
                    placeholder="exemplo@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
                <Input
                    label="Senha"
                    required
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                {error && <p className="text-xs text-red font-bold">{error}</p>}
                <Button
                    type="submit"
                    isLoading={isLoading}
                    buttonName="Entrar"
                />
            </form>
            <div className="flex w-full flex-col gap-8 p-6 border-gray-500 border rounded-xl">
                <div>
                    <h2 className="text-md text-gray-200 font-bold">
                        Ainda não tem uma conta?
                    </h2>
                    <p className="text-xs text-gray-300">
                        Cadastre agora mesmo
                    </p>
                </div>
                <Link to="/signup">
                    <Button variant="primary" buttonName="Criar conta" />
                </Link>
            </div>
        </div>
    );
}
