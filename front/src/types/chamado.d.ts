export {};

declare global {
    type ChamadoStatus = "aberto" | "em atendimento" | "encerrado";
    type UserRoles = "tecnico" | "cliente" | "administrador";

    interface User {
        nome: string;
        iniciais: string;
        role: UserRoles;
        email: string;
    }

    interface Chamado {
        id: string | number;
        atualizadoEm: string;
        titulo: string;
        servico: string;
        valorTotal: string;
        user: User;
        status: ChamadoStatus;
    }

    // ✅ Tipagem global para o componente UserInitials
    interface UserInitialsProps {
        userInitials: string;
        userEmail?: string;
        userRole?: UserRole;
        userName?: string;
    }
}
