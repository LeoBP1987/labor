import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";
import { Dict } from "styled-components/dist/types";

interface TarefaAtivaContextType {
    tarefaAtiva: Dict | null;
    setTarefaAtiva: (tarefaAtiva: Dict | null) => void;
}


export const TarefaAtivaContext = createContext<TarefaAtivaContextType | undefined>(undefined);
TarefaAtivaContext.displayName = "Tarefa Ativa";


interface TarefaAtivaProviderProps {
    children: ReactNode;
}

export const TarefaAtivaProvider = ( props:TarefaAtivaProviderProps ) => {
    const [tarefaAtiva, setTarefaAtiva] = useState<Dict | null>(null)

    return (
        <TarefaAtivaContext.Provider
            value={{
                tarefaAtiva,
                setTarefaAtiva
            }}
        >
            {props.children}
        </TarefaAtivaContext.Provider>
    )
};

export const useTarefaAtiva = () => {
    const context = useContext(TarefaAtivaContext);
    if (!context) {
        throw new Error('useTarefaAtiva deve ser usado dentro de um TarefaAtivaProvider');
    }
    return context;
};