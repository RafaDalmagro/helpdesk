import { Status } from "./Status";

type InfoProps = {
    chamado: Chamado;
};

export function Info({ chamado }: InfoProps) {
    return (
        <section className=" h-full grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-[60%_1fr] lg:h-fit">
            <div className="flex flex-col gap-5 border border-gray-500 rounded-md p-5 md:p-6">
                <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-gray-300 font-bold">
                            {chamado.id}
                        </span>
                        <Status status={chamado.status} className="max-[500px]:hidden block"/>
                    </div>
                    <h3 className="font-md font-bold">{chamado.titulo}</h3>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Descrição
                    </h4>
                    <p className="text-sm text-gray-200">{chamado.servico}</p>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Categoria
                    </h4>
                    <p className="text-sm text-gray-200">{chamado.servico}</p>
                </div>
                <div className="flex flex-1 gap-8">
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Criado em
                        </h4>
                        <p className="text-sm text-gray-200">
                            {chamado.atualizadoEm}
                        </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Atualizado em
                        </h4>
                        <p className="text-sm text-gray-200">
                            {chamado.atualizadoEm}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border border-gray-500 rounded-md p-5 gap-8">
                <div className="flex flex-1 flex-col gap-2">
                    <h4 className="text-xs text-gray-400 font-bold">
                        Técnico responsável
                    </h4>
                    <div className="flex items-center justify-start gap-2">
                        <span className="flex items-center justify-center bg-purple-800 rounded-full text-gray-600 text-xs leading-none size-8">
                            {chamado.user.iniciais}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-200">
                                {chamado.user.nome}
                            </span>
                            <span className="text-gray-300 text-xs">
                                {chamado.user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-1 flex-col">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Valores
                        </h4>
                        <div className="flex justify-between text-xs text-gray-200">
                            <span>Preço base</span>
                            <span>{chamado.valorTotal}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <h4 className="text-xs text-gray-400 font-bold">
                            Adicionais
                        </h4>
                        <div className="text-xs text-gray-200">
                            <div className="flex justify-between ">
                                <span>Assinatura de backup</span>
                                <span>{chamado.valorTotal}</span>
                            </div>
                            <div className="flex justify-between ">
                                <span>Formatação do PC</span>
                                <span>{chamado.valorTotal}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-gray-500">
                        <div className="flex justify-between">
                            <span className="text-gray-200 font-bold text-sm">
                                Total
                            </span>
                            <span className="text-gray-200 font-bold text-sm">
                                {chamado.valorTotal}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
