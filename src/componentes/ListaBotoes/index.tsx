import styled from "styled-components"

interface ListaBotoesProps {
    children: React.ReactNode | string
}

const BotoesDiv = styled.div`
    margin: 0 0 1rem 0;
    padding: 0;
    display: flex;
    gap: 20px;
    align-self: flex-end;
    @media screen and (max-width: 800px) {
        align-self: center;
    }
`

const ListaBotoes = ({ children }: ListaBotoesProps) => {
    return (
        <BotoesDiv>
            {children}
        </BotoesDiv>
    )
}

export default ListaBotoes