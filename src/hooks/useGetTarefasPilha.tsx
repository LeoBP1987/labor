import { useEffect } from "react";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasPilha } from "../services/tarefaServices";

export const useGetTarefasPilha = () => {
    const { tarefasPilha, setTarefasPilha, loading, setLoading } = useTarefas();

    useEffect(() => {
        const getTarefasPilhaData = async () => {
            try {
                setLoading(true);
                const tarefasData = await getTarefasPilha();

                setTarefasPilha(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar Tarefas da pilha:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!tarefasPilha || tarefasPilha?.length === 0) {
            getTarefasPilhaData();
        }
    }, []);

    return { tarefasPilha, loading };
};