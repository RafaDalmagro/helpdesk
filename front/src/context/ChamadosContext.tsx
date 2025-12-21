import { createContext, useContext, useMemo, useState } from "react";

type ChamadosContextType = {
    chamados: Chamado[];
    setStatusById: (id: Chamado["id"], status: ChamadoStatus) => void;
    getChamadoById: (id: Chamado["id"]) => Chamado | undefined;
};

const ChamadosContext = createContext<ChamadosContextType | null>(null);

const chamadosFake: Chamado[] = [
    {
        id: "00003",
        atualizadoEm: "13/04/25 20:56",
        titulo: "Instalação de Rede",
        servico: "Rede lenta",
        valorTotal: "R$ 180,00",
        tecnico: { nome: "Carlos Silva", iniciais: "CS" },
        status: "encerrado",
    },
    {
        id: "00002",
        atualizadoEm: "12/10/25 20:56",
        titulo: "Testando",
        servico: "Cobrança",
        valorTotal: "R$ 1.222,00",
        tecnico: { nome: "Rafael Lima", iniciais: "RL" },
        status: "aberto",
    },
    {
        id: "00001",
        atualizadoEm: "12/10/25 20:56",
        titulo: "Outro teste",
        servico: "Cobrança",
        valorTotal: "R$ 1.222,00",
        tecnico: { nome: "Rafael Lima", iniciais: "RL" },
        status: "em atendimento",
    },
];

export function ChamadosProvider({ children }: { children: React.ReactNode }) {
    const [chamados, setChamados] = useState<Chamado[]>(chamadosFake);

    const setStatusById = (id: Chamado["id"], status: ChamadoStatus) => {
        setChamados((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
    };

    const getChamadoById = (id: Chamado["id"]) =>
        chamados.find((c) => String(c.id) === String(id));

    const value = useMemo(
        () => ({ chamados, setStatusById, getChamadoById }),
        [chamados]
    );

    return (
        <ChamadosContext.Provider value={value}>
            {children}
        </ChamadosContext.Provider>
    );
}

export function useChamados() {
    const contexto = useContext(ChamadosContext);
    if (!contexto)
        throw new Error(
            "useChamados deve ser usado dentro de ChamadosProvider"
        );
    return contexto;
}
