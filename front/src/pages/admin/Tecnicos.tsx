import { useNavigate } from "react-router";
import { TechTable } from "../../components/TechTable";
import { ButtonLink } from "../../components/ButtonLink";

import { useTechs } from "../../hooks/useTechs";

export function Tecnicos() {
    const navigate = useNavigate();

    const { techs = [], loading, error } = useTechs();

    const handleVisualizar = (id: string | number) => {
        navigate(`/users/${id}`);
    };
    if (!techs) {
        return null;
    }

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative">
            <header>
                <h2 className="text-2xl text-purple-800 font-bold mb-4">
                    Técnicos
                </h2>
                <ButtonLink
                    to="/admin/tecnicos/novo"
                    variant="create"
                    title="Novo"
                />
            </header>

            <div className="overflow-x-auto border border-gray-500 rounded-xl">
                {loading ? (
                    <div className="p-4 text-center text-gray-400">
                        Carregando técnicos...
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-400">{error}</div>
                ) : techs.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        Nenhum técnico encontrado.
                    </div>
                ) : (
                    <TechTable data={techs} onVisualizar={handleVisualizar} />
                )}
            </div>
        </section>
    );
}
