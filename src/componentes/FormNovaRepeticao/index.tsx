import styled from "styled-components"
import CampoTexto from "../CampoTexto"
import BotaoForm from "../BotaoForm"
import Titulo from "../Titulo"
import CampoCheckBox from "../CampoCheckBox"
import { useRepeticoes } from "../../context/RepeticoesContext"
import { usePostRepeticoes } from "../../hooks/usePostRepeticoes"
import { useState } from "react"
import { useChamaModal } from "../../hooks/useChamaModal"
import BarraCarregamento from "../BarraCarregamento"

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
    box-shadow: 4px 4px 4px rgba(100, 79, 232, 0.9);
    @media screen and (max-width: 800px) {
        width: 60%;
    }
`

const FormEstilizado = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    @media screen and (max-width: 800px) {
        width: 110%;
        align-items: flex-start;
        gap: 30px;
    }
`
const DivContainerBotoes = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
`

const ContainerDiasSemana = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 20px;
    }
`

const ContainerCheckBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const FormaNovaRepeticao = () => {

    const { listaRepeticao, setListaRepeticao } = useRepeticoes();
    const { postRepeticoesData, loading } = usePostRepeticoes();
    const [descricao, setDescricao] = useState("");
    const { aoFecharModal } = useChamaModal();
    const listaTodosOsDias = ['1', '2', '3', '4', '5', '6', '7'];

    const aoSelecionarDiaRepeticao = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '8') {
            if (e.target.checked) {
                setListaRepeticao(listaTodosOsDias);
            } else {
                setListaRepeticao([]);
            }
        } else {
            if (e.target.checked) {
                setListaRepeticao([...listaRepeticao, e.target.value])
            } else {
                setListaRepeticao(listaRepeticao.filter(item => item !== e.target.value))
            }
        }
    };

    const aoSalvarRepeticao = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postRepeticoesData(descricao, listaRepeticao);
        setListaRepeticao([]);
        setDescricao("");
        aoFecharModal();
    };

    const aoReset = () =>{
        setListaRepeticao([]);
        setDescricao("");
    }

    if(loading) {
        return <BarraCarregamento />
    }

    return (
        <DivContainer>
            <Titulo>Nova Repetição</Titulo>
            <FormEstilizado onSubmit={(e) => aoSalvarRepeticao(e)}>
                <CampoTexto value={descricao} onChange={(e) => setDescricao(e.target.value)}>Descricação da Tarefa</CampoTexto>
                <ContainerDiasSemana>
                    <ContainerCheckBox>
                        <CampoCheckBox value={8} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Todos os dias</CampoCheckBox>
                        <CampoCheckBox value={1} checked={listaRepeticao.includes('1')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Segunda - Feira</CampoCheckBox>
                        <CampoCheckBox value={2} checked={listaRepeticao.includes('2')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Terça - Feira</CampoCheckBox>
                        <CampoCheckBox value={3} checked={listaRepeticao.includes('3')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Quarta - Feira</CampoCheckBox>
                    </ContainerCheckBox>
                    <ContainerCheckBox>
                        <CampoCheckBox value={4} checked={listaRepeticao.includes('4')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Quinta - Feira</CampoCheckBox>
                        <CampoCheckBox value={5} checked={listaRepeticao.includes('5')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Sexta - Feira</CampoCheckBox>
                        <CampoCheckBox value={6} checked={listaRepeticao.includes('6')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Sabádo</CampoCheckBox>
                        <CampoCheckBox value={7} checked={listaRepeticao.includes('7')} onChange={(e) => aoSelecionarDiaRepeticao(e)}>Domingo</CampoCheckBox>
                    </ContainerCheckBox>
                </ContainerDiasSemana>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type='submit'>SALVAR</BotaoForm>
                    <BotaoForm cor={2} type="reset" onClick={() => aoReset()}>CANCELAR</BotaoForm>
                </DivContainerBotoes>
            </FormEstilizado>
        </DivContainer>
    )
}

export default FormaNovaRepeticao