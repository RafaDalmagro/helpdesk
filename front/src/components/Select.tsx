type SelectOption = {
    value: string;
    label: string;
};

type Props = React.ComponentProps<"select"> & {
    label?: string;
    helperText?: string;
    options: SelectOption[];
};

export function Select({
    label,
    helperText,
    options,
    className,
    ...rest
}: Props) {
    return (
        <div className="flex flex-1 flex-col">
            {label && (
                <label className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </label>
            )}

            <select
                {...rest}
                defaultValue=""
                className={`text-gray-400 py-2 w-full outline-none border-b border-gray-500 ${
                    className ?? ""
                }`}>
                <option value="" disabled hidden className="p-2">
                    Selecione a categoria de atendimento
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {helperText && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {helperText}
                </span>
            )}
        </div>
    );
}
