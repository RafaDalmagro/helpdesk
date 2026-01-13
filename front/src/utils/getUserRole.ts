export function getUserRole(): "admin" | "tech" | "client" {
    try {
        const userString = localStorage.getItem("@HelpDesk:session:user");
        if (!userString) return "client";

        const user = JSON.parse(userString);
        return user.role;
    } catch (error) {
        console.error("Erro ao recuperar ID do usuário:", error);
        return "client";
    }
}
