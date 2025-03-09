import { createContext, ReactNode, useContext, useMemo, useState} from 'react';
import { Semana } from '../compartilhado/interfaces/ISemana';

interface SemanaContextType {
    semanaAtual: Semana | null
    setSemanaAtual: (semanaAtual: Semana | null) => void;
    semanaSeguinte: Semana | null
    setSemanaSeguinte: (semanaSeguinte: Semana | null) => void;
    carregando: boolean;
    setCarregando: (loading: boolean) => void;
    carregarSemana: boolean;
    setCarregarSemana: (carregarSemana: boolean) => void;
    carregarSemanaSeguinte: boolean;
    setCarregarSemanaSeguinte: (carregarSemana: boolean) => void;
}

export const SemanaContext = createContext<SemanaContextType | undefined>(undefined);

interface SemanaProviderProps {
    children: ReactNode;
}

export const SemanaProvider = ({ children }: SemanaProviderProps) => {
    const [semanaAtual, setSemanaAtual] = useState<Semana | null>(null);
    const [semanaSeguinte, setSemanaSeguinte] = useState<Semana | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [carregarSemana, setCarregarSemana] = useState(false);
    const [carregarSemanaSeguinte, setCarregarSemanaSeguinte] = useState(false);

    const value = useMemo(() => ({
        semanaAtual,
        setSemanaAtual,
        semanaSeguinte,
        setSemanaSeguinte,
        carregando,
        setCarregando,
        carregarSemana,
        setCarregarSemana,
        carregarSemanaSeguinte,
        setCarregarSemanaSeguinte
    }), [semanaAtual, semanaSeguinte, carregarSemana, carregarSemanaSeguinte, carregando]);

    return (
        <SemanaContext.Provider 
            value={value}>
            {children}
        </SemanaContext.Provider>
    );
};

export const useSemana = () => {
    const context = useContext(SemanaContext);
    if (!context) {
        throw new Error('useSemana deve ser usado dentro de um SemanaProvider');
    }
    return context;
};