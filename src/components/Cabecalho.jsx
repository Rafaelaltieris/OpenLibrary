import { NavLink } from "react-router";

export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <a className="pular-conteudo" href="#conteudo"> Pular para o Conteúdo</a>
            <div className="container cabecalho-conteudo">
                <span className="marca">Minha Estante</span>
                <nav aria-label="Navegação principal">
                    <NavLink to="/" end>catálogo</NavLink>
                    <NavLink to="/minha-estante">Minha Estante</NavLink>
                    <NavLink to="/sobre">Sobre</NavLink>
                </nav>
            </div>    
        </header>
    );
}