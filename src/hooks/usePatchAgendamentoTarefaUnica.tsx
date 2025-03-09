import { useTarefas } from "../context/TarefasContext";
import { useTarefasPorData } from "../context/TarefasPorDataContext";
import { getTarefasPilha, getTarefasPorData, patchAgendamentoTarefa } from "../services/tarefaServices";


export const usePatchAgendamentoTarefaUnica = () => {
    const { dataPesquisa, setTarefasPorData, setConsultando, setLoading, loading } = useTarefasPorData();
    const { setTarefasPilha } = useTarefas();

    const patchAgendamentoTarefaUnicaData = async (tarefa_id: string) => {
        try {
            setLoading(true);

            console.log(dataPesquisa)

            const tarefa = {
                'id': tarefa_id,
                'agendamento': dataPesquisa
            }

            const tarefa_atualizada = await patchAgendamentoTarefa(tarefa);

            if (!tarefa_atualizada) {
                throw new Error("Erro ao reagendar Tarefa")
            }

            const tarefasPorData = await getTarefasPorData(dataPesquisa!);
            setTarefasPorData(tarefasPorData);
            setConsultando(true);

            const tarefasData = await getTarefasPilha();
            setTarefasPilha(tarefasData);

            setLoading(false);
        } catch (error) {
            console.error('Erro ao reagendar Tarefas:', error);
        }
    }

    return { patchAgendamentoTarefaUnicaData, loading }
}