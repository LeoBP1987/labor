import { useListaSelecionados } from "../context/ListaSelecionadosContext";
import { useQuantidades } from "../context/QuantidadesContext";
import { useRepeticoes } from "../context/RepeticoesContext";
import { deleteRepeticoes } from "../services/repeticoesServices";


export const useDeleteRepeticoes = () => {
    const { setCarregaRepeticao, loading, setLoading } = useRepeticoes();
    const { listaParaDeletar, setListaParaAtualizar, setListaParaDeletar } = useListaSelecionados();
    const { setCarregaQuantidades } = useQuantidades();

    const deleteRepeticoesData = async () => {
        try {
            setLoading(true);
            const repeticao_deletada = await deleteRepeticoes(listaParaDeletar);

            if (!repeticao_deletada) {
                throw new Error("Erro ao deletar Repeticoes")
            }

            setListaParaAtualizar([]);
            setListaParaDeletar([]);
            setCarregaQuantidades(true);
            setCarregaRepeticao(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao deletar Repeticoes:', error);
        }
    }

    return { deleteRepeticoesData, loading }
}