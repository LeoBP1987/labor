import { createContext, ReactNode, useContext, useMemo, useState} from 'react';
import { Tarefa } from '../compartilhado/interfaces/ITarefa';

interface TarefasPorDataContextType {
    tarefasPorData: Tarefa[] | [];
    setTarefasPorData: (tarefa: Tarefa[] | []) => void;
    dataPesquisa: string | null;
    setDataPesquisa: (data: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    consultando: boolean;
    setConsultando: (loading: boolean) => void;
}

export const TarefasPorDataContext = createContext<TarefasPorDataContextType | undefined>(undefined);

interface TarefasPorDataProviderProps {
    children: ReactNode;
}

export const TarefasPorDataProvider = ({ children }: TarefasPorDataProviderProps) => {
    const [tarefasPorData, setTarefasPorData] = useState<Tarefa[] | []>([]);
    const [dataPesquisa, setDataPesquisa] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [consultando, setConsultando] = useState(false);

    const values = useMemo(() => ({
        tarefasPorData,
        setTarefasPorData,
        dataPesquisa,
        setDataPesquisa,
        loading,
        setLoading,
        consultando,
        setConsultando
    }), [tarefasPorData, dataPesquisa, loading, consultando]);

    return (
        <TarefasPorDataContext.Provider 
            value={values}>
            {children}
        </TarefasPorDataContext.Provider>
    );
};

export const useTarefasPorData = () => {
    const context = useContext(TarefasPorDataContext);
    if (!context) {
        throw new Error('useTarefasPorData deve ser usado dentro de um TarefasPorDataProvider');
    }
    return context;
};