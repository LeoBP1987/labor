import styled from "styled-components"
import { useGetTarefasPilha } from "../../hooks/useGetTarefasPilha"
import { useGetSemanaSeguinte } from "../../hooks/useGetSemanaSeguinte"
import { useGetClique } from "../../context/GetClique"
import { usePatchAgendamentoTarefaUnica } from "../../hooks/usePatchAgendamentoTarefaUnica"
import { useGetTarefasPorData } from "../../hooks/useGetTarefasPorData"
import { useEffect, useState } from "react"
import BarraCarregamento from "../../componentes/BarraCarregamento"

const ContainerMontarSemana = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    @media screen and (max-width: 800px){
        margin-top: 40px;
    }
`

const ContainerCabecalho = styled.div`
    display: flex;
    align-items: end;
    gap: 135px;
    @media screen and (max-width: 800px) {
        align-items: center;
        gap: 0;
    }
`

const ContainerTarefas = styled.div`
    display: flex;
    gap: 120px;
    @media screen and (max-width: 800px) {
        margin-left: 35px;
        margin-bottom: 20px;
        flex-direction: column;
        gap: 20px;
        flex-direction: column-reverse;
    }
`

const H2Personalizado = styled.h2`
    margin: 0 0 0 70px;
    padding: 0;
    font-size: 32px;
    font-weight: 700;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        display: none;
    }
`
const ContainerSemana = styled.div`
    margin: 0 0 0 30px;
    padding: 0 10px;
    width: 348px;
    height: 81px;
    background: var(--gradiente-quaternario);
    border: 1px solid var(--cor-fonte-primaria);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
`

const ItemSemana = styled.div<{ $ativo: boolean }>`
    width: 65px;
    max-width: 65px;
    height: 55px;
    max-width: 60px;
    padding: 5px;
    font-size: 12px;
    color: var(--cor-fonte-primaria);
    border: none;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    &:hover{
        background-color: rgba(147, 182, 240, 1);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        padding: 8px;
        color: #FFF;
    }
    ${(props) =>
        props.$ativo &&
        `
        background-color: rgba(100, 79, 232, 1);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        padding: 8px;
        color: #FFF;
    `}
`
const ParagrafoNomeDiaEstilizado = styled.p`
    margin: 0;
    padding: 0;
`
const ParagrafioNumeroDiaEstilizado = styled.p<{ $ativo: boolean }>`
    padding: 6px;
    margin: 0;
    box-shadow: 1px 1px 1px rgba(100, 79, 232, 0.25);
    border-radius: 100%;
    box-shadow: 1px 1px 1px var(--cor-primaria);
    &:hover{
        border: 1px solid rgba(140, 90, 255, 0.25);
    }
    ${(props) =>
        props.$ativo &&
        `
        border: 1px solid rgba(140, 90, 255, 1);
    `}
`

const ListaTarefas = styled.div`
    padding: 20px 0;
    width: 324px;
    height: 370px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 2px solid var(--cor-primaria);
    border-radius: 16px;
    box-shadow: 2px 2px 2px var(--cor-primaria);
    @media screen and (max-width: 800px){
        height: 250px;
        padding: 7.5px 0;
    }
`

const H4Personalizado = styled.h4`
    padding: 0;
    margin: 20px 0 15px 0;
    font-size: 24px;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px){
        margin: 10px 0 0 0;
    }
`

const DivTarefas = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const ItemTarefas = styled.div`
    padding: 0;
    margin: 0;
    width: 210px;
    max-width: 210px;
    min-width: 210px;
    height: 38px;
    max-height: 38px;
    min-height: 38px;
    border: 1px solid var(--cor-fonte-primaria);
    background-color: rgba(100, 79, 232, 0.25);
    border-radius: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: var(--cor-fonte-primaria);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
`
const ParagrafoItemTarefa = styled.p`
    padding: 0;
    margin: 10px 0 0 10px ;
    border: 0;
