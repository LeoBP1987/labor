import { useEffect } from "react";
import { useQuantidades } from "../context/QuantidadesContext";
import { getQuantidades } from "../services/quantidadesServices";

export const useGetQuantidades = () => {
    const { setQuantidades, quantidades, loading, setLoading, carregaQuantidades, setCarregaQuantidades } = useQuantidades();

    useEffect(() => {
        const getQuantidadesData = async () => {
            try {
                setLoading(true);
                const quantidadesData = await getQuantidades();

                setQuantidades(quantidadesData);

            } catch (error) {
                console.error('Erro ao buscar Quantidades:', error);

            } finally {
                setCarregaQuantidades(false);
                setLoading(false);
            }
        };

        getQuantidadesData();

    }, [ carregaQuantidades ]);

    return { loading, quantidades };
};