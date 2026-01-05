import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";

export function NovoChamado() {
    return (
        <div className="flex w-full h-full bg-gray-600">
            <section className="bg-gray-600 flex flex-1 flex-col gap-4 rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-y-auto box-border px-6 pb-6 pt-7 md:px-12 md:pb-12 md:pt-13 mx-auto max-w-4xl">
                <h2 className="text-2xl text-purple-800 font-bold">
                    Novo Chamado
                </h2>
                <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg md:p-8">
                        <div>
                            <h3 className="text-md text-gray-200 font-bold">
                                Informações
                            </h3>
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
                                    className="py-2"
                                />
                            </div>
                            <div>
                                <TextArea
                                    label="Descrição"
                                    placeholder="Digite um título para o chamado"
                                    rows={5}
                                />
                            </div>
                            <div>
                                <Select
                                    label="Categoria de serviço"
                                    options={[
                                        { value: "Teste", label: "Opa fiote" },
                                    ]}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col gap-5 p-5 border border-gray-500 rounded-lg md:h-fit">
                        <div>
                            <h3 className="text-md text-gray-200 font-bold">
                                Resumo
                            </h3>
                            <p className="text-xs text-gray-300">
                                Valores e detalhes
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-0.5">
                                <label className="text-xs text-gray-400 font-bold">
                                    Categoria de serviço
                                </label>
                                <span className="text-xs text-gray-200">
                                    Erro de rede
                                </span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <label className="text-xs text-gray-400 font-bold">
                                    Custo inicial
                                </label>
                                <span className="text-gray-200 text-lg font-bold">
                                    <small className="text-xs">R$ </small>200,00
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-300">
                                O chamado será automaticamente atribuído a um
                                técnico disponível
                            </p>
                        </div>
                        <Button>Criar chamado</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
