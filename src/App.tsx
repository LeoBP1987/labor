import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import withAuth from "./hoc/autenticacao"
import PaginaBase from "./paginas/PaginaBase";
import Login from "./paginas/Login";
import { ModalProvider } from "./context/ModalContext";
import Pilha from "./paginas/Pilha";
import Agenda from "./paginas/Agenda";
import Configuracoes from "./paginas/Configuracoes";
import Semana from "./paginas/Semana";
import MontarSemana from "./paginas/MontarSemana";
import Repeticoes from "./paginas/Repeticoes";
import Pesquisa from "./paginas/Pesquisa";
import RecuperarSenha from "./paginas/RecuperarSenha";

const PaginaBaseAutenticada = withAuth(PaginaBase)

function App() {

  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-senha/:email" element={<RecuperarSenha />} />
          <Route path="/" element={<PaginaBaseAutenticada />}>
            <Route index element={<Inicio />}></Route>
            <Route path="/pilha" element={<Pilha />}></Route>
            <Route path="/agenda" element={<Agenda />}></Route>
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/semana" element={<Semana />} />
            <Route path="/montarsemana" element={<MontarSemana />} />
            <Route path="/repeticoes" element={<Repeticoes />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
