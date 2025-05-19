import styled from "styled-components"
import Titulo from "../../componentes/Titulo"
import CampoData from "../CampoData";
import { useDatasAgenda } from "../../context/DatasAgendaContext";
import icone_lupa_azul from "./icone_lupa_azul.png"

interface ContainnerPadraoProps {
    children: React.ReactNode | string
    botoes?: () => React.ReactNode;
    page: string;
}

const SectionEstilizado = styled.section`
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media screen and (max-width: 800px) {
        margin: 20px 0;
        width: 100%;
        max-width: 100%;
        height: 525px;
        max-height: 525px;
        align-items: center;
        justify-content: center;
        gap: 45px;
    }
`

const DivEstilizado = styled.div`
    width: 762px;
    max-width: 100%;
    margin-left: 60px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 800px) {
        margin: 0;
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }
`

const ContainerDataEstilizado = styled.div`
    margin: 0 0 0.75rem 0;
    padding: 0;
    display: flex;
    gap: 20px;
    align-self: flex-end;
    @media screen and (max-width: 800px) {
        width: 100%;
        justify-content: center;
        align-items: center;
        align-self: center;
    }
`

const ImgEstilizado = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    @media screen and (max-width: 800px) {
        width: 30px;
        height: 30px;
    }
`


const ContainnerPadrao = ({ children, botoes, page }: ContainnerPadraoProps) => {

    const { dataInicio, setDataInicio, dataFinal, setDataFinal, setConsultando } = useDatasAgenda();

    const aoMudarInicio = (data: string) => {
        setDataInicio(data);
        setDataFinal(data);
    }

    return (
        <SectionEstilizado>
            <DivEstilizado>
                <Titulo>{page}</Titulo>
                {page === "Agenda" &&
                    <ContainerDataEstilizado>
                        <CampoData
                            valor={dataInicio}
                            onChange={(e) => aoMudarInicio(e.target.value)}
                            tipo="inicio"
                        />
                        <CampoData
                            valor={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                            tipo="final"
                        />
                        <ImgEstilizado
                            src={icone_lupa_azul}
                            alt="Imagem de Icone Azul"
                            onClick={() => setConsultando(true)}
                        />
                    </ContainerDataEstilizado>
                }
                {botoes && botoes()}
            </DivEstilizado>
            {children}
        </SectionEstilizado>
    )
}

export default ContainnerPadrao