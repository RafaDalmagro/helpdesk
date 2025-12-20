import { Status } from "./Status";

type InfoProps = {
    chamado: Chamado;
};

export function Info({ chamado }: InfoProps) {
    return (
        <section className="h-full flex flex-col gap-4">
            <div className="flex flex-col flex-1 gap-1 border border-gray-500 rounded-md p-5">
                <div className="flex items-center justify-between gap-4">
                    <span className="font-xs text-gray-300 font-bold">
                        {chamado.id}
                    </span>
                    <Status status={chamado.status} />
                </div>
                <h3 className="font-md font-bold">{chamado.titulo}</h3>
            </div>

            <div className="flex-1 border border-gray-500 rounded-md p-5">
				
			</div>
        </section>
    );
}
