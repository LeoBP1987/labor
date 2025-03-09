import { createContext, useContext, useMemo } from "react";
import { useState, ReactNode } from "react";
import { Repeticoes } from "../compartilhado/interfaces/IRepeticoes";

interface RepeticoesContextType {
    repeticoes: Repeticoes[] | [];
    setRepeticoes: (repeticoes: Repeticoes[] | []) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    carregaRepeticao: boolean;
    setCarregaRepeticao: (loading: boolean) => void;
    listaRepeticao: String[];
    setListaRepeticao: (listaRepeticao: String[] | []) => void;
}


export const RepeticoesContext = createContext<RepeticoesContextType | undefined>(undefined);
RepeticoesContext.displayName = "Repetições";

interface RepeticoesProviderProps {
    children: ReactNode;
}

export const RepeticoesProvider = ( props:RepeticoesProviderProps ) => {
    const [repeticoes, setRepeticoes] = useState<Repeticoes[] | []>([])
    const [loading, setLoading] = useState(false)
    const [carregaRepeticao, setCarregaRepeticao] = useState(false)
    const [listaRepeticao, setListaRepeticao] = useState<String[] | []>([])

    const value = useMemo(() => ({
        repeticoes,
        setRepeticoes,
        loading,
        setLoading,
        carregaRepeticao,
        setCarregaRepeticao,
        listaRepeticao,
        setListaRepeticao
    }), [repeticoes, listaRepeticao, loading, carregaRepeticao]);

    return (
        <RepeticoesContext.Provider
            value={value}
        >
            {props.children}
        </RepeticoesContext.Provider>
    )
};

export const useRepeticoes = () => {
    const context = useContext(RepeticoesContext);
    if (!context) {
        throw new Error('useRepeticoes deve ser usado dentro de um RepeticoesProvider');
    }
    return context;
};