import { useContext } from "react"
import styled from "styled-components"
import { ModalContext } from "../../context/ModalContext"
import { useGetConteudoModal } from "../../hooks/useGetConteudoModal"
import fechar from "../../../public/imagens/icones/fechar_preto.png"
import { useChamaModal } from "../../hooks/useChamaModal"

const ModalContainerDiv = styled.div<{ $display: string }>`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.$display};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        position: absolute;
        top: 50px;
        right: 50px;
        cursor: pointer;
        @media screen and (max-width: 800px) {
            top: 200px;
            right: 100px;
        }
    }
`
const ModalContainer = () => {

    const { aoFecharModal } = useChamaModal()

    const modalContext = useContext(ModalContext)
    const ModalConteudo = useGetConteudoModal()

    return (
        <ModalContainerDiv $display={modalContext?.visivel || 'none'}>
            <img src={fechar} alt="Icone de Fechar" onClick={aoFecharModal} />
            {ModalConteudo}
        </ModalContainerDiv>
    )
}

export default ModalContainer