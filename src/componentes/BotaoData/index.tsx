import styled from "styled-components"
import { useGetDataAtual } from "../../hooks/useGetDataAtual";

interface BotaoAgendaProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const { dataFormatada } = useGetDataAtual();

const InputAgendaEstilizado = styled.input`
    width: 28px;
    height: 32px;
    padding-right: 3px;
    border: 4px solid var(--cor-secundaria);
    border-radius: 4px;
    background: var(--cor-quintenaria);
    color: var(--cor-quintenaria);
    cursor: pointer;
    @media screen and (max-width: 800px) {
        width: 34px;
        height: 38px;
        background: #FFFFFF url('/imagens/icones/calendario.png') no-repeat center;
        background-size: 100% 100%;
    }
`

const BotaoAgenda = ({ onChange }: BotaoAgendaProps) => {
    return (
        <InputAgendaEstilizado type="date" min={dataFormatada} onChange={onChange} />
    )
}

export default BotaoAgenda