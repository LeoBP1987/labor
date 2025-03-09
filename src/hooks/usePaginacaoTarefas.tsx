import { useEffect, useState } from "react";
import { Dict } from "styled-components/dist/types";
import { Tarefa } from "../compartilhado/interfaces/ITarefa";
import { Repeticoes } from "../compartilhado/interfaces/IRepeticoes";


export const usePaginacaoTarefa = (tarefas: Tarefa[] | Repeticoes[] | []) => {

    const [paginaTarefas, setPaginaTarefas] = useState<Dict[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const tarefasPorPagina = 5;
    const totalPaginas = Math.ceil(tarefas.length / tarefasPorPagina);

    useEffect(() => {
        const carregaPagina = () => {
            const indiceInicial = (paginaAtual - 1) * tarefasPorPagina;
            const indiceFinal = indiceInicial + tarefasPorPagina;
            const tarefasPaginaAtual = tarefas.slice(indiceInicial, indiceFinal);

            setPaginaTarefas(tarefasPaginaAtual);
        };

        carregaPagina();
    }, [tarefas, paginaAtual]);

    const irParaProximaPagina = () => {
        setPaginaAtual((pagina) => Math.min(pagina + 1, totalPaginas));

    };

    const irParaPaginaAnterior = () => {
        setPaginaAtual((pagina) => Math.max(pagina - 1, 1));
    };

    const paginacao = new Array(totalPaginas).fill(0);

    return {
        paginaTarefas,
        irParaProximaPagina,
        irParaPaginaAnterior,
        paginacao,
        paginaAtual
    }
}