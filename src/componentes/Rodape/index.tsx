import styled from "styled-components"

const RodapeContainer = styled.footer`
    grid-column: 1 / 5;
    grid-row: 6;
    width: 100%;
    height: 2.2rem;
    background: var(--gradiente-primario);
    text-align: center;
    p {
        color: var(--cor-fonte-secundaria);
        font-size: 0.8rem;
    }
`

const Rodape = () => {
    return (
        <RodapeContainer>
            <p>Desenvolvido por Leonardo Pereira</p>
        </RodapeContainer>
    )
}

export default Rodape