type Props = React.ComponentProps<"input"> & {
    label?: string;
    span?: string;
};

export function Input({ label, span, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 flex-col  ">
            {label && (
                <legend className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </legend>
            )}

            <input
                {...rest}
                className="text-gray-400 pb-0.5 w-full outline-none border-b border-gray-500"
            />

            {span && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {span}
                </span>
            )}
        </fieldset>
    );
}
