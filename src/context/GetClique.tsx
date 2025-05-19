import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";

interface GetCliqueContextType {
    diaClicado: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';
    setDiaClicado: (dia: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo') => void;
    diaClicadoSemanaSeguinte: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';
    setDiaClicadoSemanaSeguinte: (diaClicadoSemanaSeguinte: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo') => void;
    menuAtivo: string;
    setMenuAtivo: (loading: string) => void;
};


export const GetCliqueContext = createContext<GetCliqueContextType | undefined>(undefined);
GetCliqueContext.displayName = "GetClique";


interface GetCliqueProviderProps {
    children: ReactNode;
};

export const GetCliqueProvider = (props: GetCliqueProviderProps) => {
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const hoje = diasSemana[new Date().getDay()] as
        | 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

    const [diaClicado, setDiaClicado] = useState(hoje);
    const [menuAtivo, setMenuAtivo] = useState('hoje');
    const [diaClicadoSemanaSeguinte, setDiaClicadoSemanaSeguinte] = useState<'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo'>('segunda');

    return (
        <GetCliqueContext.Provider
            value={{
                diaClicado,
                setDiaClicado,
                menuAtivo,
                setMenuAtivo,
                diaClicadoSemanaSeguinte,
                setDiaClicadoSemanaSeguinte
            }}
        >
            {props.children}
        </GetCliqueContext.Provider>
    )
};

export const useGetClique = () => {
    const context = useContext(GetCliqueContext);
    if (!context) {
        throw new Error('useGetClique deve ser usado dentro de um GetCliqueProvider');
    }
    return context;
};