`

const MontarSemana = () => {

    const { tarefasPilha, loading } = useGetTarefasPilha();
    const { semanaSeguinte, carregando, setCarregarSemanaSeguinte } = useGetSemanaSeguinte();
    const { diaClicadoSemanaSeguinte, setDiaClicadoSemanaSeguinte } = useGetClique();
    const { dataPesquisa, setDataPesquisa, tarefasPorData, loading: loadingPorData, setConsultando } = useGetTarefasPorData();
    const { patchAgendamentoTarefaUnicaData, loading: loadingReagendaTarefa } = usePatchAgendamentoTarefaUnica();
    const [itemArrastadoMobile, setItemArrastadoMobile] = useState<string | null>(null);
    const [arrastandoMobile, setArrastandoMobile] = useState<boolean | null>(false);

    useEffect(() => {
        if (!semanaSeguinte) {
            setCarregarSemanaSeguinte(true);
        }
    }, []);

    useEffect(() => {
        if (semanaSeguinte && !dataPesquisa) {
            setDataPesquisa(semanaSeguinte?.segunda!);
            setConsultando(true);
        }
    }, [semanaSeguinte]);

    if (loading || carregando || loadingPorData || loadingReagendaTarefa) {
        return <BarraCarregamento />
    }

    const nomeDiasMap = {
        'segunda': 'Segunda',
        'terca': 'Terça',
        'quarta': 'Quarta',
        'quinta': 'Quinta',
        'sexta': 'Sexta',
        'sabado': 'Sabado',
        'domingo': 'Domingo'
    }

    const aoSelecionarDia = (nome_dia: 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo', dia: string) => {
        setDiaClicadoSemanaSeguinte(nome_dia);
        setDataPesquisa(dia);
        setConsultando(true);
    }

    const aoComecarArrastarMobile = (e: React.TouchEvent<HTMLDivElement>, tarefa_id: string) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        setArrastandoMobile(true);
        setItemArrastadoMobile(tarefa_id);
        if (!dataPesquisa) {
            const data = semanaSeguinte![diaClicadoSemanaSeguinte];
            setDataPesquisa(data!);
        }
    };

    const aoArrastarParaListaSemanaMobile = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        
    }

    const aoSoltarArrastoMobile = async (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.cancelable) {
            e.preventDefault();
        }

        if (itemArrastadoMobile) {
            await transferirTarefaParaData(itemArrastadoMobile);
            setItemArrastadoMobile(null);
        }
        setArrastandoMobile(false);
    };

    const aoComecarArrastar = (e: React.DragEvent<HTMLDivElement>, tarefa_id: string) => {
        e.dataTransfer.setData('tarefaId', tarefa_id);
        if (!dataPesquisa) {
            const data = semanaSeguinte![diaClicadoSemanaSeguinte]
            setDataPesquisa(data!)
        }
    };

    const aoArrastarParaListaDaSemana = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const aoSoltarArrasto = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const tarefaId = e.dataTransfer.getData('tarefaId');

        await transferirTarefaParaData(tarefaId);
    };

    const transferirTarefaParaData = async (tarefaId: string) => {
        await patchAgendamentoTarefaUnicaData(tarefaId)
    };

    return (
        <ContainerMontarSemana>
            <ContainerCabecalho>
                <H2Personalizado>Montar Semana</H2Personalizado>
                <ContainerSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'segunda'} onClick={() => aoSelecionarDia('segunda', semanaSeguinte?.segunda!)}>
                        <ParagrafoNomeDiaEstilizado>Seg</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'segunda'}>{semanaSeguinte?.segunda?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'terca'} onClick={() => aoSelecionarDia('terca', semanaSeguinte?.terca!)}>
                        <ParagrafoNomeDiaEstilizado>Ter</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'terca'}>{semanaSeguinte?.terca?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'quarta'} onClick={() => aoSelecionarDia('quarta', semanaSeguinte?.quarta!)}>
                        <ParagrafoNomeDiaEstilizado>Qua</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'quarta'}>{semanaSeguinte?.quarta?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'quinta'} onClick={() => aoSelecionarDia('quinta', semanaSeguinte?.quinta!)}>
                        <ParagrafoNomeDiaEstilizado>Qui</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'quinta'}>{semanaSeguinte?.quinta?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'sexta'} onClick={() => aoSelecionarDia('sexta', semanaSeguinte?.sexta!)}>
                        <ParagrafoNomeDiaEstilizado>Sex</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'sexta'}>{semanaSeguinte?.sexta?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'sabado'} onClick={() => aoSelecionarDia('sabado', semanaSeguinte?.sabado!)}>
                        <ParagrafoNomeDiaEstilizado>Sab</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'sabado'}>{semanaSeguinte?.sabado?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                    <ItemSemana $ativo={diaClicadoSemanaSeguinte === 'domingo'} onClick={() => aoSelecionarDia('domingo', semanaSeguinte?.domingo!)}>
                        <ParagrafoNomeDiaEstilizado>Dom</ParagrafoNomeDiaEstilizado>
                        <ParagrafioNumeroDiaEstilizado $ativo={diaClicadoSemanaSeguinte === 'domingo'}>{semanaSeguinte?.domingo?.split("-")[2]}</ParagrafioNumeroDiaEstilizado>
                    </ItemSemana>
                </ContainerSemana>
            </ContainerCabecalho>
            <ContainerTarefas>
                <ListaTarefas>
                    <H4Personalizado>Pilha</H4Personalizado>
                    <DivTarefas>
                        {tarefasPilha.map((tarefa) => (
                            <ItemTarefas
                                key={tarefa.id}
                                draggable={!arrastandoMobile}
                                onDragStart={(e) => aoComecarArrastar(e, tarefa.id)}
                                onTouchStart={(e) => aoComecarArrastarMobile(e, tarefa.id)}
                                onTouchMove={aoArrastarParaListaSemanaMobile}
                                onTouchEnd={aoSoltarArrastoMobile}
                                style={{ cursor: arrastandoMobile ? "grabbing" : "grab" }}
                            >
                                <ParagrafoItemTarefa>{tarefa.descricao}</ParagrafoItemTarefa>
                            </ItemTarefas>
                        ))}
                    </DivTarefas>
                </ListaTarefas>
                <ListaTarefas
                    onDragOver={aoArrastarParaListaDaSemana}
                    onDrop={aoSoltarArrasto}
                >
                    <H4Personalizado>Tarefas de {nomeDiasMap[diaClicadoSemanaSeguinte] || ''}</H4Personalizado>
                    <DivTarefas>
                        {tarefasPorData.map((tarefa) => (
                            <ItemTarefas key={tarefa.id}>
                                <ParagrafoItemTarefa>{tarefa.descricao}</ParagrafoItemTarefa>
                            </ItemTarefas>
                        ))}
                    </DivTarefas>
                </ListaTarefas>
            </ContainerTarefas>
        </ContainerMontarSemana>
    )
}

export default MontarSemana