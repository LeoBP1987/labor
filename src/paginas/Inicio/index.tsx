import ListaTarefas from "../../componentes/ListaTarefas"
import { useGetTarefasHoje } from "../../hooks/useGetTarefasHoje"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import Botao from "../../componentes/Botao";
import ListaBotoes from "../../componentes/ListaBotoes";
import { useDeleteTarefas } from "../../hooks/useDeleteTarefas";
import { usePatchAgendamentoTarefas } from "../../hooks/usePatchAgendamentoTarefas";
import BotaoAgenda from "../../componentes/BotaoData";
import { useReagendaTarefasNaoFinalizadas } from "../../hooks/useReagendaTarefasNaoFinalizadas";
import { useChecaSegunda } from "../../hooks/useChecaSegunda";
import { useEffect } from "react";
import { useUteis } from "../../context/UteisContext";

const Inicio = () => {

    const { tarefasHoje, loading } = useGetTarefasHoje();
    const { deleteTarefasData } = useDeleteTarefas();
    const { patchAgendamentoTarefasData } = usePatchAgendamentoTarefas();
    const { carregando } = useReagendaTarefasNaoFinalizadas();
    const { loading: loadingChecaSegunda, checaSegunda } = useChecaSegunda();
    const { checaSemana, setChecaSemana } = useUteis();    

    useEffect(() => {
        if(!checaSemana) {
            setChecaSemana(true);
            checaSegunda();
        }
    }, []);

    if(loading || carregando || loadingChecaSegunda ) {
        return <div>Carregando...</div>
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <Botao tipo={'DiaSeguinte'} onClick={() => patchAgendamentoTarefasData("seguinte", "hoje")}  />
                <Botao tipo={'Pilha'} onClick={() => patchAgendamentoTarefasData("pilha", "hoje")}  />
                <BotaoAgenda onChange={(e) => patchAgendamentoTarefasData(e.target.value, "hoje")} />
                <Botao tipo={'Concluida'} onClick={() => deleteTarefasData("hoje")}  />
            </ListaBotoes>
        )
    }

    return (
        <ContainnerPadrao botoes={botoes} page="Hoje">
            <ListaTarefas tarefas={tarefasHoje} />
        </ContainnerPadrao>
    )
}

export default Inicio