import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";
import { useGetDataAtual } from "../hooks/useGetDataAtual";

interface DatasAgendaContextType {
    dataInicio: string;
    setDataInicio: React.Dispatch<React.SetStateAction<string>>;
    dataFinal: string;
    setDataFinal: React.Dispatch<React.SetStateAction<string>>;
    consultando: boolean;
    setConsultando: React.Dispatch<React.SetStateAction<boolean>>;
}


export const DatasAgendaContext = createContext<DatasAgendaContextType | undefined>(undefined);
DatasAgendaContext.displayName = "Datas-Agenda";


interface DatasAgendaProviderProps {
    children: ReactNode;
}

export const DatasAgendaProvider = (props: DatasAgendaProviderProps) => {
    const { dataFormatada } = useGetDataAtual();

    const [dataInicio, setDataInicio] = useState(dataFormatada);
    const [dataFinal, setDataFinal] = useState(dataInicio);
    const [consultando, setConsultando] = useState(true);

    return (
        <DatasAgendaContext.Provider
            value={{
                setDataInicio,
                dataInicio,
                setDataFinal,
                dataFinal,
                consultando,
                setConsultando
            }}
        >
            {props.children}
        </DatasAgendaContext.Provider>
    )
};

export const useDatasAgenda = () => {
    const context = useContext(DatasAgendaContext);
    if (!context) {
        throw new Error('useDatasAgenda deve ser usado dentro de um DatasAgendaProvider');
    }
    return context;
};