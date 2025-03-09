import { useEffect, useState } from "react";
import { Dict } from "styled-components/dist/types";
import { Agenda } from "../compartilhado/interfaces/IAgenda";

export const usePaginacaoAgenda = (tarefas: Agenda[]) => {
    const [paginaAgendaDia, setPaginaAgendaDia] = useState<Agenda>({});
    const [paginaAgendaTarefas, setPaginaAgendaTarefas] = useState<Dict[]>([]);
    const [tarefasPaginaAtual, setTarefasPaginaAtual] = useState<Dict[]>([]);

    const [dia, setDia] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [indiceDia, setIndiceDia] = useState(0);

    const [quantidadeTarefas, setQuantidadeTarefas] = useState(0);
    const [quantidadeDias, setQuantidadeDias] = useState(0);

    const [contaPagina, setContaPagina] = useState(1);

    const [proximoDia, setProximoDia] = useState(false);
    const [voltaDia, setVoltaDia] = useState(false);

    const [quantidadePaginasPorDia, setQuantidadePaginasPorDia] = useState(0);
    const [quantidadePaginas, setQuantidadePaginas] = useState(0);
    const tarefasPorPagina = 5;

    if(tarefas) {
        
    }

    useEffect(() => {
        if(voltaDia){
            const quantidade = Object.values(tarefas[indiceDia])[0].length;
            const pagina = Math.ceil(quantidade / tarefasPorPagina);
            setPaginaAtual(pagina);
            setVoltaDia(false)
        }

        if(proximoDia){
            setPaginaAtual(1);
            setProximoDia(false)
        }
    }, [voltaDia, proximoDia]);

    useEffect(() => {
        let totalDias = tarefas.length;
        let totalTarefas = 0;
        let totalPaginas = 0;
        tarefas.forEach(tarefa => {
            const quantidade = Object.values(tarefa)[0].length;
            totalTarefas += quantidade;
            totalPaginas += Math.ceil(quantidade / tarefasPorPagina);
        });
        setQuantidadeDias(totalDias);
        setQuantidadeTarefas(totalTarefas);
        setQuantidadePaginas(totalPaginas);
    }, [tarefas]);

    useEffect(() => {
        if (tarefas[indiceDia]) {
            setPaginaAgendaDia(tarefas[indiceDia]);
        }
    }, [tarefas, indiceDia]);

    useEffect(() => {
        if (paginaAgendaDia && Object.keys(paginaAgendaDia).length > 0) {
            const valoresTarefas = Object.values(paginaAgendaDia).flat();
            setPaginaAgendaTarefas(valoresTarefas);
            setDia(Object.keys(paginaAgendaDia)[0]);
        }
    }, [paginaAgendaDia]);

    useEffect(() => {
        const carregaPagina = () => {
            const indiceInicial = (paginaAtual - 1) * tarefasPorPagina;
            const indiceFinal = indiceInicial + tarefasPorPagina;
            const tarefasPagina = paginaAgendaTarefas.slice(indiceInicial, indiceFinal);

            setTarefasPaginaAtual(tarefasPagina);
        };

        carregaPagina();
    }, [paginaAtual, paginaAgendaTarefas]);

    useEffect(() => {
        const carregaTotalPaginasPorDia = () => {
            const paginaPorDia = Math.ceil(paginaAgendaTarefas.length / tarefasPorPagina);

            setQuantidadePaginasPorDia(paginaPorDia);
        }

        carregaTotalPaginasPorDia();
    }, [paginaAgendaTarefas, indiceDia])

    const irParaProximaPagina = () => {
        setContaPagina((posicao) =>  Math.min(posicao + 1, quantidadePaginas));
        if(paginaAtual === quantidadePaginasPorDia){
            if(indiceDia < quantidadeDias){
                setIndiceDia((dia) => Math.min(dia + 1, (quantidadeDias - 1)));
                setProximoDia(true);
            } 
        } else {
            setPaginaAtual((pagina) => Math.min(pagina + 1, quantidadePaginasPorDia));
        }
    };

    const irParaPaginaAnterior = () => {
        setContaPagina((posicao) =>  Math.max(posicao - 1, 1));
        if(paginaAtual === 1) {
            if(indiceDia > 0) {
                setIndiceDia((dia) => Math.max(dia - 1, 0));
                setVoltaDia(true);
            }
        } else {
            setPaginaAtual((pagina) => Math.max(pagina - 1, 1));
        }
    };

    const paginacao = new Array(quantidadePaginas).fill(0);

    return {
        dia,
        tarefasPaginaAtual,
        irParaProximaPagina,
        irParaPaginaAnterior,
        paginacao,
        paginaAtual,
        quantidadeTarefas,
        contaPagina
    };
}