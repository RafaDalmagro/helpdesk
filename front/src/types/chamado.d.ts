export {};

declare global {
    type ChamadoStatus = "aberto" | "em atendimento" | "encerrado";

    interface Chamado {
        id: string | number;
        atualizadoEm: string;
        titulo: string;
        servico: string;
        valorTotal: string;
        tecnico: {
            nome: string;
            iniciais: string;
        };
        status: ChamadoStatus;
    }
}
