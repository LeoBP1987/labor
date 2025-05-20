import styled from "styled-components";
import BotaoForm from "../BotaoForm";
import { useState } from "react";
import CampoTexto from "../CampoTexto";
import Titulo from "../Titulo";
import { recuperarSenha } from "../../services/usuarioServices";
import { useChamaModal } from "../../hooks/useChamaModal";
import BarraCarregamento from "../BarraCarregamento";

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
        width: 80%;
        padding: 1rem;
    }
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
    @media screen and (max-width: 800px) {
        margin-top: 40px;
        gap: 20px;
    }
`;

const FormRecuperarSenha = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { aoFecharModal } = useChamaModal();

    const aoReset = () => {
        setEmail("");
        setError(null);
    };

    const aoEnviar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await recuperarSenha(email);
            alert("E-mail de recuperação enviado com sucesso!");
            aoReset();
            aoFecharModal();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <BarraCarregamento />;
    }

    return (
        <DivContainer>
            <Titulo>Recuperar Senha</Titulo>
            <FormEstilizado>
                <CampoTexto
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                >
                    E-mail
                </CampoTexto>
                <DivContainerBotoes>
                    <BotaoForm cor={1} type="submit" onClick={aoEnviar}>
                        ENVIAR
                    </BotaoForm>
                    <BotaoForm cor={2} type="reset" onClick={aoReset}>
                        CANCELAR
                    </BotaoForm>
                </DivContainerBotoes>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </FormEstilizado>
        </DivContainer>
    );
};

export default FormRecuperarSenha;