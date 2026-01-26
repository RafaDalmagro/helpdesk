import { useNavigate } from "react-router";
import { useState } from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Voltar } from "../../components/VoltarLink";
import { ScheduleSelector } from "../../components/ScheduleSelector";
import { Loading } from "../../components/Loading";

import { useTechs } from "../../hooks/useTechs";
import { parseApiError } from "../../utils/errorHandler";

export function NovoTecnico() {
    const { createTech } = useTechs();

    const [horarios, setHorarios] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleCancelar() {
        navigate(-1);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        console.log("Novo técnico criado com os horários:", horarios);
        console.log("Nome:", name);
        console.log("E-mail:", email);
        console.log("Senha:", password);

        try {
            const success = await createTech({
                name,
                email,
                password,
                role: "tech",
                times: horarios,
            });

            if (success) {
                navigate("/tecnicos");
            }
        } catch (error) {
            const parsedError = parseApiError(error);
            setError(parsedError.message);
            console.error("Erro ao criar técnico:", {
                type: parsedError.type,
                field: parsedError.field,
                message: parsedError.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex">
                <Loading />
            </div>
        );
    }

    return (
        <form
            className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative md:items-center"
            onSubmit={onSubmit}>
            <header className="flex flex-col md:flex-row gap-4 justify-between max-w-4xl w-full">
                <div className="flex flex-col gap-1">
                    <Voltar title="Voltar" />
                    <h2 className="text-xl text-purple-800 font-bold">
                        Perfil de técnico
                    </h2>
                </div>
                <div className="flex gap-2 items-center">
                    <Button
                        onClick={handleCancelar}
                        variant="primary"
                        buttonName="Cancelar"
                        className="w-full md:h-fit px-4 md:w-fit"
                    />
                    <Button
                        variant="default"
                        buttonName="Salvar"
                        type="submit"
                        className="w-full md:h-fit px-4 md:w-fit"
                    />
                </div>
            </header>
            <div className="overflow-x-auto flex flex-col md:flex-row gap-4 md:gap-6 justify-center max-w-4xl w-full">
                <div className="border flex flex-col h-fit gap-5 md:gap-6 border-gray-500 rounded-xl p-5 md:p-6 flex-1">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-md text-gray-200 font-bold">
                            Dados pessoais
                        </h3>
                        <span className="text-xs text-gray-300">
                            Defina as informações do perfil técnico
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Input
                            type="text"
                            label="Nome"
                            name="name"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            type="email"
                            name="email"
                            label="E-mail"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Senha"
                            placeholder="Senha"
                            span={"Mínimo 6 dígitos"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <p className="text-xs text-red font-bold">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
                <ScheduleSelector
                    className="flex-2"
                    onChange={(selectedSlots) => setHorarios(selectedSlots)}
                />
            </div>
        </form>
    );
}
