import { createContext, useContext } from "react";
import { useState, ReactNode } from "react";
import { Dict } from "styled-components/dist/types";

interface ListaSelecionadosContextType {
    listaParaDeletar: Number[];
    setListaParaDeletar: React.Dispatch<React.SetStateAction<Number[]>>;
    listaParaAtualizar: Dict[];
    setListaParaAtualizar: React.Dispatch<React.SetStateAction<Dict[]>>;
}


export const ListaSelecionadosContext = createContext<ListaSelecionadosContextType | undefined>(undefined);
ListaSelecionadosContext.displayName = "Modal";


interface ListaSelecionadosProviderProps {
    children: ReactNode;
}

export const ListaSelecionadosProvider = ( props:ListaSelecionadosProviderProps ) => {
    const [listaParaDeletar, setListaParaDeletar] = useState<Number[]>([]);
    const [listaParaAtualizar, setListaParaAtualizar] = useState<Dict[]>([]);

    return (
        <ListaSelecionadosContext.Provider
            value={{
                listaParaDeletar,
                setListaParaDeletar,
                listaParaAtualizar,
                setListaParaAtualizar
            }}
        >
            {props.children}
        </ListaSelecionadosContext.Provider>
    )
};

export const useListaSelecionados = () => {
    const context = useContext(ListaSelecionadosContext);
    if (!context) {
        throw new Error('useListaSelecionados deve ser usado dentro de um ListaSelecionadosProvider');
    }
    return context;
};