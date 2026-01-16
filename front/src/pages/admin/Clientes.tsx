import { useNavigate } from "react-router";
import { Table } from "../../components/Table";

export function Clientes() {
    const navigate = useNavigate();

    const handleVisualizar = (id: string | number) => {
        navigate(`/users/${id}`);
    };

    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border gap-4 md:gap-6 px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 relative">
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
                Clientes
            </h2>
            {/* <div className="overflow-x-auto border border-gray-500 rounded-xl">
                {loading ? (
                    <div className="p-4 text-center text-gray-400">
                        Carregando chamados...
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-400">{error}</div>
                ) : tickets.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                        Nenhum chamado encontrado.
                    </div>
                ) : (
                    <Table
                        role={role}
                        data={tickets}
                        onVisualizar={handleVisualizar}
                    />
                )}
            </div> */}
        </section>
    );
}
