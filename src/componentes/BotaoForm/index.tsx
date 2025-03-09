import styled from "styled-components"

interface BotaoFormProps {
    children: React.ReactNode | string
    type?: 'submit'  | 'reset' | 'button'
    cor: 1 | 2 | 3
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    display?: 'none' | 'block';
    tamanho?: number
}

const BotaoEstilizado = styled.button<{ $cor:number, $display?:string, $tamanho:number }>`
    display: ${props => props.$display};
    width: ${props => `${props.$tamanho}px`};
    height: 45px;
    border: 1px solid var(--cor-fonte-primaria);
    border-radius: 12px;
    background: ${props => (props.$cor === 1) ? 'var(--gradiente-botao-primario)' :
                (props.$cor === 2) ? 'var(--gradiente-botao-secundario)' :
                'rgba(247, 234, 0, 1)'};
    color: var(--cor-fonte-secundaria);
    font-weight: 600;
    cursor: pointer;
    @media screen and (max-width: 800px){
        font-size: 16px;
        width: ${props => props.$tamanho === 175 ? `135px` : '160px'};
        height: 35px;
    }
`

const BotaoForm = ({children, type="button", cor, onClick, display, tamanho=175}: BotaoFormProps) => {
    return (
        <BotaoEstilizado $cor={cor} type={type} onClick={onClick} $display={display} $tamanho={tamanho}>
            {children}
        </BotaoEstilizado>
    )
}

export default BotaoForm