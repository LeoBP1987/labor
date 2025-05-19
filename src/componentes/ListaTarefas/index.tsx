import styled from 'styled-components'
import ItemTarefa from '../ItemTarefa'
import icone_proximo from './icone_proximo.png'
import icone_voltar from './icone_voltar.png'
import { usePaginacaoTarefa } from '../../hooks/usePaginacaoTarefas'
import { Tarefa } from '../../compartilhado/interfaces/ITarefa'
import { useState } from 'react'

interface ListaTarefasProps {
    tarefas: Tarefa[] | [];
}

const DivContainerEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    @media screen and (max-width: 800px) {
        gap: 10px;
    }
`

const DivListaTarefasEstilizado = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
`

const ListaTarefasDiv = styled.div`
    height: 295px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    max-width: 100%;
    @media screen and (max-width: 800px) {
        height: 100%;
    }
`

const ImgEstilizado = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    @media screen and (max-width: 800px) {
        display: none;
    }
`

const DivPaginacaoEstilizado = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    @media screen and (max-width: 800px) {
        margin-top: 40px;
    }
`

const ParagrafoEstilizado = styled.p<{ $ativo: boolean }>`
    font-size: 16px;
    color: var(--cor-fonte-primaria);
    font-weight: ${props => props.$ativo ? '800' : '500'};
`

const ListaTarefas = ({tarefas}: ListaTarefasProps) => {

    const { paginaTarefas, irParaProximaPagina, irParaPaginaAnterior, paginacao, paginaAtual } = usePaginacaoTarefa(tarefas);
    const [arrastando, setArrastando] = useState(false);
    const [ posicaoX, setPosicaoX ] = useState<number | null>(null);
    const [ distanciaArrastada, setDistanciaArrastada ] = useState<number | null>(null);

    const aoIniciarArrasto = (e: React.TouchEvent<HTMLDivElement>) => {
        setPosicaoX(e.touches[0].clientX);
        setArrastando(true);
    };

    const aoArrastar = (e: React.TouchEvent<HTMLDivElement>) => {

        if(posicaoX === null) return;

        const posicaoAtual = e.changedTouches[0].clientX;
        setDistanciaArrastada((posicaoAtual - posicaoX));
    }

    const aoFinalizarArrasto = () => {
        if (distanciaArrastada === null) return;        

        if (distanciaArrastada > 50) {
            irParaPaginaAnterior();

        } else if (distanciaArrastada < -50) {
            irParaProximaPagina();
        }

        setPosicaoX(null);
        setArrastando(false);
    };

    if(!tarefas.length) {
        return (
            <ListaTarefasDiv>
                <p>Não há tarefas para hoje</p>
            </ListaTarefasDiv>
        )
    }


    return (
        <DivContainerEstilizado>
            <DivListaTarefasEstilizado
                onTouchStart={(e) => aoIniciarArrasto(e)}
                onTouchMove={(e) => aoArrastar(e)}
                onTouchEnd={() => aoFinalizarArrasto()}
                style={{ cursor: arrastando ? "grabbing" : "grab" }}
            >
                <ImgEstilizado
                    src={icone_voltar}
                    alt='Imagem do Icone Voltar'
                    onClick={() => irParaPaginaAnterior()}
                />
                <ListaTarefasDiv>
                    {paginaTarefas.map((tarefa) => (
                        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
                    ))}
                </ListaTarefasDiv>
                <ImgEstilizado
                    src={icone_proximo}
                    alt='Imagem do Icone Próximo'
                    onClick={() => irParaProximaPagina()}
                />
            </DivListaTarefasEstilizado>
            <DivPaginacaoEstilizado>
                {paginacao.map((_, index) => (
                    <ParagrafoEstilizado key={index} $ativo={(index + 1) === paginaAtual}>{index + 1}</ParagrafoEstilizado>
                ))}
            </DivPaginacaoEstilizado>
        </DivContainerEstilizado>
    )
}

export default ListaTarefas