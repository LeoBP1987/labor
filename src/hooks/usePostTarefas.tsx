import { useDatasAgenda } from "../context/DatasAgendaContext";
import { useQuantidades } from "../context/QuantidadesContext";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasAgenda, getTarefasHoje, getTarefasPilha, postTarefas } from "../services/tarefaServices";


export const usePostTarefas = () => {
    const { setTarefasHoje, setTarefasPilha, setTarefasAgenda, loading, setLoading } = useTarefas();
    const { dataInicio, dataFinal } = useDatasAgenda();
    const { setCarregaQuantidades } = useQuantidades();

    const postTarefasData = async (descricao: string, tipo: string, agendamento?: string) => {
        try {
            setLoading(true);
            const nova_tarefa = await postTarefas(descricao, agendamento);

            if (!nova_tarefa) {
                throw new Error("Erro ao criar Tarefa")
            }

            if (tipo === "pilha") {
                const tarefasData = await getTarefasPilha();
                setTarefasPilha(tarefasData);
            }
            if (tipo === "hoje") {
                const tarefasData = await getTarefasHoje();
                setTarefasHoje(tarefasData);
            }

            if (tipo ===  "agenda") {
                const tarefasData = await getTarefasAgenda(dataInicio, dataFinal);
                setTarefasAgenda(tarefasData);
            }

            setCarregaQuantidades(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao criar Tarefas:', error);
        }
    }

    return { postTarefasData, loading }
}