import styled from 'styled-components'
import icone_proximo from './icone_proximo.png'
import icone_voltar from './icone_voltar.png'
import { Agenda } from '../../compartilhado/interfaces/IAgenda'
import ItemTarefa from '../ItemTarefa';
import { usePaginacaoAgenda } from '../../hooks/usePaginacaoAgenda';
import { useState } from 'react';

interface AgendaTarefasProps {
    tarefas: Agenda[] | [];
}

const DivContainerEstilizado = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    @media screen and (max-width: 800px) {
        gap: 20px;
    }
`

const DivListaAgendaTarefasEstilizado = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
`

const AgendaTarefasDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 100%;
    @media screen and (max-width: 800px) {
        gap: 20px;
        align-items: center;
        height: 221.25px;
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
`

const ParagrafoEstilizado = styled.p<{ $ativo: boolean }>`
    font-size: 16px;
    color: var(--cor-fonte-primaria);
    font-weight: ${props => props.$ativo ? '800' : '500'};
`
const H3Estilizado = styled.h3`
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px){
        margin: 0 0 0.2rem 0;
        padding: 0;
    }
`

const AgendaTarefas = ({ tarefas }: AgendaTarefasProps) => {

    if (!tarefas) {
        return (
            <AgendaTarefasDiv>
                <div>Não há tarefas cadastradas para hoje. Aproveite seu dia.</div>
            </AgendaTarefasDiv>
        )
    }

    const { tarefasPaginaAtual, irParaProximaPagina, irParaPaginaAnterior, paginacao, contaPagina, dia } = usePaginacaoAgenda(tarefas);
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

    return (
        <DivContainerEstilizado>
            <DivListaAgendaTarefasEstilizado
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
                <AgendaTarefasDiv>
                    <H3Estilizado>{dia}</H3Estilizado>
                    {tarefasPaginaAtual.map(tarefa => (
                        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
                    ))}
                </AgendaTarefasDiv>
                <ImgEstilizado
                    src={icone_proximo}
                    alt='Imagem do Icone Próximo'
                    onClick={() => irParaProximaPagina()}
                />
            </DivListaAgendaTarefasEstilizado>
            <DivPaginacaoEstilizado>
                {paginacao.map((_, index) => (
                    <ParagrafoEstilizado key={index} $ativo={(index + 1) === contaPagina}>{index + 1}</ParagrafoEstilizado>
                ))}
            </DivPaginacaoEstilizado>
        </DivContainerEstilizado>
    )
}

export default AgendaTarefas