type Props = React.ComponentProps<"input"> & {
    legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 border-b border-gray-500">
            {legend && (
                <legend className="text-xxs uppercase font-bold text-gray-300">
                    {legend}
                </legend>
            )}

            <input
                type="text"
                {...rest}
                className="text-gray-400 pb-1 w-full outline-none"
            />
        </fieldset>
    );
}
