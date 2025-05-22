import { useEffect, useState } from "react"
import styled from "styled-components"
import { Dict } from "styled-components/dist/types"
import notas from "./icone-nota.png"
import { useChamaModal } from "../../hooks/useChamaModal"
import { useListaSelecionados } from "../../context/ListaSelecionadosContext"
import { usePutTarefas } from "../../hooks/usePutTarefa"
import MenuContexto from "../MenuContexto"
import { useTarefaAtiva } from "../../context/TarefaAtivaContext"


interface ItemTarefaProps {
    tarefa: Dict
}

const ItemTarefaDiv = styled.div`
    position: relative;
`

const DivContainerTarefa = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`

const InputEslizado = styled.input`
    position: relative;
    width: 720px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid rgba(204, 204, 204, 0.5);
    font-weight: 500;
    color: var(--cor-fonte-primaria);
    &:focus{
        border: 2px solid var(--cor-primaria);
        border-radius: 8px;
        outline: none;
        padding: 5px;
    }
    @media screen and (max-width: 800px) {
        width: 100%;
        font-size: 16px;
    }
`

const CheckBoxEstilizado = styled.input`
    margin-bottom: 7.5px;

`

const NotasDiv = styled.div<{ $tamanhoDescricao: number }>`
    position: relative;
    img {
        position: absolute;
        bottom: 10px;
        left: ${props => `${props.$tamanhoDescricao}px`};
        cursor: pointer;
        width: 22px;
        height: 22px;
    }
    @media screen and (max-width: 800px) {
        display: none;
    }
`

const NotasMobile = styled.img`
    display: none;
    width: 22px;
    height: 22px;
    margin-right: 8px;
    @media screen and (max-width: 800px) {
        display: inline;
        align-self: center;
        vertical-align: middle;
    }
`

const ItemTarefa = (props: ItemTarefaProps) => {

    const [readOnly, setReadOnly] = useState(true);
    const [tarefa, setTarefa] = useState(props.tarefa);
    const { setTarefaAtiva } = useTarefaAtiva();
    const [menuContexto, setMenuContexto] = useState<'none' | 'block'>('none');
    const { aoChamarModal } = useChamaModal();
    const { listaParaDeletar, setListaParaDeletar, listaParaAtualizar, setListaParaAtualizar } = useListaSelecionados();
    const { putTarefasData } = usePutTarefas();

    const aoSelecionar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setListaParaDeletar([...listaParaDeletar, tarefa.id]);
            setListaParaAtualizar([...listaParaAtualizar, { id: tarefa.id }]);
        } else {
            setListaParaDeletar(listaParaDeletar.filter(item => item !== tarefa.id));
            setListaParaAtualizar(listaParaAtualizar.filter(item => item.id !== tarefa.id));
        }
    }

    const aoDuploClique = () => {
        setReadOnly(false);
    }

    const aoPerderFoco = async () => {
        if (!readOnly) {
            setReadOnly(true);
            await putTarefasData(tarefa);
        }
    }

    const aoEditarTarefa = async (evento: React.ChangeEvent<HTMLInputElement>) => {
        setTarefa(tarefa => ({
            ...tarefa,
            descricao: evento.target.value
        }));
    }

    const [tamanhoDescricao, setTamanhoDescricao] = useState(0);

    useEffect(() => {
        const calcularTamanhoDescricao = (texto: string) => {
            const canvas = document.createElement('canvas');
            const contexto = canvas.getContext('2d');
            if (contexto) {
                contexto.font = '20px Inter';
                const largura = contexto.measureText(texto).width;
                const larguraComPadding = largura + 40;
                return larguraComPadding
            } else {
                console.error("Não foi possível obter o contexto 2D");
                return 0;
            }
        };

        const larguraTexto = calcularTamanhoDescricao(tarefa.descricao);
        setTamanhoDescricao(larguraTexto);
    }, [tarefa.descricao]);

    const aoClicarMenuContexto = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuContexto('block');
    };

    const fecharMenuContexto = () => {
        setMenuContexto('none');
    };

    const aoSairFocoTarefa = (e: React.FocusEvent<HTMLDivElement>) => {
        const elementoFocado = e.relatedTarget;
        const MenuContexto = document.getElementById(`${tarefa.id}`);
        if (elementoFocado !== MenuContexto) {
            fecharMenuContexto();
        }
    };

    const onAdicionarComentario = () => {
        setTarefaAtiva(tarefa);
        aoChamarModal('comentario');
        fecharMenuContexto();
    }

    // Detecta se é mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ItemTarefaDiv onContextMenu={aoClicarMenuContexto} onBlur={(e) => aoSairFocoTarefa(e)}>
            <MenuContexto id={tarefa.id} display={menuContexto} tamanhoDescricao={tamanhoDescricao} onAdicionarComentario={onAdicionarComentario} />
            {/* Ícone no final (desktop) */}
            {tarefa.comentarios && !isMobile && (
                <NotasDiv $tamanhoDescricao={tamanhoDescricao}>
                    <img src={notas} alt="Icone Notas" onClick={() => onAdicionarComentario()} />
                </NotasDiv>
            )}
            <DivContainerTarefa>
                <CheckBoxEstilizado type="checkbox" onChange={(e) => aoSelecionar(e)} />
                {/* Ícone no início (mobile) */}
                {tarefa.comentarios && isMobile && (
                    <NotasMobile src={notas} alt="Icone Notas" onClick={() => onAdicionarComentario()} />
                )}
                <InputEslizado
                    value={tarefa.descricao}
                    readOnly={readOnly}
                    onDoubleClick={aoDuploClique}
                    onBlur={aoPerderFoco}
                    onChange={aoEditarTarefa}
                />
            </DivContainerTarefa>
        </ItemTarefaDiv>
    )
}

export default ItemTarefa