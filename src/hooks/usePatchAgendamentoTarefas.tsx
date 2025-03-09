import { useDatasAgenda } from "../context/DatasAgendaContext";
import { useListaSelecionados } from "../context/ListaSelecionadosContext";
import { useTarefas } from "../context/TarefasContext";
import { getTarefasAgenda, getTarefasHoje, getTarefasPilha, getTarefasPorData, patchAgendamentoTarefas } from "../services/tarefaServices";
import { useGetDataAtual } from "./useGetDataAtual";
import { useGetTarefasPorData } from "./useGetTarefasPorData";


export const usePatchAgendamentoTarefas = () => {
    const { setTarefasHoje, setTarefasPilha, setTarefasAgenda, loading, setLoading } = useTarefas();
    const { dataInicio, dataFinal } = useDatasAgenda();
    const { dataPesquisa, setTarefasPorData, setConsultando } = useGetTarefasPorData();
    const { listaParaAtualizar, setListaParaAtualizar, setListaParaDeletar } = useListaSelecionados();
    const { dataFormatadaAmanha } = useGetDataAtual();

    const patchAgendamentoTarefasData = async (tipo: string, page: string) => {
        try {
            setLoading(true);

            const nova_lista = listaParaAtualizar.map(tarefa => ({
                ...tarefa,
                agendamento: tipo === "pilha" ? "9999-12-31" :
                    tipo === "seguinte" ? dataFormatadaAmanha :
                    tipo
            }))

            const tarefa_atualizada = await patchAgendamentoTarefas(nova_lista);

            if (!tarefa_atualizada) {
                throw new Error("Erro ao reagendar Tarefa")
            }

            if (page === "pilha") {
                const tarefasPilha = await getTarefasPilha();
                setTarefasPilha(tarefasPilha);
            }

            if (page === "hoje") {
                const tarefasHoje = await getTarefasHoje();
                setTarefasHoje(tarefasHoje);
            }

            if (page === "agenda") {
                const tarefasAgenda = await getTarefasAgenda(dataInicio, dataFinal);
                setTarefasAgenda(tarefasAgenda);
            }

            if (page === "semana") {
                const tarefasPorData = await getTarefasPorData(dataPesquisa!);
                setTarefasPorData(tarefasPorData);
                setConsultando(true);
            }

            setListaParaAtualizar([]);
            setListaParaDeletar([]);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao reagendar Tarefas:', error);
        }
    }

    return { patchAgendamentoTarefasData, loading }
}