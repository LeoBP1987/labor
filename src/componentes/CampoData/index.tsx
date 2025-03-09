import styled from "styled-components"
import { useDatasAgenda } from "../../context/DatasAgendaContext";
import { useGetDataAtual } from "../../hooks/useGetDataAtual";

interface CampoDataProps {
    valor: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tipo?: string;
}

const CampoDataEstilizado = styled.input`
    width: 40%;
    height: 35px;
    border: 2px solid var(--cor-fonte-primaria);
    border-radius: 8px;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        width: 25%;
    }
`

const CampoData = ({valor, onChange, tipo}: CampoDataProps) => {

    const { dataFormatada } = useGetDataAtual();
    const { dataInicio } = useDatasAgenda();

    return (
        <CampoDataEstilizado 
                        type="date" 
                        value={valor} 
                        onChange={onChange}
                        min={tipo === "final" ? dataInicio : dataFormatada}
        />
    )
}

export default CampoData