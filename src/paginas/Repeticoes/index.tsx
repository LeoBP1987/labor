import Botao from "../../componentes/Botao"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import ListaBotoes from "../../componentes/ListaBotoes"
import ListaRepeticoes from "../../componentes/ListaRepeticoes"
import { useChamaModal } from "../../hooks/useChamaModal"
import { useDeleteRepeticoes } from "../../hooks/useDeleteRepeticoes"


const Repeticoes = () => {

    const { aoChamarModal } = useChamaModal();
    const { deleteRepeticoesData, loading } = useDeleteRepeticoes();


    if(loading) {
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
            <ListaRepeticoes />
        </ContainnerPadrao>
    )
}

export default Repeticoes