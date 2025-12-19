import { useState } from "react";
import { Link } from "react-router";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log(name, email, password);
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
                    legend="Nome"
                    required
                    type="text"
                    placeholder="Digite o nome completo"
                    onChange={(e) => setName(e.target.value)}
                />
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
                    span="Mínimo de 6 dígitos"
                />

                <Button type="submit" isLoading={isLoading}>
                    Cadastrar
                </Button>
            </form>
            <div className="flex w-full flex-col gap-8 p-6 border-gray-500 border rounded-xl">
                <div>
                    <h2 className="text-md text-gray-200 font-bold">
                        Já tem uma conta?
                    </h2>
                    <p className="text-xs text-gray-300">Entre agora mesmo</p>
                </div>
                <Link to="/">
                    <Button variant="primary">Acessar conta</Button>
                </Link>
            </div>
        </div>
    );
}
