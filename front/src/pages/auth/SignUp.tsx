import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { api } from "../../services/api";
import { AxiosError } from "axios";
import { z, ZodError } from "zod";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

const signUpSchema = z.object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.email({ message: "Email inválido" }),
    password: z
        .string()
        .trim()
        .min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
});

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const data = signUpSchema.parse({ name, email, password });

            api.post("/users", data);

            alert(
                "Usuário cadastrado! Voce será redirecionado para tela de login."
            );
            navigate("/");
        } catch (error) {
            let errorMessage = "Não foi possível iniciar a sessão";

            if (error instanceof ZodError) {
                errorMessage = error.issues[0].message;
            }

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data.message || errorMessage;
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
                        Crie sua conta
                    </h1>
                    <p className="text-xs text-gray-300">
                        Informe seu nome, e-mail e senha
                    </p>
                </div>
                <Input
                    label="Nome"
                    required
                    type="text"
                    placeholder="Digite o nome completo"
                    onChange={(e) => setName(e.target.value)}
                />
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
                    span="Mínimo de 6 dígitos"
                />
                {error && <p className="text-xs text-red font-bold">{error}</p>}
                <Button
                    type="submit"
                    isLoading={isLoading}
                    buttonName="Cadastrar"
                />
            </form>
            <div className="flex w-full flex-col gap-8 p-6 border-gray-500 border rounded-xl">
                <div>
                    <h2 className="text-md text-gray-200 font-bold">
                        Já tem uma conta?
                    </h2>
                    <p className="text-xs text-gray-300">Entre agora mesmo</p>
                </div>
                <Link to="/">
                    <Button variant="primary" buttonName="Acessar conta" />
                </Link>
            </div>
        </div>
    );
}
