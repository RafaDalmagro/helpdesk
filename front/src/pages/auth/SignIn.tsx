import { useState } from "react";
import { Link } from "react-router";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const auth = useAuth();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const data = signInSchema.parse({ email, password });

            const response = await api.post("/sessions", data);

            auth.save(response.data);
        } catch (err) {
            let errorMessage = "Não foi possível iniciar a sessão";

            if (err instanceof ZodError) {
                errorMessage = err.issues[0].message;
            }

            if (err instanceof AxiosError) {
                errorMessage = err.response?.data.message || errorMessage;
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
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
                />
                <Input
                    label="Senha"
                    required
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassword(e.target.value)}
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
