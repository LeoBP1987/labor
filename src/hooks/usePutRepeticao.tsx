import { Dict } from "styled-components/dist/types";
import { useRepeticoes } from "../context/RepeticoesContext";
import { getRepeticoes, putRepeticoes } from "../services/repeticoesServices";


export const usePutRepeticoes = () => {
    const { setRepeticoes, setLoading, loading } = useRepeticoes();
    
    const putRepeticoesData = async (repeticao: Dict) => {
        try {
            setLoading(true);
            const repeticao_atualizada = await putRepeticoes(repeticao);

            if (!repeticao_atualizada) {
                throw new Error("Erro ao atualizar Repetição")
            }

            const repticoes_atualizada = await getRepeticoes();
            setRepeticoes(repticoes_atualizada);

            setLoading(false);
        } catch (error) {
            console.error('Erro ao atualizar Repetições:', error);
        }
    }

    return { putRepeticoesData, loading }
}