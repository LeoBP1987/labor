import styled from "styled-components"
import { useGetSemanaAtual } from "../../hooks/useGetSemanaAtual"
import { useGetTarefasPorData } from "../../hooks/useGetTarefasPorData"
import { useGetClique } from "../../context/GetClique"
import { useEffect } from "react"


const ListaSemanaEstilizada = styled.ul`
    padding-right: 40px;
    background: rgba(100, 79, 232, 0.25);
    width: 460px;
    height: 80px;
    border: 1px solid var(--cor-primaria);
    border-radius: 8px;
    box-shadow: 2px 2px 2px var(--cor-primaria);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 800px) {
        margin: 2rem 1rem 0 0;
        width: 300px;
        height: 60px;
        padding: 10px 20px;
    }
`

const ItemSemanaEstilizado = styled.li<{$ativo:boolean}>`
    width: 43px;
    height: 61px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-items: center;
    align-items: center;
    border-radius: 16px;
    padding-top: 5px;
    font-size: 14px;
    color: var(--cor-fonte-primaria);
    cursor: pointer;
    &:hover{
        background-color: rgba(147, 182, 240, 1);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        padding: 6px 1px 1px 1px;
        color: #FFF;
    }
    ${(props) =>
        props.$ativo &&
        `
        background-color: rgba(100, 79, 232, 1);
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        padding: 6px 1px 1px 1px;
        color: #FFF;
    `}
    @media screen and (max-width: 800px) {
        width: 33px;
        height: 45px;
        gap: 7.5px;
        font-size: 12px;
        padding: 4px 1px;
    }
`

const NomeDia = styled.p`
    padding: 0;
    margin: 0;
`
const NumeroDia = styled.p<{$ativo:boolean}>`
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

const ListaSemanaAtual = () => {

    const { semanaAtual, carregando, setCarregarSemana } = useGetSemanaAtual();
    const { setDataPesquisa, setConsultando } = useGetTarefasPorData();
    const { diaClicado, setDiaClicado } = useGetClique();

    useEffect(() => {
        if (!semanaAtual) {
            setCarregarSemana(true);
        }
    }, []);

    if(carregando) {
        return <div>Carregando...</div>
    }

    if(!semanaAtual) {
        return <div>Erro ao gerar semana</div>
    }

    const aoSelecionarDia = async (
        dia: string,
        nome_dia: "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo"
    ) => {
        setDiaClicado(nome_dia);
        if(dia) {
            setDataPesquisa(dia);
            setConsultando(true); 
        }
    };

    return (
        <ListaSemanaEstilizada>
            <ItemSemanaEstilizado $ativo={diaClicado === 'segunda'} onClick={() => aoSelecionarDia(semanaAtual?.segunda!, 'segunda')}>
                <NomeDia>Seg</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.segunda?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'terca'} onClick={() => aoSelecionarDia(semanaAtual?.terca!, 'terca')}>
                <NomeDia>Ter</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.terca?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'quarta'} onClick={() => aoSelecionarDia(semanaAtual?.quarta!, 'quarta')}>
                <NomeDia>Qua</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.quarta?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'quinta'} onClick={() => aoSelecionarDia(semanaAtual?.quinta!, 'quinta')}>
                <NomeDia>Qui</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.quinta?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'sexta'} onClick={() => aoSelecionarDia(semanaAtual?.sexta!, 'sexta')}>
                <NomeDia>Sex</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.sexta?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'sabado'} onClick={() => aoSelecionarDia(semanaAtual?.sabado!, 'sabado')}>
                <NomeDia>Sab</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.sabado?.split("-")[2]}</NumeroDia>
                </ItemSemanaEstilizado>
            <ItemSemanaEstilizado $ativo={diaClicado === 'domingo'} onClick={() => aoSelecionarDia(semanaAtual?.domingo!, 'domingo')}>
                <NomeDia>Dom</NomeDia>
                <NumeroDia $ativo={true}>{semanaAtual?.domingo?.split("-")[2]}</NumeroDia>
            </ItemSemanaEstilizado>
        </ListaSemanaEstilizada>
    )
}

export default ListaSemanaAtual