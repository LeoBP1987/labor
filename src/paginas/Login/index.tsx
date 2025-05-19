import styled from "styled-components"
import EstilosGlobais from "../../componentes/EstilosGlobais"
import Rodape from "../../componentes/Rodape"
import Logo from "./image.png"
import BotaoForm from "../../componentes/BotaoForm"
import useLogin from "../../hooks/useLogin"
import { useState } from "react"
import { useChamaModal } from "../../hooks/useChamaModal"
import ModalContainer from "../../componentes/ModalContainer"
import CampoTextoLogin from "../../componentes/CampoTextoLogin"
import BarraCarregamento from "../../componentes/BarraCarregamento"

const ContainerLogin = styled.div`
  margin-top: 100px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 120px;
  @media screen and (max-width: 800px) {
    margin: 0;
    padding: 0;
    height: 100vh;
    justify-content: space-between;
  }
`

const CabecalhoDiv = styled.div`
    display: none;
    @media screen and (max-width: 800px) {
        display: block;
        padding: 0;
        width: 100%;
        height: 2rem;
        background: var(--gradiente-primario);
    }
`

const LogoImgEstilizado = styled.img`
    width: 400px;
    height: 133px;
    @media screen and (max-width: 800px) {
        width: 300px;
        height: 100px;
    }
`

const FormLogin = styled.form`
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    gap: 60px;
    @media screen and (max-width: 800px) {
        align-items: center;
        margin-right: 100px;
    }
`

const DivContainerBotoes = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    @media screen and (max-width: 800px) {
        gap: 25px;
        margin-left: 100px;
    }
`
const DivContainerSenha = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    @media screen and (max-width: 800px) {
        justify-items: right;
    }
`

const LinkEstilizado = styled.div`
    margin: 0;
    padding: 0;
    cursor: pointer;`

const ParagrafoEstilizado = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px){
        font-size: 14px;
    }
`

const Login = () => {

    const { login, loading, error } = useLogin();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const { aoChamarModal } = useChamaModal();

    if (loading) {
        return (
            <>
                <EstilosGlobais />
                <BarraCarregamento />
            </>
        ) 
    }

    const aoLogar = async (evento: React.FormEvent) => {
        evento.preventDefault();
        await login(usuario, senha);
    }

    return (
        <ContainerLogin>
            <EstilosGlobais />
            <ModalContainer />
            <CabecalhoDiv />
            <LogoImgEstilizado src={Logo} alt="Imagem do Logo do Labor" />
            <FormLogin onSubmit={(e) => aoLogar(e)}>
                <CampoTextoLogin value={usuario} onChange={(e) => setUsuario(e.target.value)} >Login</CampoTextoLogin>
                <DivContainerSenha>
                    <CampoTextoLogin type={'password'} value={senha} onChange={(e) => setSenha(e.target.value)} >Senha</CampoTextoLogin>
                    <LinkEstilizado onClick={() => aoChamarModal('recuperarSenha')}>
                        <ParagrafoEstilizado>esqueci a senha</ParagrafoEstilizado>
                    </LinkEstilizado>
                </DivContainerSenha>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type="submit" >ENTRAR</BotaoForm>
                    <BotaoForm cor={2} onClick={() => aoChamarModal('cadastro')}>CADASTRAR</BotaoForm>
                </DivContainerBotoes>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </FormLogin>
            <Rodape />
        </ContainerLogin>
    )
}

export default Login