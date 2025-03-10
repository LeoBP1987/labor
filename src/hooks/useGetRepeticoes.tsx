import { useEffect } from "react";
import { useRepeticoes } from "../context/RepeticoesContext";
import { getRepeticoes } from "../services/repeticoesServices";

export const useGetRepeticoes = () => {
    const { repeticoes, setRepeticoes, loading, setLoading } = useRepeticoes();

    useEffect(() => {
        const getRepeticoesData = async () => {
            try {
                setLoading(true);
                const repeticoesData = await getRepeticoes();

                setRepeticoes(repeticoesData);
            } catch (error) {
                console.error('Erro ao buscar Repetições:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!repeticoes || repeticoes?.length === 0) {
            getRepeticoesData();
        }
    }, []);

    return { repeticoes, loading  };
};