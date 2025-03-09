import { useEffect, useState } from "react";
import { getTarefasDataMenoresQue, getTarefasHoje, patchAgendamentoTarefas } from "../services/tarefaServices";
import { useGetDataAtual } from "./useGetDataAtual";
import { Dict } from "styled-components/dist/types";
import { useTarefas } from "../context/TarefasContext";

export const useReagendaTarefasNaoFinalizadas = () => {
    const { setTarefasHoje } = useTarefas();
    const [carregando, setCarregando] = useState(false);
    const { dataFormatada } = useGetDataAtual();

    useEffect(() => {
        const getTarefasDataMenorQueData = async () => {
            try {
                setCarregando(true);
                const tarefasData = await getTarefasDataMenoresQue(dataFormatada);

                const lista_atualizar = tarefasData.map((tarefa: Dict) => ({
                    id: tarefa.id,
                    agendamento: "9999-12-31"
                }));
                await patchAgendamentoTarefas(lista_atualizar);

                const tarefasHoje = await getTarefasHoje();
                setTarefasHoje(tarefasHoje);

            } catch (error) {
                console.error('Erro ao Atualizar Tarefas de hoje:', error);
            } finally {
                setCarregando(false);
            }
        };

        getTarefasDataMenorQueData();
    }, []);

    return { carregando };
};