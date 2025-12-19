import { Input } from "../components/Input";

export function SignIn() {
    return (
        <form className="flex w-full flex-col gap-8 p-6 border-gray-500 border rounded-xl">
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
            />
            <Input
                legend="Senha"
                required
                type="password"
                placeholder="Digite sua senha"
            />
        </form>
    );
}
