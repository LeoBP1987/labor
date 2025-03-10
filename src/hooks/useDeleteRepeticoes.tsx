import { useListaSelecionados } from "../context/ListaSelecionadosContext";
import { useQuantidades } from "../context/QuantidadesContext";
import { useRepeticoes } from "../context/RepeticoesContext";
import { deleteRepeticoes, getRepeticoes } from "../services/repeticoesServices";


export const useDeleteRepeticoes = () => {
    const { loading, setLoading, setRepeticoes } = useRepeticoes();
    const { listaParaDeletar, setListaParaAtualizar, setListaParaDeletar } = useListaSelecionados();
    const { setCarregaQuantidades } = useQuantidades();

    const deleteRepeticoesData = async () => {
        try {
            setLoading(true);
            const repeticao_deletada = await deleteRepeticoes(listaParaDeletar);

            if (!repeticao_deletada) {
                throw new Error("Erro ao deletar Repeticoes")
            }

            const repticoes_atualizada = await getRepeticoes();
            setRepeticoes(repticoes_atualizada);

            setListaParaAtualizar([]);
            setListaParaDeletar([]);
            setCarregaQuantidades(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao deletar Repeticoes:', error);
        }
    }

    return { deleteRepeticoesData, loading }
}