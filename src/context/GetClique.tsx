import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";

interface GetCliqueContextType {
    diaClicado: string;
    setDiaClicado: (loading: string) => void;
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

export const GetCliqueProvider = ( props:GetCliqueProviderProps ) => {
    const [diaClicado, setDiaClicado] = useState('segunda');
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