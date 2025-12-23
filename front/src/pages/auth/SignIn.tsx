import { useState } from "react";
import { Link } from "react-router";

import { api } from "../../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

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

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const data = signInSchema.parse({ email, password });

            const response = await api.post("/sessions", data);
            console.log(response.data);
        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }

            alert("Não foi possível iniciar a sessão");
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
                    legend="E-mail"
                    required
                    type="email"
                    placeholder="exemplo@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    legend="Senha"
                    required
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" isLoading={isLoading}>
                    Entrar
                </Button>
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
                    <Button variant="primary">Criar conta</Button>
                </Link>
            </div>
        </div>
    );
}
