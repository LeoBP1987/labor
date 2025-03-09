import { Dict } from "styled-components/dist/types";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasHoje, getTarefasPilha, putTarefas } from "../services/tarefaServices";


export const usePutTarefas = () => {
    const { setTarefasHoje, setTarefasPilha, loading, setLoading } = useTarefas();

    const putTarefasData = async (tarefa: Dict) => {
        try {
            setLoading(true);
            const tarefa_atualizada = await putTarefas(tarefa);

            if (!tarefa_atualizada) {
                throw new Error("Erro ao atualizar Tarefa")
            }

            const tarefasPilha = await getTarefasPilha();
            setTarefasPilha(tarefasPilha);

            const tarefasHoje = await getTarefasHoje();
            setTarefasHoje(tarefasHoje);

            setLoading(false);
        } catch (error) {
            console.error('Erro ao atualizar Tarefas:', error);
        }
    }

    return { putTarefasData, loading }
}