import { useTarefas } from "../context/TarefasContext";
import { getTarefasPesquisa } from "../services/tarefaServices";

export const useGetTarefasPorPesquisa = () => {
    const { tarefasPorPesquisa, setTarefasPorPesquisa, loading, setLoading } = useTarefas();

    const getTarefasPorPesquisaData = async (descricao: string) => {
            try {

                if (!descricao) {
                    throw new Error("É necessário enviar algum dado para a pesquisa.");
                }

                setLoading(true);
                const tarefasData = await getTarefasPesquisa(descricao);

                setTarefasPorPesquisa(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar Tarefas por pesquisa:', error);
            } finally {
                setLoading(false);
            }
        };

    return { getTarefasPorPesquisaData, tarefasPorPesquisa, loading };
};