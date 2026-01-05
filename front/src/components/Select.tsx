type Props = React.ComponentProps<"select"> & {
    label?: string;
    helperText?: string;
};

export function Select({ label, helperText, className, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 flex-col">
            {label && (
                <label className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </label>
            )}

            <select
                {...rest}
                className={`text-gray-400 pb-0.5 w-full outline-none border-b border-gray-500 ${
                    className ?? ""
                }`}
            />

            {helperText && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {helperText}
                </span>
            )}
        </fieldset>
    );
}
