import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"


export const useChamaModal = () => {
    const modalContext = useContext(ModalContext);

    const aoChamarModal = (conteudo: 'none' | 'cadastro' | 'comentario' | 'novaTarefa' | 'alterarSenha' | 'novaRepeticao') => {

        modalContext?.setConteudo(conteudo)

        modalContext?.setVisivel('flex')
    }

    const aoFecharModal = () => {

        modalContext?.setConteudo('none')

        modalContext?.setVisivel('none')
    }

    return {
        aoChamarModal,
        aoFecharModal
    }
}