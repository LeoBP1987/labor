import { createContext, useContext, useMemo } from "react";
import { useState, ReactNode } from "react";
import { Dict } from "styled-components/dist/types";

interface QuantidadesContextType {
    quantidades: Dict;
    setQuantidades: (quantidades: Dict) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    carregaQuantidades: boolean;
    setCarregaQuantidades: (carregaQuantidades: boolean) => void;
};


export const QuantidadesContext = createContext<QuantidadesContextType | undefined>(undefined);
QuantidadesContext.displayName = "Quantidades";


interface QuantidadesProviderProps {
    children: ReactNode;
};

export const QuantidadesProvider = ( props:QuantidadesProviderProps ) => {
    const [quantidades, setQuantidades] = useState<Dict>({});
    const [carregaQuantidades, setCarregaQuantidades] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const values = useMemo(() => ({
            quantidades,
            setQuantidades,
            carregaQuantidades,
            setCarregaQuantidades,
            loading,
            setLoading
    }), [quantidades, carregaQuantidades, loading]);

    return (
        <QuantidadesContext.Provider
            value={values}
        >
            {props.children}
        </QuantidadesContext.Provider>
    )
};

export const useQuantidades = () => {
    const context = useContext(QuantidadesContext);
    if (!context) {
        throw new Error('useQuantidades deve ser usado dentro de um QuantidadesProvider');
    }
    return context;
};