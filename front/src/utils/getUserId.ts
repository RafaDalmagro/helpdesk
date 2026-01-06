export function getUserId(): string | null {
    try {
        const userString = localStorage.getItem("@HelpDesk:session:user");
        if (!userString) return null;

        const user = JSON.parse(userString);
        return user.id;
    } catch (error) {
        console.error("Erro ao recuperar ID do usuário:", error);
        return null;
    }
}
