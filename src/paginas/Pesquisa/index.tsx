import Botao from "../../componentes/Botao"
import BotaoAgenda from "../../componentes/BotaoData"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import ListaBotoes from "../../componentes/ListaBotoes"
import ListaTarefas from "../../componentes/ListaTarefas"
import { useDeleteTarefas } from "../../hooks/useDeleteTarefas"
import { useGetTarefasPorPesquisa } from "../../hooks/useGetTarefasPorPesquisa"
import { usePatchAgendamentoTarefas } from "../../hooks/usePatchAgendamentoTarefas"


const Pesquisa = () => {

    const { tarefasPorPesquisa, loading } = useGetTarefasPorPesquisa();
    const { deleteTarefasData } = useDeleteTarefas();
    const { patchAgendamentoTarefasData } = usePatchAgendamentoTarefas();

    if(loading) {
        return <div>Carregando...</div>
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <Botao tipo={'Pilha'} onClick={() => patchAgendamentoTarefasData("pilha", "hoje")}  />
                <BotaoAgenda onChange={(e) => patchAgendamentoTarefasData(e.target.value, "hoje")} />
                <Botao tipo={'Concluida'} onClick={() => deleteTarefasData("hoje")}  />
            </ListaBotoes>
        )
    }

    return (
        <ContainnerPadrao page="Tarefas" botoes={botoes}>
            <ListaTarefas tarefas={tarefasPorPesquisa} />
        </ContainnerPadrao>
    )
}

export default Pesquisa