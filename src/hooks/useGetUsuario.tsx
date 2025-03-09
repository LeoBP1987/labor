import { useEffect } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import { getUsuario } from '../services/usuarioServices';

export const useGetUsuario = () => {
    const { usuario, setUsuario, loading, setLoading } = useUsuario();

    useEffect(() => {
        const getUsuarioData = async () => {
            try {
                setLoading(true);
                const usuarioData = await getUsuario();

                setUsuario(usuarioData);
            } catch (error) {
                console.error('Erro ao buscar Usuario:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!usuario) {
            getUsuarioData();
        }
    }, [usuario]);

    return { usuario, loading, setUsuario };
};