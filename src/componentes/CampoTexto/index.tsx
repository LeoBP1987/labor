import styled from "styled-components"

interface CampoTextoProps {
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode | string;
    readonly?: boolean
}

const DivContainerEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
`
const InputEstilizado = styled.input`
    width: 100%;
    height: 25px;
    padding: 10px;
    border: 2px solid var(--cor-fonte-primaria);
    border-radius: 8px;
    color: var(--cor-fonte-primaria);
    font-size: 18px;
    &:focus {
        outline: none;
    }
    @media screen and (max-width: 800px) {
        width: 85%;
        height: 18.75px;
        padding: 5px;
        font-size: 16px;
    }
`
const LabelEstilizado = styled.label`
    font-size: 24px;
    font-weight: 500;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        font-size: 18px;
    }
`

const CampoTexto = ({ type, value, onChange, children, readonly }: CampoTextoProps) => {
    return (
        <DivContainerEstilizado>
            <LabelEstilizado>{children}</LabelEstilizado>
            <InputEstilizado readOnly={readonly} type={type} onChange={onChange} value={value} />
        </DivContainerEstilizado>
    )
}

export default CampoTexto