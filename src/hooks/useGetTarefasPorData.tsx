import { useEffect } from "react";
import { getTarefasPorData } from "../services/tarefaServices";
import { useTarefasPorData } from "../context/TarefasPorDataContext";

export const useGetTarefasPorData = () => {
    const { tarefasPorData, setTarefasPorData, loading, setLoading, consultando, setConsultando, dataPesquisa, setDataPesquisa } = useTarefasPorData();

    useEffect(() => {
        const getTarefasPorDataData = async () => {
            try {

                if (!dataPesquisa) {
                    throw new Error("É necessário informar um data válida para a realização dessa pesquisa;");
                }

                setLoading(true);
                const tarefasData = await getTarefasPorData(dataPesquisa);

                setTarefasPorData(tarefasData);
            } catch (error) {
                console.error('Erro ao buscar Tarefas por data:', error);
            } finally {
                setLoading(false);
                setConsultando(false);
            }
        };

        if (consultando) {
            getTarefasPorDataData();
        }

    }, [consultando]);

    return { tarefasPorData, dataPesquisa, loading, setConsultando, setDataPesquisa, setTarefasPorData };
};