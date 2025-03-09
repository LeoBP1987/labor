import styled from "styled-components"
import CampoTexto from "../CampoTexto"
import Titulo from "../Titulo"
import Botao from "../Botao"
import { usePostTarefas } from "../../hooks/usePostTarefas"
import { useState } from "react"
import { useChamaModal } from "../../hooks/useChamaModal"
import { useGetDataAtual } from "../../hooks/useGetDataAtual"
import BotaoAgenda from "../BotaoData"

const DivContainer = styled.div`
    max-height: 80%;
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 80px;
    align-items: start;
    background: #F9F9F9;
    padding: 2rem 4rem 3rem 4rem;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
    @media screen and (max-width: 800px) {
        width: 60%;
        gap: 40px;
    }
`
const DivNovaTarefaEstilizado = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
`
const DivCabecalhoNovaTarefa = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
`
const BotoesDiv = styled.div`
    display: flex;
    gap: 20px;
    align-self: flex-start;
`

const FormNovaTarefa = () => {

    const { postTarefasData, loading } = usePostTarefas();
    const [descricao, setDescricao] = useState("");
    const { aoFecharModal } = useChamaModal();
    const { dataFormatada } = useGetDataAtual();

    if(loading) {
        return <div>Carregando...</div>
    }

    const aoClicarPilha = async () => {
        await postTarefasData(descricao, "pilha", "9999-12-31");
        setDescricao("");
        aoFecharModal();
    }

    const aoClicarHoje = async () => {
        await postTarefasData(descricao, "hoje", dataFormatada);
        setDescricao("");
        aoFecharModal();
    }

    const aoClicarAgenda = async (data: string) => {
        await postTarefasData(descricao, "agenda", data);
        aoFecharModal();
    }

    return (
        <DivContainer>
            <DivCabecalhoNovaTarefa>
                <Titulo>Nova Tarefa</Titulo>
                <BotoesDiv>
                    <Botao tipo={'Pilha'} onClick={() => aoClicarPilha()} />
                    <BotaoAgenda onChange={(e) => aoClicarAgenda(e.target.value)} />
                    <Botao tipo={'Imediata'} onClick={() => aoClicarHoje()} />
                </BotoesDiv>
            </DivCabecalhoNovaTarefa>
            <DivNovaTarefaEstilizado>
                <CampoTexto value={descricao} onChange={(e) => setDescricao(e.target.value)} >Descrição da Tarefa:</CampoTexto>
            </DivNovaTarefaEstilizado>
        </DivContainer>
    )
}

export default FormNovaTarefa