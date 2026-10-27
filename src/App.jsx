import Cabecalho from "./components/Cabecalho";
import Catalogo from "./pages/Catalogo";
import NaoEncontrada from "./pages/NaoEncontrada";
import MinhaEstante from "./pages/MinhaEstante";
import Sobre from "./pages/Sobre";
import { Route, Routes } from "react-router-dom"


export default function App() {

  return (
    <>
      <Cabecalho />
      <main id="conteudo" className="container">
        <Routes>
          <Route path="/" element={<Catalogo/>}/>
          <Route path="/minha-estante" element={<MinhaEstante/>}/>
          <Route path="sobre" element={<Sobre/>}/>
          <Route path="*" element={<NaoEncontrada/>} />
        </Routes>

      </main>
    </>
  )
}

