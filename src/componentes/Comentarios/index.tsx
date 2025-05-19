import styled from "styled-components"
import { useTarefaAtiva } from "../../context/TarefaAtivaContext"
import { usePutTarefas } from "../../hooks/usePutTarefa"
import { Dict } from "styled-components/dist/types"
import { useGetTarefasPorData } from "../../hooks/useGetTarefasPorData"

const ContainerComentario = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`

const TextAreaEstilizado = styled.textarea`
    width: 500px;
    height: 300px;
    border: 1px solid #644FE8;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgb(100, 79, 232);
    overflow: scroll;
    padding: 0.5rem;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`

const H4Estilizado = styled.h4`
    font-size: 20px;
    letter-spacing: 2px;
    color: #FFF;
    text-shadow: 
        -1.5px -1.5px 0 var(--cor-fonte-primaria),  
        1.5px -1.5px 0 var(--cor-fonte-primaria),
        -1.5px  1.5px 0 var(--cor-fonte-primaria),
        1.5px  1.5px 0 var(--cor-fonte-primaria);
`

const Comentarios = () => {

    const { tarefaAtiva, setTarefaAtiva } = useTarefaAtiva();
    const { putTarefasData } = usePutTarefas();
    const { setConsultando } = useGetTarefasPorData();

    const aoEditarComentario = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTarefaAtiva((tarefa: Dict | null) => ({
            ...tarefa,
            comentarios: e.target.value
        }));
    }

    const aoPerderFoco = async () => {
        setConsultando(true);
        await putTarefasData(tarefaAtiva!);
    }

    return (
        <ContainerComentario>
            <H4Estilizado>Comentários: </H4Estilizado>
            <TextAreaEstilizado
                placeholder="Digite seus comentários aqui..."
                value={tarefaAtiva?.comentarios}
                onChange={(e) => aoEditarComentario(e)}
                onBlur={() => aoPerderFoco()}
            />
        </ContainerComentario>        
    )
}

export default Comentarios