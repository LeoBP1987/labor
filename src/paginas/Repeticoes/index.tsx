import BarraCarregamento from "../../componentes/BarraCarregamento"
import Botao from "../../componentes/Botao"
import ContainnerPadrao from "../../componentes/ContainnerPadrao"
import ListaBotoes from "../../componentes/ListaBotoes"
import ListaRepeticoes from "../../componentes/ListaRepeticoes"
import { useListaSelecionados } from "../../context/ListaSelecionadosContext"
import { useChamaModal } from "../../hooks/useChamaModal"
import { useDeleteRepeticoes } from "../../hooks/useDeleteRepeticoes"
import { useGetRepeticoes } from "../../hooks/useGetRepeticoes"
import { useGetUsuario } from "../../hooks/useGetUsuario"
import { rodarRepeticoes } from "../../services/repeticoesServices"


const Repeticoes = () => {

    const { aoChamarModal } = useChamaModal();
    const { deleteRepeticoesData, loading } = useDeleteRepeticoes();
    const { repeticoes, loading: loadingRepeticoes } = useGetRepeticoes();
    const { usuario, loading: loadingUsuario } = useGetUsuario();
    const { listaParaDeletar } = useListaSelecionados();


    if(loading || loadingRepeticoes || loadingUsuario ) {
        return <BarraCarregamento />
    }

    const aoChamarOn = async () => {
        if (!usuario) {
            alert('Usuário não encontrado')
            return null
        }
        
        try {
            const rodar = await rodarRepeticoes(usuario.id, listaParaDeletar)
            if (rodar) {
                alert("Repetições rodadas com sucesso.")
            }
        } catch (error) {
            alert("Erro ao rodar repetições.")
        }
    }

    const botoes = (): React.ReactNode => {
        return (
            <ListaBotoes>
                <Botao tipo={'On'} onClick={() => aoChamarOn()} />
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