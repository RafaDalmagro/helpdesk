type Props = React.ComponentProps<"input"> & {
    label?: string;
    span?: string;
    className?: string;
    prefix?: string;
};

export function Input({ label, span, className, prefix, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 flex-col">
            {label && (
                <legend className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </legend>
            )}

            <div className="relative flex items-center">
                {prefix && (
                    <span className="absolute left-0 text-sm text-gray-200 pointer-events-none">
                        {prefix}
                    </span>
                )}
                <input
                    {...rest}
                    className={`text-gray-400 w-full outline-none border-b border-gray-500 placeholder-gray-400 ${prefix ? "pl-6" : ""} ${className || ""}`.trim()}
                />
            </div>

            {span && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {span}
                </span>
            )}
        </fieldset>
    );
}
