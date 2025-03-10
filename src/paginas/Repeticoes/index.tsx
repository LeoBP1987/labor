import Botao from "../../componentes/Botao"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import ListaBotoes from "../../componentes/ListaBotoes"
import ListaRepeticoes from "../../componentes/ListaRepeticoes"
import { useChamaModal } from "../../hooks/useChamaModal"
import { useDeleteRepeticoes } from "../../hooks/useDeleteRepeticoes"
import { useGetRepeticoes } from "../../hooks/useGetRepeticoes"


const Repeticoes = () => {

    const { aoChamarModal } = useChamaModal();
    const { deleteRepeticoesData, loading } = useDeleteRepeticoes();
    const { repeticoes, loading: loadingRepeticoes } = useGetRepeticoes();


    if(loading || loadingRepeticoes) {
        return <div>Carregando...</div>
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <Botao tipo={'Repeticao'} onClick={() => aoChamarModal('novaRepeticao')} />
                <Botao tipo={'Excluir'} onClick={() => deleteRepeticoesData()} />
            </ListaBotoes>
        )
    }

    return (
        <ContainnerPadrao page="Repetições" botoes={botoes}>
            <ListaRepeticoes repeticoes={repeticoes} />
        </ContainnerPadrao>
    )
}

export default Repeticoes