import styled, { keyframes } from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    width: 100%;
    margin: 2rem 0;
`;

const Texto = styled.span`
    color: var(--cor-fonte-primaria);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const BarraWrapper = styled.div`
    width: 320px;
    height: 18px;
    border: 2px solid var(--cor-fonte-primaria);
    border-radius: 12px;
    background: var(--cor-fonte-secundaria);
    overflow: hidden;
    @media (max-width: 600px) {
        width: 90vw;
    }
`;

const animarBarra = keyframes`
    0% { width: 0; }
    100% { width: 100%; }
`;

const BarraPreenchida = styled.div`
    height: 100%;
    background: var(--cor-primaria);
    width: 100%;
    animation: ${animarBarra} 1.2s linear infinite alternate;
    transition: background 0.3s;
`;

const BarraCarregamento = () => (
    <Container>
        <Texto>Carregando...</Texto>
        <BarraWrapper>
            <BarraPreenchida />
        </BarraWrapper>
    </Container>
);

export default BarraCarregamento;