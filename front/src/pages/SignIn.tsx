import { useState } from "react";
import { Link } from "react-router";

import { Input } from "../components/Input";
import { Button } from "../components/button";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log(email, password);
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
