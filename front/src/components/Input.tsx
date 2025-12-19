type Props = React.ComponentProps<"input"> & {
    legend?: string;
    span?: string;
};

export function Input({ legend, span, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 flex-col  ">
            {legend && (
                <legend className="text-xxs uppercase font-bold text-gray-300">
                    {legend}
                </legend>
            )}

            <input
                {...rest}
                className="text-gray-400 pb-0.5 w-full outline-none border-b border-gray-500"
            />

            {span && <span className="text-xs text-gray-400 italic pt-1">{span}</span>}
        </fieldset>
    );
}
