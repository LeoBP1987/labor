import { createContext, ReactNode, useContext, useState} from 'react';
import { Usuario } from '../compartilhado/interfaces/IUsuario';

interface UsuarioContextType {
    usuario: Usuario | null;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

interface UsuarioProviderProps {
    children: ReactNode;
}

export const UsuarioProvider = ({ children }: UsuarioProviderProps) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <UsuarioContext.Provider 
            value={{ 
                usuario,
                setUsuario, 
                loading,
                setLoading
        }}>
            {children}
        </UsuarioContext.Provider>
    );
};

export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useLeitor deve ser usado dentro de um UsuarioProvider');
    }
    return context;
};