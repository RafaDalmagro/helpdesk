export function getInitials(name: string): string {
    if (!name) return "";

    const parts = name.trim().split(" ");

    const first = parts[0]?.[0] ?? "";
    const second = parts[1]?.[0] ?? "";

    return (first + second).toUpperCase();
}
