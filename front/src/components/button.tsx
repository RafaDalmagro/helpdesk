type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean;
};

export function Button({
    children,
    isLoading,
    type = "button",
    ...rest
}: Props) {
    return (
        <button
            className="flex justify-center py-2.5 rounded-md bg-gray-200 text-gray-600 text-sm font-bold cursor-pointer hover:bg-gray-300 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed"
            type={type}
            disabled={isLoading}
            {...rest}>
            {children}
        </button>
    );
}
