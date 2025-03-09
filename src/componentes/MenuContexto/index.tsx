import styled from "styled-components";

interface MenuContextoProps {
    display: 'none' | 'block';
    onAdicionarComentario: () => void;
    tamanhoDescricao: number;
    id: string;
}

const MenuContextoDiv = styled.div<{ $tamanhoDescricao: number }>`
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 10px;
    left: ${props => `${props.$tamanhoDescricao}px`};
    cursor: pointer;
`;

const OpcaoMenu = styled.div`
    font-family: var(--fonte-primaria);
    color: var(--cor-fonte-primaria);
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const MenuContexto = ({ display, onAdicionarComentario, tamanhoDescricao, id }: MenuContextoProps) => {
    return (
        <MenuContextoDiv id={id} style={{ display: display }} $tamanhoDescricao={tamanhoDescricao} tabIndex={-1} >
            <OpcaoMenu onClick={onAdicionarComentario}>Adicionar comentário</OpcaoMenu>
        </MenuContextoDiv>
    );
};

export default MenuContexto;