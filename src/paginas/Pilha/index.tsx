import ListaTarefas from "../../componentes/ListaTarefas"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import Botao from "../../componentes/Botao";
import { useGetTarefasPilha } from "../../hooks/useGetTarefasPilha";
import ListaBotoes from "../../componentes/ListaBotoes";
import { useDeleteTarefas } from "../../hooks/useDeleteTarefas";
import BotaoAgenda from "../../componentes/BotaoData";
import { usePatchAgendamentoTarefas } from "../../hooks/usePatchAgendamentoTarefas";
import BarraCarregamento from "../../componentes/BarraCarregamento";

const Pilha = () => {

    const { tarefasPilha, loading } = useGetTarefasPilha();
    const { deleteTarefasData } = useDeleteTarefas();
    const { patchAgendamentoTarefasData } = usePatchAgendamentoTarefas();

    if(loading) {
        return <BarraCarregamento />
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <BotaoAgenda onChange={(e) => patchAgendamentoTarefasData(e.target.value, "pilha")} />
                <Botao tipo={'Concluida'} onClick={() => deleteTarefasData("pilha")}  />
            </ListaBotoes>
        )
    }

    return (
        <ContainnerPadrao botoes={botoes} page="Pilha">
            <ListaTarefas tarefas={tarefasPilha} />
        </ContainnerPadrao>
    )
}

export default Pilha