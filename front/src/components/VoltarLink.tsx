import arrowSvg from "../assets/arrow-left.svg";
import { useNavigate } from "react-router";

type Props = {
    title: string;
};

export function Voltar({ title }: Props) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center hover:opacity-70 transition hover:cursor-pointer">
            <img
                src={arrowSvg}
                alt="Flecha para esquerda"
                className="size-3.5"
            />
            <span className="text-xs text-gray-300 font-bold ">{title}</span>
        </button>
    );
}
