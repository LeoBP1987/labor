import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import Botao from "../../componentes/Botao";
import { useGetTarefasAgenda } from "../../hooks/useGetTarefasAgenda";
import ListaBotoes from "../../componentes/ListaBotoes";
import { useDeleteTarefas } from "../../hooks/useDeleteTarefas";
import { usePatchAgendamentoTarefas } from "../../hooks/usePatchAgendamentoTarefas";
import BotaoAgenda from "../../componentes/BotaoData";
import AgendaTarefas from "../../componentes/AgendaTarefas";

const Agenda = () => {

    const { tarefasAgenda, loading } = useGetTarefasAgenda();
    const { deleteTarefasData } = useDeleteTarefas();
    const { patchAgendamentoTarefasData } = usePatchAgendamentoTarefas();

    if(loading) {
        return <div>Carregando...</div>
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <Botao tipo={'Pilha'} onClick={() => patchAgendamentoTarefasData("pilha", "agenda")}  />
                <BotaoAgenda onChange={(e) => patchAgendamentoTarefasData(e.target.value, "agenda")} />
                <Botao tipo={'Concluida'} onClick={() => deleteTarefasData("agenda")}  />
            </ListaBotoes>
        )
    }

    return (
        <ContainnerPadrao botoes={botoes} page="Agenda">
            <AgendaTarefas tarefas={tarefasAgenda} />
        </ContainnerPadrao>
    )
}

export default Agenda