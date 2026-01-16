export function formatCurrency(value: number | string): string {
    const numberValue = Number(value);

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numberValue);
}
