import { useEffect } from "react";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasAgenda } from "../services/tarefaServices";
import { useDatasAgenda } from "../context/DatasAgendaContext";

export const useGetTarefasAgenda = () => {
    const { tarefasAgenda, setTarefasAgenda, loading, setLoading } = useTarefas();
    const { dataInicio, dataFinal, consultando, setConsultando } = useDatasAgenda();

    useEffect(() => {
        const getTarefasAgendaData = async () => {
            try {

                if (dataFinal < dataInicio) {
                    throw new Error("A data Final não pode ser menor do que a data Inicial");
                }

                setLoading(true);
                const tarefasData = await getTarefasAgenda(dataInicio, dataFinal);

                setTarefasAgenda(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar Tarefas por data:', error);
            } finally {
                setLoading(false);
                setConsultando(false);
            }
        };

        if (consultando) {
            getTarefasAgendaData();
        }

    }, [consultando]);

    return { tarefasAgenda, loading };
};