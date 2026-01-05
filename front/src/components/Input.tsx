type Props = React.ComponentProps<"input"> & {
    label?: string;
    span?: string;
    className?: string;
};

export function Input({ label, span, className, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 flex-col  ">
            {label && (
                <legend className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </legend>
            )}

            <input
                {...rest}
                className={`text-gray-400 w-full outline-none border-b border-gray-500 placeholder-gray-400 ${className}`}
            />

            {span && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {span}
                </span>
            )}
        </fieldset>
    );
}
