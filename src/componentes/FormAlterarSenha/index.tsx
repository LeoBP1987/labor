import styled from "styled-components"
import BotaoForm from "../BotaoForm"
import { useState } from "react"
import CampoTexto from "../CampoTexto"
import Titulo from "../Titulo"
import { usePatchUsuario } from "../../hooks/usePatchUsuario"
import { useChamaModal } from "../../hooks/useChamaModal"
import BarraCarregamento from "../BarraCarregamento"

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
    @media screen and (max-width: 800px) {
        padding: 1rem;
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
    @media screen and (max-width: 800px) {
        margin-top: 40px;
        gap: 40px;
    }
`


const FormAlterarSenha = () => {

    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const { loading, error, patchUsuarioSenhaData} = usePatchUsuario();
    const { aoFecharModal } = useChamaModal();

    if(loading) {
        return <BarraCarregamento />
    }
    
    const aoReset = () => {
        setSenha("");
        setConfirmar("");
    }

    const aoSalvarAlteracao = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const alterarSenha = await patchUsuarioSenhaData(senha, confirmar);

        if(alterarSenha) {
            aoReset();
            aoFecharModal();
        }
    }

    return (
        <DivContainer>
            <Titulo>Alterar Senha</Titulo>
            <FormEstilizado>
                <CampoTexto value={senha} onChange={(e) => setSenha(e.target.value)} type={'password'} >Nova Senha</CampoTexto>
                <CampoTexto value={confirmar} onChange={(e) => setConfirmar(e.target.value)} type={'password'} >Confirmar Nova Senha</CampoTexto>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type='submit' onClick={(e) => aoSalvarAlteracao(e)}>SALVAR</BotaoForm>
                    <BotaoForm cor={2} type='reset' onClick={() => aoReset()} >CANCELAR</BotaoForm>
                </DivContainerBotoes>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </FormEstilizado>
        </DivContainer>
    )
}

export default FormAlterarSenha