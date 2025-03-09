import { useContext, useMemo } from "react";
import { ModalContext } from "../context/ModalContext";
import FormCadastro from "../componentes/FormCadastro";
import FormNovaTarefa from "../componentes/FormNovaTarefa";
import Comentarios from "../componentes/Comentarios";
import FormAlterarSenha from "../componentes/FormAlterarSenha";
import FormaNovaRepeticao from "../componentes/FormNovaRepeticao";

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
            default:
                return <></>
        }

    }, [modalContext])

    return ConteudoModal
}