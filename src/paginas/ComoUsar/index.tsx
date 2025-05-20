import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem auto;
  background: #f9f9f9;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.08);
  padding: 0 2rem 2.5rem 2rem;
  font-family: var(--fonte-primaria);
  color: var(--cor-fonte-primaria);

  @media screen and (max-width: 800px) {
    padding: 0 0.5rem 1.5rem 0.5rem;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
  }
`;

const Titulo = styled.h1`
  font-size: 2rem;
  color: var(--cor-primaria);
  margin-bottom: 2.5rem;
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
`;

const Subtitulo = styled.h2`
  font-size: 1.2rem;
  color: var(--cor-quaternaria);
  margin-top: 2.5rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 800px) {
    font-size: 1rem;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const ListaBotoes = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 4rem;

  @media screen and (max-width: 800px) {
    margin-bottom: 2rem;
  }
`;

const BotaoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  img {
    width: 28px;
    height: 28px;
    margin-right: 10px;
    border-radius: 6px;
    background: #fff;
    border: 1px solid #eee;
    object-fit: contain;
    @media screen and (max-width: 800px) {
      width: 22px;
      height: 22px;
      margin-right: 8px;
    }
  }
  span {
    font-size: 1rem;
    color: var(--cor-fonte-primaria);
    @media screen and (max-width: 800px) {
      font-size: 0.92rem;
    }
  }
`;

const Texto = styled.p`
  font-size: 1rem;
  margin-bottom: 3rem;

  @media screen and (max-width: 800px) {
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
`;

const Lista = styled.ul`
  margin-left: 1.2rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 800px) {
    margin-left: 0.7rem;
    margin-bottom: 1rem;
  }
`;

const ListaItem = styled.li`
  font-size: 1rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 800px) {
    font-size: 0.95rem;
    margin-bottom: 0.6rem;
  }
`;

const TextoVideo = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
  @media screen and (max-width: 800px) {
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
    margin-top: 1.2rem;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 800px) {
    iframe {
      width: 98vw;
      height: 40vw;
      min-height: 180px;
      max-height: 220px;
      border-radius: 10px;
    }
  }
`;

const ComoUsar = () => (
    <Container>
        <Titulo>Como Usar o Sistema Labor</Titulo>

        <Subtitulo>Legenda de Botões</Subtitulo>
        <ListaBotoes>
            <BotaoItem>
                <img src="/imagens/imagens/proximo.png" alt="Posterga" />
                <span>Posterga a tarefa para o dia seguinte</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/pilha.png" alt="Pilha" />
                <span>Envia a Tarefa para a Pilha</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/agenda.png" alt="Agenda" />
                <span>Agenda a Tarefa para um dia específico da semana</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/concluida.png" alt="Concluída" />
                <span>Concluí tarefas</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/repeticao.png" alt="Repetição" />
                <span>Acessa o formulário que cria novas repetições</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/executar.png" alt="Executar" />
                <span>Executa todas as repetições cadastradas no sistema para a semana atual</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/excluir.png" alt="Excluir" />
                <span>Exclui repetições</span>
            </BotaoItem>
            <BotaoItem>
                <img src="/imagens/imagens/hoje.png" alt="Hoje" />
                <span>Cadastra novas tarefas para o dia atual</span>
            </BotaoItem>
        </ListaBotoes>

        <Subtitulo>Lista de Tarefas</Subtitulo>
        <Texto>
            <strong>Iterações:</strong> Cada tarefa possui uma caixa de seleção antes da descrição. Marque-a para concluir ou reagendar a tarefa.
        </Texto>
        <Texto>
            <strong>Edição:</strong> Para editar uma tarefa, basta clicar duas vezes sobre ela. O campo de texto ficará editável — faça suas alterações e clique em qualquer lugar da tela para salvar.
        </Texto>
        <Texto>
            <strong>Comentários:</strong>
            <Lista>
                <ListaItem><b>Adicionar:</b> Clique com o botão direito na tarefa e selecione "Adicionar Comentário".</ListaItem>
                <ListaItem><b>Identificação:</b> Tarefas com comentários exibem um "N" roxo no final da descrição.</ListaItem>
                <ListaItem><b>Gerenciar:</b> Clique no "N" para visualizar, editar ou excluir o comentário.</ListaItem>
            </Lista>
        </Texto>

        <Subtitulo>Páginas</Subtitulo>
        <Texto>
            <b>Hoje:</b> Mostra todas as tarefas agendadas para o dia atual.
        </Texto>
        <Texto>
            <b>Semana:</b> Um resumo prático dos 7 dias da semana atual. Clique em qualquer dia para ver suas tarefas cadastradas.
        </Texto>
        <Texto>
            <b>Pilha:</b> Aqui ficam as tarefas sem data definida. Se uma tarefa do "Hoje" não for concluída, ela é automaticamente movida para a Pilha.
        </Texto>
        <Texto>
            <b>Repetições:</b> Tarefas que se repetem semanalmente, em dias específicos. Nesta página, você pode:
            <Lista>
                <ListaItem>Ver todas as repetições cadastradas.</ListaItem>
                <ListaItem>Adicionar novas ou excluir existentes.</ListaItem>
                <ListaItem>Executar as repetições para a semana atual com um clique.</ListaItem>
            </Lista>
        </Texto>
        <Texto>
            <b>Agenda:</b> Pesquise tarefas em um período personalizado. Basta selecionar a data inicial e final.
        </Texto>
        <Texto>
            <b>Nova Tarefa:</b> Formulário rápido para cadastrar tarefas novas. Preencha e pronto!
        </Texto>
        <Texto>
            <b>Montar Semana:</b> Planeje sua semana seguinte de forma fácil:
            <Lista>
                <ListaItem>Ao acessar, o sistema cria automaticamente a próxima semana.</ListaItem>
                <ListaItem>Repetições já são incluídas nos dias corretos.</ListaItem>
                <ListaItem>Arraste tarefas da Pilha para os dias desejados.</ListaItem>
            </Lista>
        </Texto>
        <Texto>
            <b>Configurações:</b> Ajuste seus dados cadastrais e preferências pessoais.
        </Texto>

        <TextoVideo>
            <b>Vídeo Demonstração</b>
        </TextoVideo>
        <VideoWrapper>
            <iframe width="803" height="451" src="https://www.youtube.com/embed/71fgWIpIa8Q" title="TesteLabor" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </VideoWrapper>
    </Container>
);

export default ComoUsar;