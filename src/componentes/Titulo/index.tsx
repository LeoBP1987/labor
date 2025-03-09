import { ReactElement } from "react"
import styled from "styled-components"


interface TituloProps {
    children: ReactElement | string
}

const H1Estilizado = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 40px;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        font-size: 28px;
    }
`

const Titulo = ( props:TituloProps ) => {
    return (
        <H1Estilizado>
            {props.children}
        </H1Estilizado>
    )
}

export default Titulo