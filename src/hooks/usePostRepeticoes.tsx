import { useQuantidades } from "../context/QuantidadesContext";
import { useRepeticoes } from "../context/RepeticoesContext";
import { getRepeticoes, postRepeticoes } from "../services/repeticoesServices";


export const usePostRepeticoes = () => {
    const { loading, setLoading, setRepeticoes } = useRepeticoes();
    const { setCarregaQuantidades } = useQuantidades();

    const postRepeticoesData = async (descricao: string, repeticoes: String[]) => {
        try {
            setLoading(true);
            const nova_repeticao = await postRepeticoes(descricao, repeticoes);

            if (!nova_repeticao) {
                throw new Error("Erro ao criar Repetição")
            }

            const repticoes_atualizada = await getRepeticoes();
            setRepeticoes(repticoes_atualizada);

            setCarregaQuantidades(true);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao criar Tarefas:', error);
        }
    }

    return { postRepeticoesData, loading }
}