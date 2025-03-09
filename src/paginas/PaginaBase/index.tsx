import { Outlet } from "react-router-dom"
import EstilosGlobais from "../../componentes/EstilosGlobais"
import styled from "styled-components"
import Cabecalho from "../../componentes/Cabecalho"
import Rodape from "../../componentes/Rodape"
import MenuLateral from "../../componentes/MenuLateral"
import ModalContainer from "../../componentes/ModalContainer"
import { SemanaProvider } from "../../context/SemanaContext"
import { TarefasProvider } from "../../context/TarefasContext"
import { DatasAgendaProvider } from "../../context/DatasAgendaContext"
import { ListaSelecionadosProvider } from "../../context/ListaSelecionadosContext"
import { TarefaAtivaProvider } from "../../context/TarefaAtivaContext"
import { UsuarioProvider } from "../../context/UsuarioContext"
import { TarefasPorDataProvider } from "../../context/TarefasPorDataContext"
import { GetCliqueProvider } from "../../context/GetClique"
import { RepeticoesProvider } from "../../context/RepeticoesContext"
import { UteisProvider } from "../../context/UteisContext"
import { QuantidadesProvider } from "../../context/QuantidadesContext"

const ContainerGlobal = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  @media screen and (max-width: 800px) {
    margin: 0;
    padding: 0;
    height: 100vh;
    justify-content: space-between;
    gap: 0;
  }
`

const ContainerPrincipal = styled.main`
    display: flex;
    gap: 60px;
    margin: 0 40px 0 10px;
    max-width: 100%;
`

const PaginaBase = () => {
    return (
        <QuantidadesProvider>
            <UteisProvider>
                <GetCliqueProvider>
                    <UsuarioProvider>
                        <SemanaProvider>
                            <TarefasProvider>
                                <RepeticoesProvider>
                                    <TarefasPorDataProvider>
                                        <ListaSelecionadosProvider>
                                            <TarefaAtivaProvider>
                                                <DatasAgendaProvider>
                                                    <ContainerGlobal>
                                                        <EstilosGlobais />
                                                        <ModalContainer />
                                                        <Cabecalho />
                                                        <ContainerPrincipal>
                                                            <MenuLateral />
                                                            <Outlet />
                                                        </ContainerPrincipal>
                                                        <Rodape />
                                                    </ContainerGlobal>
                                                </DatasAgendaProvider>
                                            </TarefaAtivaProvider>
                                        </ListaSelecionadosProvider>
                                    </TarefasPorDataProvider>
                                </RepeticoesProvider>
                            </TarefasProvider>
                        </SemanaProvider>
                    </UsuarioProvider>
                </GetCliqueProvider>
            </UteisProvider>
        </QuantidadesProvider>
    )
}

export default PaginaBase