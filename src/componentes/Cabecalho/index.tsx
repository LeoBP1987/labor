import styled from "styled-components"
import logo from "./logo_labor.png"
import lupa from "./icone_lupa_roxo.png"
import { useState } from "react"
import { useGetTarefasPorPesquisa } from "../../hooks/useGetTarefasPorPesquisa"
import { useLocation, useNavigate } from "react-router-dom"

const CabecalhoContainer = styled.header`
    max-width: 100%;
    padding: 1.56rem 2.5% 0 2.5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: 800px) {
        padding: 0;
        flex-direction: column;
        gap: 4rem;
        align-items: center;
    }
`
const CabecalhoLogo = styled.img`
    @media screen and (max-width: 800px) {
        transform: scale(1.1);
    }
`
const PesquisaWrapper = styled.div`
    position: relative;
    width: 25rem;
    height: 2rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 800px) {
        display: none;
    }
`
const CabecalhoPesquisa = styled.input`
    width: 23rem;
    height: 2rem;
    border: 5px solid var(--cor-primaria);
    border-radius: 20px;
    padding-left: 2rem;
    font-family: var(--fonte-primaria);
    color: var(--cor-fonte-primaria);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    &:focus {
        outline: none;
        border: 6px solid var(--cor-primaria);
    }
`
const LupaImg = styled.img`
    position: absolute;
    right: 12px;
    top: 60%;
    transform: translateY(-50%);
    width: 40px;
    cursor: pointer;
`

const CabecalhoDiv = styled.div`
    display: none;
    @media screen and (max-width: 800px) {
        display: block;
        padding: 0;
        width: 100%;
        height: 2rem;
        background: var(--gradiente-primario);
        p {
            color: var(--cor-fonte-secundaria);
            font-size: 0.8rem;
            padding: 0;
            text-align: center;
        }
    }
`
const Cabecalho = () => {

    const [pesquisa, setPesquisa] = useState("");
    const { getTarefasPorPesquisaData } = useGetTarefasPorPesquisa();
    const navigate = useNavigate();
    const location = useLocation();

    const aoPesquisar = async () => {
        if (pesquisa) {
            await getTarefasPorPesquisaData(pesquisa);
            navigate('/pesquisa');
        } else {
            if (location.pathname === '/pesquisa') {
                navigate(-1)
            }
        }
    }

    return (
        <CabecalhoContainer>
            <CabecalhoDiv>
                <p>Arraste essa barra para baixo para ver o menu</p>
            </CabecalhoDiv>
            <CabecalhoLogo src={logo} alt="Logo Marca do aplicativo Labor" />
            <PesquisaWrapper>
                <CabecalhoPesquisa
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    onBlur={() => aoPesquisar()}
                />
                <LupaImg src={lupa} alt="Ícone de lupa" onClick={() => aoPesquisar()} />
            </PesquisaWrapper>
        </CabecalhoContainer>
    )
}

export default Cabecalho