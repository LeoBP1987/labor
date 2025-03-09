import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";

interface UteisContextType {
    checaSemana: boolean;
    setChecaSemana: (checaSemana: boolean) => void;
    carregaSemana: boolean;
    setCarregaSemana: (carregaSemana: boolean) => void;
};


export const UteisContext = createContext<UteisContextType | undefined>(undefined);
UteisContext.displayName = "Uteis";


interface UteisProviderProps {
    children: ReactNode;
};

export const UteisProvider = ( props:UteisProviderProps ) => {
    const [checaSemana, setChecaSemana] = useState<boolean>(false);
    const [carregaSemana, setCarregaSemana] = useState<boolean>(false);

    return (
        <UteisContext.Provider
            value={{
                checaSemana,
                setChecaSemana,
                carregaSemana,
                setCarregaSemana
            }}
        >
            {props.children}
        </UteisContext.Provider>
    )
};

export const useUteis = () => {
    const context = useContext(UteisContext);
    if (!context) {
        throw new Error('useUteis deve ser usado dentro de um UteisProvider');
    }
    return context;
};