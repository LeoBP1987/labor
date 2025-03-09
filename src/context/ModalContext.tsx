import { createContext } from "react";
import { useState, ReactNode } from "react";

interface ModalContextType {
    visivel: 'flex' | 'none';
    setVisivel: React.Dispatch<React.SetStateAction<'none' | 'flex'>>;
    conteudo: 'none' | 'cadastro' | 'comentario' | 'novaTarefa' | 'alterarSenha' | 'novaRepeticao';
    setConteudo: React.Dispatch<React.SetStateAction<'none' | 'cadastro' | 'comentario' | 'novaTarefa' | 'alterarSenha' | 'novaRepeticao'>>
}


export const ModalContext = createContext<ModalContextType | undefined>(undefined);
ModalContext.displayName = "Modal";


interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ( props:ModalProviderProps ) => {
    const [visivel, setVisivel] = useState<'none' | 'flex'>('none')
    const [conteudo, setConteudo] = useState<'none' | 'cadastro' | 'comentario' | 'novaTarefa' | 'alterarSenha' | 'novaRepeticao'>('none');

    return (
        <ModalContext.Provider
            value={{
                setVisivel,
                visivel,
                conteudo,
                setConteudo
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}