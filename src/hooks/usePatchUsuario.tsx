import { useState } from 'react';
import { useUsuario } from '../context/UsuarioContext';
import { getUsuario, patchDadosUsuario, patchSenhaUsuario } from '../services/usuarioServices';

export const usePatchUsuario = () => {
    const { setUsuario, loading, setLoading } = useUsuario();
    const [error, setError] = useState<string | null>(null);

    const patchUsuarioDadosData = async (id: number, nome: string, login: string, email: string) => {
            try {

                setLoading(true);
                setError(null);
                const atualiza = await patchDadosUsuario(id, nome, login, email);

                if(!atualiza) {
                    throw new Error("Erro ao atualizar usuario");
                }

                const usuarioData = await getUsuario();

                setUsuario(usuarioData);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Erro ao atualizar dados de usuario");
            } finally {
                setLoading(false);
            }
        };

    const patchUsuarioSenhaData = async (senha: string, confirmar: string) => {
            try {
                setLoading(true);
                setError(null);
                if(senha !== confirmar) {
                    setError("As senhas devem ser iguais.");
                    return 
                }

                const atualiza = await patchSenhaUsuario(senha);

                if(!atualiza) {
                    throw new Error("Erro ao atualizar usuario");
                }

                const usuarioData = await getUsuario();

                setUsuario(usuarioData);
                
                return atualiza
            } catch (error) {
                setError(error instanceof Error ? error.message : "Erro ao atualizar alterar senha");
            } finally {
                setLoading(false);
            }
        };

        return { patchUsuarioDadosData, patchUsuarioSenhaData, loading, error };

    };

    