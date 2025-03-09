import { useEffect } from "react";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasHoje } from "../services/tarefaServices";

export const useGetTarefasHoje = () => {
    const { tarefasHoje, setTarefasHoje, loading, setLoading } = useTarefas();

    useEffect(() => {
        const getTarefasHojeData = async () => {
            try {
                setLoading(true);
                const tarefasData = await getTarefasHoje();

                setTarefasHoje(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar Tarefas de hoje:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!tarefasHoje || tarefasHoje?.length === 0) {
            getTarefasHojeData();
        }
    }, []);

    return { tarefasHoje, loading };
};