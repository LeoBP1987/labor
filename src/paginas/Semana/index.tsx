import styled from "styled-components";
import ListaSemanaAtual from "../../componentes/ListaSemanaAtual";
import ListaBotoes from "../../componentes/ListaBotoes";
import Botao from "../../componentes/Botao";
import BotaoAgenda from "../../componentes/BotaoData";
import { usePatchAgendamentoTarefas } from "../../hooks/usePatchAgendamentoTarefas";
import { useDeleteTarefas } from "../../hooks/useDeleteTarefas";
import ListaTarefas from "../../componentes/ListaTarefas";
import { useGetDataAtual } from "../../hooks/useGetDataAtual";
import { useGetTarefasPorData } from "../../hooks/useGetTarefasPorData";

const SectionEstilizado = styled.section`
    width: 800px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media screen and (max-width: 800px) {
        margin-left: 35px;
        width: 100%;
        height: 525px;
        align-items: center;
        justify-content: space-between;
        gap: 60px;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }
`

const ListaTarefasDiv = styled.div`
    height: 295px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    max-width: 100%;
    @media screen and (max-width: 800px) {
        height: 221.25px;
    }
`


const Semana = () => {

    const { patchAgendamentoTarefasData } = usePatchAgendamentoTarefas();
    const { deleteTarefasData } = useDeleteTarefas();
    const { tarefasPorData, dataPesquisa, loading } = useGetTarefasPorData();
    const { dataFormatada } = useGetDataAtual();
    
    const dataPesquisaDate = new Date(dataPesquisa!)
    const dataFormatadaDate = new Date(dataFormatada)
    const dataPassada = (dataPesquisaDate < dataFormatadaDate)

    if(loading) {
        return <div>Carregando...</div>
    };

    return (
        <SectionEstilizado>
            <DivEstilizado>
                <ListaSemanaAtual />
                <ListaBotoes>
                    <Botao tipo={'Pilha'} onClick={() => patchAgendamentoTarefasData("pilha", "semana")}  />
                    <BotaoAgenda onChange={(e) => patchAgendamentoTarefasData(e.target.value, "semana")} />
                    <Botao tipo={'Concluida'} onClick={() => deleteTarefasData("semana")}  />
                </ListaBotoes>
            </DivEstilizado>
            {dataPassada && 
                            <ListaTarefasDiv>
                                <div>
                                    As tarefas não realizadas em dias passados são automático enviada para a Pilha.
                                </div>
                            </ListaTarefasDiv>
                            }
            {!dataPassada && 
                           <ListaTarefas tarefas={tarefasPorData} />
                            }
            
        </SectionEstilizado>
    )
};

export default Semana