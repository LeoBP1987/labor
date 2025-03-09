import styled from "styled-components";
import ItemMenu from "./ItemMenu";
import { useArrastarMenu } from "../../hooks/useArrastarMenu";
import useLogoff from "../../hooks/useLogoff";
import { useChamaModal } from "../../hooks/useChamaModal";
import { useGetClique } from "../../context/GetClique";
import { useGetQuantidades } from "../../hooks/useGetQuantidades";

const MenuAside = styled.aside<{ $altura: number }>`
  @media screen and (max-width: 800px) {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: ${(props) =>
    props.$altura < 40
      ? "40px"
      : props.$altura >= 500
        ? "100%"
        : `${props.$altura}px`};
    background-color: ${(props) =>
    props.$altura <= 40 ? "rgba(0, 0, 0, 0.0)" : "rgba(0, 0, 0, 0.5)"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const MenuListaContainer = styled.div<{ $altura: number }>`
  @media screen and (max-width: 800px) {
    position: fixed;
    left: 10;
    top: 0;
    background: rgba(255, 255, 255, 0.75);
    margin-top: 2rem;
    width: 212px;
    height: ${(props) =>
    props.$altura >= 500 ? "528px" : `${props.$altura}px`};
    display: ${(props) =>
    props.$altura >= 40 ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    gap: 30px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(100, 79, 232, 0.8);
    padding: 30px 40px;
  }
`;

const MenuListaAcesso = styled.ul<{ $concluido: string }>`
  margin-left: 70px;
  padding: 0 28px 34px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 800px) {
    display: ${props => props.$concluido};
    margin: 0;
    padding: 0;
  }
`;
const MenuListaUteis = styled.ul<{ $concluido: string }>`
  margin-left: 70px;
  margin-top: 40px;
  padding: 0 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 800px) {
    display: ${props => props.$concluido};
    margin: 0;
    padding: 0;
  }
`;
const MenuDiv = styled.div<{ $concluido: string }>`
  display: block;
  margin-left: 70px;
  margin-top: 40px;
  padding: 0 28px;
  @media screen and (max-width: 800px) {
    display: ${props => props.$concluido};
    margin: 0;
    padding: 0;
  }
`;

const MenuLateral = () => {

  const { menuAtivo, setMenuAtivo } = useGetClique();
  const { logoff } = useLogoff();
  const {
    aoIniciarArrasto,
    aoArrastar,
    aoFinalizarArrasto,
    aoFecharMenu,
    setDistanciaArrastada,
    arrastando,
    distanciaArrastada,
    concluido,
  } = useArrastarMenu();
  const { quantidades } = useGetQuantidades();
  const { aoChamarModal } = useChamaModal();

  const mudaAtivo = (item: string) => {
    setMenuAtivo(item)
    setDistanciaArrastada(0);
  }

  const aoClicarNovaTarefa = () => {
    aoChamarModal('novaTarefa');
    mudaAtivo("None");
  }

  return (
    <MenuAside
      onTouchStart={aoIniciarArrasto}
      onTouchMove={aoArrastar}
      onTouchEnd={aoFinalizarArrasto}
      onClick={aoFecharMenu}
      style={{ cursor: arrastando ? "grabbing" : "grab" }}
      $altura={distanciaArrastada}
    >
      <MenuListaContainer $altura={distanciaArrastada}>
        <MenuListaAcesso $concluido={concluido}>
          <ItemMenu 
                  ativo={menuAtivo === "Hoje"}
                  fixo={0} 
                  quantidadeTarefa={quantidades.tarefasHoje} 
                  link="/" 
                  onClick={() => mudaAtivo("Hoje")}
          >
            Hoje
          </ItemMenu>
          <ItemMenu 
                  ativo={menuAtivo === "Semana"}
                  fixo={0}
                  quantidadeTarefa={quantidades.tarefasSemana}
                  link="/semana"
                  onClick={() => mudaAtivo("Semana")}
          >
            Semana
          </ItemMenu>
          <ItemMenu 
                  ativo={menuAtivo === "Pilha"}
                  fixo={0}
                  quantidadeTarefa={quantidades.tarefasPilha} 
                  link="/pilha"
                  onClick={() => mudaAtivo("Pilha")}
          >
            Pilha
          </ItemMenu>
          <ItemMenu 
                  ativo={menuAtivo === "Repeticao"} 
                  fixo={0}
                  quantidadeTarefa={quantidades.repeticoes}
                  link="/repeticoes"
                  onClick={() => mudaAtivo("Repeticao")}
          >
            Repetições
          </ItemMenu>
        </MenuListaAcesso>
        <MenuListaUteis $concluido={concluido}>
          <ItemMenu 
                  ativo={false} 
                  fixo={null}
                  quantidadeTarefa={null} 
                  link="/agenda"
                  onClick={() => setDistanciaArrastada(0)}
          >
            Agenda
          </ItemMenu>
          <ItemMenu 
                  ativo={false} 
                  fixo={null}
                  quantidadeTarefa={null} 
                  link="#" 
                  onClick={() => aoClicarNovaTarefa()}
          >
            Nova Tarefa
          </ItemMenu>
          <ItemMenu 
                  ativo={false} 
                  fixo={null}
                  quantidadeTarefa={null} 
                  link="/montarsemana"
                  onClick={() => setDistanciaArrastada(0)}
          >
            Montar Semana
          </ItemMenu>
          <ItemMenu 
                  ativo={false} 
                  fixo={null}
                  quantidadeTarefa={null} 
                  link="/configuracoes"
                  onClick={() => setDistanciaArrastada(0)}
          >
            Configurações
          </ItemMenu>
        </MenuListaUteis>
        <MenuDiv $concluido={concluido}>
          <ItemMenu 
                  ativo={false} 
                  fixo={null}
                  quantidadeTarefa={null} 
                  link="/login" 
                  onClick={() => logoff()}
          >
            Sair
          </ItemMenu>
        </MenuDiv>
      </MenuListaContainer>
    </MenuAside>
  );
};

export default MenuLateral;
