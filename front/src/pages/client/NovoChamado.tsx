import { Input } from "../../components/Input";
import { Select } from "../../components/Select";

export function NovoChamado() {
    return (
        <section className="bg-gray-600 flex flex-1 flex-col gap-4 rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7">
            <h2 className="text-2xl text-purple-800 font-bold">Novo Chamado</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg">
                    <div>
                        <h3 className="text-md text-gray-200">Informações</h3>
                        <p className="text-xs text-gray-300">
                            Configure os dias e horários em que você está
                            disponível para atender chamados
                        </p>
                    </div>
                    <form action="" className="flex flex-col gap-4">
                        <div>
                            <Input
                                label="Título"
                                placeholder="Digite um título para o chamado"
                            />
                        </div>
                        <div>
                            <Input
                                label="Descrição"
                                placeholder="Digite um título para o chamado"
                            />
                        </div>
                        <div>
                            <Select label="Categoria de serviço">
                            </Select>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg">
                    <h3>Resumo</h3>
                </div>
            </div>
        </section>
    );
}
