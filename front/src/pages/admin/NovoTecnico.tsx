import { useParams, useNavigate } from "react-router";

import { Button } from "../../components/Button";
import { Voltar } from "../../components/VoltarLink";

export function NovoTecnico() {
    const { id } = useParams();
    const navigate = useNavigate();

    function handleCancelar() {
        navigate(-1);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };

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
        </form>
    );
}
