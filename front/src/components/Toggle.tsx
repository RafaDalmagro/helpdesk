type ToggleProps = {
    onClick: () => void;
    icon: string;
};

export function Toggle({ onClick, icon }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="hover:cursor-pointer hover:opacity-60 transition ease-linear md:hidden">
            <img src={icon} alt="Ícone toggle" className="size-12" />
        </button>
    );
}
