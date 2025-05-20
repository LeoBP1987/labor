import styled from "styled-components"
import BotaoForm from "../BotaoForm"
import { useState } from "react"
import CampoTexto from "../CampoTexto"
import { Usuario } from "../../compartilhado/interfaces/IUsuario"
import { usePatchUsuario } from "../../hooks/usePatchUsuario"
import { useGetUsuario } from "../../hooks/useGetUsuario"
import { useChamaModal } from "../../hooks/useChamaModal"
import BarraCarregamento from "../BarraCarregamento"

const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: start;
    padding: 0 4rem 3rem 4rem;
    border-radius: 20px;
    @media screen and (max-width: 800px){
        padding: 0;
        height: 100%;
        width: 100%;
    }
`

const FormEstilizado = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 40px;
`

const DivContainerBotoes = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 80px;
    @media screen and (max-width: 800px){
        width: 102.5%;
    }
`

const FormConfiguracao = () => {

    const [readOnly, setReadOnly] = useState(true);
    const [ display, setDisplay ] = useState<"none" | "block">("none");
    const { patchUsuarioDadosData } = usePatchUsuario();
    const { usuario, loading, setUsuario } = useGetUsuario();
    const { aoChamarModal } = useChamaModal();

    if(loading) {
        return <BarraCarregamento />
    }

    const aoClicarEditar = () => {
        setDisplay('block');
        setReadOnly(false);
    }

    const aoEditarUsuario = (e: React.ChangeEvent<HTMLInputElement>, campo: keyof Usuario) => {
        if (usuario) {
            setUsuario({
                ...usuario,
                [campo]: e.target.value,
            });
        };
    };

    const aoSalvarEdicao = async ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        await patchUsuarioDadosData(Number(usuario?.id), usuario!.first_name, usuario!.username, usuario!.email);
        setReadOnly(true);
        setDisplay('none');
    }

    return (
        <DivContainer>
            <FormEstilizado>
                <CampoTexto readonly={readOnly} value={usuario?.first_name} onChange={(e) => aoEditarUsuario(e, 'first_name')} >Nome Completo</CampoTexto>
                <CampoTexto readonly={readOnly} value={usuario?.username} onChange={(e) => aoEditarUsuario(e, 'username')} >Login</CampoTexto>
                <CampoTexto readonly={readOnly} value={usuario?.email} onChange={(e) => aoEditarUsuario(e, 'email')} type={'email'} >Email</CampoTexto>
                <BotaoForm cor={2} type='submit' onClick={(e) => aoSalvarEdicao(e)} display={display}>SALVAR</BotaoForm>
            </FormEstilizado>
            <DivContainerBotoes>
                <BotaoForm cor={1} type='button' onClick={() => aoClicarEditar()}>EDITAR</BotaoForm>
                <BotaoForm cor={3} type="button" tamanho={200} onClick={() => aoChamarModal('alterarSenha')}>ALTERAR SENHA</BotaoForm>
            </DivContainerBotoes>
        </DivContainer>
    )
}

export default FormConfiguracao