import { useEffect, useState } from "react";
import { useTechs } from "../../hooks/useTechs";
import { useParams } from "react-router";

export function Tecnico() {
    const { id } = useParams();
    const { loading, error, fetchTechById } = useTechs();
    const [tech, setTech] = useState<UserTechDetail | null>(null);
    const [isFetching, setIsFetching] = useState(true);

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

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">Técnico</h2>

            {isFetching ? (
                <div className="p-4 text-center text-gray-400">
                    Carregando técnico...
                </div>
            ) : error ? (
                <div className="p-4 text-center text-red-400">{error}</div>
            ) : tech ? (
                <div className="overflow-x-auto border border-gray-500 rounded-xl">
                    {/* Adicionar conteúdo do técnico aqui */}
                    <pre>{JSON.stringify(tech, null, 2)}</pre>
                </div>
            ) : (
                <div className="p-4 text-center text-gray-400">
                    Técnico não encontrado.
                </div>
            )}
        </section>
    );
}
