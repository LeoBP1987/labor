import { useQuantidades } from "../context/QuantidadesContext";
import { useRepeticoes } from "../context/RepeticoesContext";
import { postRepeticoes } from "../services/repeticoesServices";


export const usePostRepeticoes = () => {
    const { loading, setLoading, setCarregaRepeticao } = useRepeticoes();
    const { setCarregaQuantidades } = useQuantidades();

    const postRepeticoesData = async (descricao: string, repeticoes: String[]) => {
        try {
            setLoading(true);
            const nova_repeticao = await postRepeticoes(descricao, repeticoes);

            if (!nova_repeticao) {
                throw new Error("Erro ao criar Repetição")
            }

            setCarregaQuantidades(true);
            setCarregaRepeticao(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao criar Tarefas:', error);
        }
    }

    return { postRepeticoesData, loading }
}