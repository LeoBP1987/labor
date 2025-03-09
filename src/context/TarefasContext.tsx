import { createContext, ReactNode, useContext, useMemo, useState} from 'react';
import { Tarefa } from '../compartilhado/interfaces/ITarefa';
import { Agenda } from '../compartilhado/interfaces/IAgenda';

interface TarefasContextType {
    tarefasHoje: Tarefa[] | [];
    setTarefasHoje: (tarefa: Tarefa[] | []) => void;
    tarefasPilha: Tarefa[] | [];
    setTarefasPilha: (tarefa: Tarefa[] | []) => void;
    tarefasAgenda: Agenda[] | [];
    setTarefasAgenda: (tarefa: Agenda[] | []) => void;
    tarefasPorData: Tarefa[] | [];
    setTarefasPorData: (tarefa: Tarefa[] | []) => void;
    tarefasPorPesquisa: Tarefa[] | [];
    setTarefasPorPesquisa: (tarefa: Tarefa[] | []) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    consultando: boolean;
    setConsultando: (loading: boolean) => void;
}

export const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

interface TarefasProviderProps {
    children: ReactNode;
}

export const TarefasProvider = ({ children }: TarefasProviderProps) => {
    const [tarefasHoje, setTarefasHoje] = useState<Tarefa[] | []>([]);
    const [tarefasPilha, setTarefasPilha] = useState<Tarefa[] | []>([]);
    const [tarefasAgenda, setTarefasAgenda] = useState<Agenda[] | []>([]);
    const [tarefasPorData, setTarefasPorData] = useState<Tarefa[] | []>([]);
    const [tarefasPorPesquisa, setTarefasPorPesquisa] = useState<Tarefa[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [consultando, setConsultando] = useState(false);

    const values = useMemo(() => ({
        tarefasHoje,
        setTarefasHoje,
        tarefasPilha,
        setTarefasPilha,
        tarefasAgenda,
        setTarefasAgenda,
        loading,
        setLoading,
        tarefasPorData,
        setTarefasPorData,
        consultando,
        setConsultando,
        tarefasPorPesquisa,
        setTarefasPorPesquisa
    }), [tarefasHoje, tarefasPilha, tarefasAgenda, tarefasPorData, tarefasPorPesquisa, loading, consultando]);

    return (
        <TarefasContext.Provider 
            value={values}>
            {children}
        </TarefasContext.Provider>
    );
};

export const useTarefas = () => {
    const context = useContext(TarefasContext);
    if (!context) {
        throw new Error('useTarefas deve ser usado dentro de um TarefasProvider');
    }
    return context;
};