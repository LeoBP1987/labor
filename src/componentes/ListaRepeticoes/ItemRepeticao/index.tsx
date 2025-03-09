import { useState } from "react"
import styled from "styled-components"
import { useListaSelecionados } from "../../../context/ListaSelecionadosContext"
import { Dict } from "styled-components/dist/types"
import { usePutRepeticoes } from "../../../hooks/usePutRepeticao"


interface ItemRepeticoesProps {
    repeticao: Dict
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

const ItemRepeticoes = (props: ItemRepeticoesProps) => {

    const [readOnly, setReadOnly] = useState(true);
    const [repeticao, setRepeticao] = useState(props.repeticao);
    const { listaParaDeletar, setListaParaDeletar } = useListaSelecionados();
    const { putRepeticoesData, loading } = usePutRepeticoes();

    if(loading) {
        return <div>Carregando...</div>
    }

    const aoSelecionar = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {
            setListaParaDeletar([...listaParaDeletar, repeticao.id]);
        } else {
            setListaParaDeletar(listaParaDeletar.filter(item => item !== repeticao.id));
        }
    };

    const aoDuploClique = () => {
        setReadOnly(false);
    };

    const aoPerderFoco = async () => {
        if (!readOnly) {
            setReadOnly(true);
            await putRepeticoesData(repeticao);
        }
    };

    const aoEditarRepeticao = async (evento: React.ChangeEvent<HTMLInputElement>) => {
        setRepeticao(repeticao => ({
            ...repeticao,
            descricao: evento.target.value
        }));
    };

    return (
        <ItemTarefaDiv>
            <DivContainerTarefa>
                <CheckBoxEstilizado type="checkbox" onChange={(e) => aoSelecionar(e)} />
                <InputEslizado
                    value={repeticao.descricao}
                    readOnly={readOnly}
                    onDoubleClick={aoDuploClique}
                    onBlur={aoPerderFoco}
                    onChange={aoEditarRepeticao}
                />
            </DivContainerTarefa>
        </ItemTarefaDiv>
    )
}

export default ItemRepeticoes