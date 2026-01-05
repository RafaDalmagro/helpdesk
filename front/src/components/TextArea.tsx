type Props = React.ComponentProps<"textarea"> & {
    label?: string;
    helperText?: string;
};

export function TextArea({ label, helperText, className, ...rest }: Props) {
    return (
        <div className="flex flex-1 flex-col">
            {label && (
                <label className="text-xxs uppercase font-bold text-gray-300">
                    {label}
                </label>
            )}

            <textarea
                {...rest}
                className={`text-gray-400 w-full outline-none border-b border-gray-500 resize-none py-2 placeholder-gray-400 ${
                    className ?? ""
                }`}
            />

            {helperText && (
                <span className="text-xs text-gray-400 italic pt-1">
                    {helperText}
                </span>
            )}
        </div>
    );
}
