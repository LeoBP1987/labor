import { useDatasAgenda } from "../context/DatasAgendaContext";
import { useListaSelecionados } from "../context/ListaSelecionadosContext";
import { useQuantidades } from "../context/QuantidadesContext";
import { useTarefas } from "../context/TarefasContext";
import { deleteTarefas, getTarefasAgenda, getTarefasHoje, getTarefasPilha } from "../services/tarefaServices";


export const useDeleteTarefas = () => {
    const { setTarefasHoje, setTarefasPilha, setTarefasAgenda, loading, setLoading } = useTarefas();
    const { dataInicio, dataFinal } = useDatasAgenda();
    const { listaParaDeletar, setListaParaDeletar, setListaParaAtualizar } = useListaSelecionados();
    const { setCarregaQuantidades } = useQuantidades();

    const deleteTarefasData = async (tipo: string) => {
        try {
            setLoading(true);
            const tarefa_deletada = await deleteTarefas(listaParaDeletar);

            if (!tarefa_deletada) {
                throw new Error("Erro ao deletar Tarefa")
            }

            if (tipo === "pilha") {
                const tarefasData = await getTarefasPilha();
                setTarefasPilha(tarefasData);
            }
            
            if (tipo === "hoje") {
                const tarefasData = await getTarefasHoje();
                setTarefasHoje(tarefasData);
            }

            if (tipo === "agenda") {
                const tarefasData = await getTarefasAgenda(dataInicio, dataFinal);
                setTarefasAgenda(tarefasData);
            }

            setListaParaDeletar([]);
            setListaParaAtualizar([]);
            setCarregaQuantidades(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao deletar Tarefas:', error);
        }
    }

    return { deleteTarefasData, loading }
}