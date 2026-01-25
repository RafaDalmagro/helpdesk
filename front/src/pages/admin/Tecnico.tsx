import { useEffect, useState } from "react";
import { useTechs } from "../../hooks/useTechs";
import { useParams, useNavigate } from "react-router";

import { ScheduleSelector } from "../../components/ScheduleSelector";
import { Button } from "../../components/Button";
import { Voltar } from "../../components/VoltarLink";
import { UserInitials } from "../../components/UserInitials";

export function Tecnico() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, error, fetchTechById, updateTechAvailability } =
        useTechs();

    const [horarios, setHorarios] = useState<string[]>([]);
    const [tech, setTech] = useState<UserTechDetail | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        async function loadTech() {
            if (!id) return;
            setIsFetching(true);

            const techData = await fetchTechById(id);

            setTech(techData);
            setIsFetching(false);
        }

        loadTech();
    }, [id]);

    function handleCancelar() {
        navigate(-1);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || !horarios.length) {
            return;
        }

        setSaveSuccess(false);

        const success = await updateTechAvailability(id, horarios);

        if (success) {
            setSaveSuccess(true);
            setTimeout(() => {
                navigate(-1);
            }, 1500);
        }
    };

    return (
        <form
            className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative md:items-center"
            onSubmit={onSubmit}>
            <header className="flex flex-col md:flex-row gap-4 justify-between max-w-4xl w-full">
                <div className="flex flex-col gap-1">
                    <Voltar title="Voltar" to="/chamados" />
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
                        disabled={loading}
                    />
                    <Button
                        variant="default"
                        buttonName={loading ? "Salvando..." : "Salvar"}
                        type="submit"
                        disabled={loading}
                        className="w-full md:h-fit px-4 md:w-fit"
                    />
                </div>
            </header>

            {isFetching ? (
                <div className="p-4 text-center text-gray-400">
                    Carregando técnico...
                </div>
            ) : error && !saveSuccess ? (
                <div className="p-4 text-center text-red-400">{error}</div>
            ) : saveSuccess ? (
                <div className="p-4 text-center text-gray-400 font-bold">
                    Horários atualizados com sucesso! Você será redirecionado...
                </div>
            ) : tech ? (
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
                        <UserInitials
                            name={tech.name}
                            variant="simple"
                            className="size-12 text-sm"
                        />
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <label className="text-xxs text-gray-300 uppercase font-bold">
                                    Name
                                </label>
                                <span className="text-md text-gray-200 border-b border-gray-500 py-2">
                                    {tech.name}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xxs text-gray-300 uppercase font-bold">
                                    E-mail
                                </label>
                                <span className="text-md text-gray-200 border-b border-gray-500 py-2">
                                    {tech.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ScheduleSelector
                        className="flex-2"
                        onChange={(selectedSlots) => setHorarios(selectedSlots)}
                    />
                </div>
            ) : (
                <div className="p-4 text-center text-gray-400">
                    Técnico não encontrado.
                </div>
            )}
        </form>
    );
}
