import styled from "styled-components"

interface CampoCheckBoxProps {
    value?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode | string;
    checked?: boolean;
}

const DivContainerEstilizado = styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 800px) {
        width: 150px;
    }
`
const CheckBoxEstilizado = styled.input`
    border: 1px solid var(--cor-fonte-primaria);
`
const LabelEstilizado = styled.label`
    font-size: 18px;
    font-weight: 600;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        font-size: 16px;
    }
`

const CampoCheckBox = ({ onChange, children, value, checked }: CampoCheckBoxProps) => {
    return (
        <DivContainerEstilizado>
            <LabelEstilizado>{children}</LabelEstilizado>
            <CheckBoxEstilizado type="checkbox" onChange={onChange} value={value} checked={checked} />
        </DivContainerEstilizado>
    )
}

export default CampoCheckBox