import styled from "styled-components"


interface CampoTextoLoginProps {
    type?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode | string
}

const DivContainerEstilizado = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 15px;
    @media screen and (max-width: 800px){
        width: 200px;
    }
`
const InputEstilizado = styled.input`
    width: 270px;
    height: 25px;
    padding: 10px;
    border: 2px solid var(--cor-fonte-primaria);
    border-radius: 16px;
    color: var(--cor-fonte-primaria);
    font-size: 18px;
    &:focus {
        outline: none;
    }
    @media screen and (max-width: 800px) {
        width: 202px;
        height: 18.75px;
    }
`
const LabelEstilizado = styled.label`
    font-size: 28px;
    font-weight: 700;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
        font-size: 14px;
    }
`

const CampoTextoLogin = ({ type, value, onChange, children }: CampoTextoLoginProps) => {
    return (
        <DivContainerEstilizado>
            <LabelEstilizado>{children}</LabelEstilizado>
            <InputEstilizado type={type} onChange={onChange} value={value} />
        </DivContainerEstilizado>
    )
}

export default CampoTextoLogin