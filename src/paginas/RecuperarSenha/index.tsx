import styled from "styled-components";
import { useState } from "react";
import CampoTexto from "../../componentes/CampoTexto";
import BotaoForm from "../../componentes/BotaoForm";
import Titulo from "../../componentes/Titulo";
import { alterarSenha } from "../../services/usuarioServices";
import EstilosGlobais from "../../componentes/EstilosGlobais";
import { useParams } from "react-router-dom";

const DivContainer = styled.div`
    max-height: 80%;
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: start;
    background: #F9F9F9;
    margin-top: 3rem;
    padding: 2rem 4rem 3rem 4rem;
    border-radius: 20px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
    justify-self: center;
`;

const FormEstilizado = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
`;

const DivContainerBotoes = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
`;

const MensagemSucesso = styled.p`
    color: green;
    font-weight: bold;
    text-align: center;
`;

const MensagemErro = styled.p`
    color: red;
    font-weight: bold;
    text-align: center;
`;

const RecuperarSenha = () => {
    const { email } = useParams<{ email: string }>();

    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const aoReset = () => {
        setSenha("");
        setConfirmar("");
        setMensagem("");
        setErro("");
    };

    const aoSalvarAlteracao = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setMensagem("");
        setErro("");

        if (senha !== confirmar) {
            setErro("As senhas não coincidem.");
            return;
        }

        setLoading(true);
        try {
            if (!email) {
                setErro("Email não encontrado na URL.");
                setLoading(false);
                return;
            }
            const response =  await alterarSenha(email, senha);
            alert(response.message);
            window.location.href = "/login";
            setSenha("");
            setConfirmar("");
        } catch (err: any) {
            setErro(err.message || "Erro ao alterar senha.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <DivContainer>
            <EstilosGlobais />
            <Titulo>Alterar Senha</Titulo>
            <FormEstilizado>
                <CampoTexto value={senha} onChange={(e) => setSenha(e.target.value)} type={'password'}>Nova Senha</CampoTexto>
                <CampoTexto value={confirmar} onChange={(e) => setConfirmar(e.target.value)} type={'password'}>Confirmar Nova Senha</CampoTexto>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type='submit' onClick={aoSalvarAlteracao}>SALVAR</BotaoForm>
                    <BotaoForm cor={2} type='reset' onClick={aoReset}>CANCELAR</BotaoForm>
                </DivContainerBotoes>
                {mensagem && <MensagemSucesso>{mensagem}</MensagemSucesso>}
                {erro && <MensagemErro>{erro}</MensagemErro>}
            </FormEstilizado>
        </DivContainer>
    );
};

export default RecuperarSenha;