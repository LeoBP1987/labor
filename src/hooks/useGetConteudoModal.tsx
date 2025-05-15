import { useContext, useMemo } from "react";
import { ModalContext } from "../context/ModalContext";
import FormCadastro from "../componentes/FormCadastro";
import FormNovaTarefa from "../componentes/FormNovaTarefa";
import Comentarios from "../componentes/Comentarios";
import FormAlterarSenha from "../componentes/FormAlterarSenha";
import FormaNovaRepeticao from "../componentes/FormNovaRepeticao";
import FormRecuperarSenha from "../componentes/FormRecuperarSenha";

export const useGetConteudoModal = () => {

    const modalContext = useContext(ModalContext);

    const ConteudoModal = useMemo(() => {
        switch (modalContext?.conteudo) {
            case 'cadastro':
                return (
                    <FormCadastro />
                )
            case 'comentario':
                return (
                    <Comentarios />
                )
            case 'novaTarefa':
                return (
                    <FormNovaTarefa />
                )
            case 'alterarSenha':
                return (
                    <FormAlterarSenha />
                )
            case 'novaRepeticao':
                return (
                    <FormaNovaRepeticao />
                )
            case 'recuperarSenha':
                return (
                    <FormRecuperarSenha />
                )
            default:
                return <></>
        }

    }, [modalContext])

    return ConteudoModal
}