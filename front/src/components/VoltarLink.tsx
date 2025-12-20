import arrowSvg from "../assets/arrow-left.svg";
import { Link } from "react-router";

type Props = {
    title: string;
    to: string;
};

export function Voltar({ title, to }: Props) {
    return (
        <Link to={to} className="flex gap-2 items-center">
            <img
                src={arrowSvg}
                alt="Flecha para esquerda"
                className="size-3.5"
            />
            <span className="text-xs text-gray-300 font-bold ">{title}</span>
        </Link>
    );
}
