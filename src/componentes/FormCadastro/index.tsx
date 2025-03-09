import styled from "styled-components"
import BotaoForm from "../BotaoForm"
import { usePostUsuario } from "../../hooks/usePostUsuario"
import { useState } from "react"
import CampoTexto from "../CampoTexto"
import Titulo from "../Titulo"

const DivContainer = styled.div`
    max-height: 80%;
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: start;
    background: #F9F9F9;
    padding: 2rem 4rem 3rem 4rem;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    @media screen and (max-width: 800px) {
        width: 65%;
    }
`

const FormEstilizado = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
`
const DivContainerBotoes = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
`

const DivContainerSenha = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    @media screen and (max-width: 800px) {
        gap: 5px;
    }
`


const FormCadastro = () => {

    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [email, setEmail] = useState("");
    const { cadastrarUsuario } = usePostUsuario();

    const aoSalvar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        cadastrarUsuario(nome, login, email, senha, confirmar)
    }

    const aoReset = () => {
        setNome("");
        setEmail("");
        setLogin("");
        setSenha("");
        setConfirmar("");
    }

    return (
        <DivContainer>
            <Titulo>Cadastro de Novos Usuários</Titulo>
            <FormEstilizado onSubmit={(e) => aoSalvar(e)}>
                <CampoTexto value={nome} onChange={(e) => setNome(e.target.value)} >Nome Completo</CampoTexto>
                <CampoTexto value={login} onChange={(e) => setLogin(e.target.value)} >Login</CampoTexto>
                <CampoTexto value={email} onChange={(e) => setEmail(e.target.value)} type={'email'} >Email</CampoTexto>
                <DivContainerSenha>
                    <CampoTexto value={senha} onChange={(e) => setSenha(e.target.value)} type={'password'} >Senha</CampoTexto>
                    <CampoTexto value={confirmar} onChange={(e) => setConfirmar(e.target.value)} type={'password'} >Confirmar</CampoTexto>
                </DivContainerSenha>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type='submit'>CADASTRAR</BotaoForm>
                    <BotaoForm cor={2} type='reset' onClick={() => aoReset()} >CANCELAR</BotaoForm>
                </DivContainerBotoes>
            </FormEstilizado>
        </DivContainer>
    )
}

export default FormCadastro