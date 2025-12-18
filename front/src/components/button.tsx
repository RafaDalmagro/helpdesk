type ButtonProps = React.ComponentProps<"button"> & {
    name: string;
};

export function Button({ name, ...rest }: ButtonProps) {
    return <button {...rest}>{name}</button>;
}
