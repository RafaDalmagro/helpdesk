type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean;
    variant?: "default" | "primary";
};

export function Button({
    children,
    isLoading,
    type = "button",
    variant = "default",
    ...rest
}: Props) {
    const variantClasses = {
        default: "bg-gray-200 text-gray-600 hover:bg-gray-300",
        primary: "bg-gray-500 text-gray-200 hover:bg-gray-400",
    };

    return (
        <button
            className={`flex justify-center w-full py-2.5 rounded-md text-sm font-bold cursor-pointer transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]}`}
            type={type}
            disabled={isLoading}
            {...rest}>
            {children}
        </button>
    );
}
