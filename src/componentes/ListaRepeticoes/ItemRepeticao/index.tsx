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
    width: 580px;
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

const DiasRepeticao = styled.span`
    margin-left: auto;
    font-size: 0.6rem;
    color: #888;
    font-weight: 500;
    letter-spacing: 1px;
    white-space: nowrap;
`

const diasSemanaMap: { [key: number]: string } = {
    1: "Seg",
    2: "Ter",
    3: "Qua",
    4: "Qui",
    5: "Sex",
    6: "Sab",
    7: "Dom"
};

const ItemRepeticoes = (props: ItemRepeticoesProps) => {

    const [readOnly, setReadOnly] = useState(true);
    const [repeticao, setRepeticao] = useState(props.repeticao);
    const { listaParaDeletar, setListaParaDeletar } = useListaSelecionados();
    const { putRepeticoesData, loading } = usePutRepeticoes();

    if (loading) {
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

    const dias = Array.isArray(repeticao.repeticoes)
        ? [...repeticao.repeticoes].sort((a: number, b: number) => a - b)
        : [];

    let diasTexto = "";
    if (dias.length === 7) {
        diasTexto = "Todos os dias";
    } else if (dias.length > 0) {
        diasTexto = dias.map((num: number) => diasSemanaMap[num] || "").join(" - ");
    }

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
                <DiasRepeticao>
                    {diasTexto}
                </DiasRepeticao>
            </DivContainerTarefa>
        </ItemTarefaDiv>
    )
}

export default ItemRepeticoes