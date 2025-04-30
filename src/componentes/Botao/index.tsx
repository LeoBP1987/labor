import agenda from './icones/icone-agenda.png'
import concluida from './icones/icone-concluida.png'
import imediata from './icones/icone-imediato.png'
import lixeira from './icones/icone-lixeira.png'
import pilha from './icones/icone-pilha.png'
import repeticao from './icones/icone-repeticao.png'
import proxDia from './icones/icone-prox-dia.png'
import iconeOn from './icones/icone-on.png'
import styled from 'styled-components'
import { Dict } from 'styled-components/dist/types'

interface BotaoProps {
    tipo: 'Pilha' | 'Agenda' | 'Concluida' | 'Repeticao' | 'Imediata' | 'DiaSeguinte' | 'Excluir' | 'On';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variaveis = {
    'Pilha': {'corFundo':'var(--cor-terciaria)', 'icone':pilha} ,
    'Agenda': {'corFundo':'var(--cor-quintenaria)', 'icone':agenda} ,
    'Concluida': {'corFundo':'var(--cor-fonte-secundaria)', 'icone':concluida},
    'Repeticao': {'corFundo':'var(--cor-quaternaria)', 'icone':repeticao},
    'Imediata': {'corFundo':'var(--cor-fonte-secundaria)', 'icone':imediata},
    'DiaSeguinte': {'corFundo':'var(--cor-setimaria)', 'icone':proxDia},
    'Excluir': {'corFundo':'var(--cor-fonte-secundaria)', 'icone':lixeira},
    'On': {'corFundo':'var(--cor-fonte-secundaria)', 'icone':iconeOn}
}

const BotaoEstilizado = styled.button<{ $dados: Dict }>`
    width: 40px;
    height: 40px;
    border: 4px solid var(--cor-secundaria);
    background: ${props => props.$dados.corFundo};
    border-radius: 4px;
    background-image: url(${props => props.$dados.icone});
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
`

const Botao = (props:BotaoProps)  => {

    const dados = variaveis[props.tipo]

    return (
        <BotaoEstilizado $dados={dados} onClick={props.onClick} />
    )
}

export default Botao