import { Voltar } from "../components/VoltarLink";
export function Chamado() {
    return (
        <section className="bg-gray-600 flex flex-1 flex-col rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7">
            <header>
                <Voltar title="Voltar" to="/chamados" />

                <h2 className="text-2xl text-purple-800 font-bold mb-4">
                    Chamado detalhado
                </h2>
            </header>
        </section>
    );
}
