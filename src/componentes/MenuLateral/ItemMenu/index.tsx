import { ReactElement } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

interface ItemMenuProps {
    children: ReactElement | string
    ativo: boolean
    quantidadeTarefa?: number | null
    fixo: number | null
    link: string
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    distanciaArrastada?: number | null;
}

const corItemPadrao = ( fixo: number | null ) => fixo !== null && fixo >= 0 ? '#FFF' : '#F3F1FE';
const corItemPadraoMobile = ( fixo: number | null ) => fixo !== null && fixo >= 0 ? 'rgba(204, 204, 204, 0.6)' : 'var(--gradiente-terciario)';

const ItemLi = styled.li<{ $ativo:boolean; $quantidadeTarefa?:number | null; $altura?:number | null; $fixo:number | null }>`
    background: ${props => (props.$ativo ? '#E6E3FB' : corItemPadrao(props.$fixo))};
    list-style: none;
    padding: 8px 12px;
    border-radius: 4px;
    text-align: center;
    @media screen and (max-width: 800px) {
        background: ${props => corItemPadraoMobile(props.$fixo)}; 
        height: 24px;
        width: 184px;
        border-radius: 8px;
        border: 2px solid var(--cor-secundaria);
        box-shadow: 0 4px 4px var(--cor-secundaria);
        ${props => 
            props.$ativo && `
                background: var(--gradiente-secundario);
                border: 2px solid var(--cor-primaria);
                box-shadow: 0 4px 4px var(--cor-primaria);
            `}
    }
`
const ItemLinkEstilizado = styled(Link)`
    width: 184px;
    max-width: 184px;
    height: 24px;
    max-height: 24px;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--cor-fonte-primaria);
    font-size: 1rem;
    p {
        font-size: 0.75rem;
    }
`

const ItemMenu = ( props: ItemMenuProps ) => {

    return(
        <ItemLi 
            $ativo={props.ativo} 
            $fixo={props.fixo}
            $altura={props.distanciaArrastada}
        >
            <ItemLinkEstilizado to={props.link} onClick={props.onClick}>
                {props.children}
                <p>{props.quantidadeTarefa}</p>
            </ItemLinkEstilizado>
        </ItemLi>
    )
}

export default ItemMenu