import LivroCard from "../components/LivroCard";
import { useEffect, useState } from "react";
import FormularioBusca from "../components/FormularioBusca.jsx";
import { pesquisarLivros } from "../services/openLibrary.js";

export default function Catalogo() {
    //Usamos o UseState para monitorar esses valores
    const [consulta, setConsulta] = useState({ termo: "", tentativa: 0 });
    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [pesquisou, setPesquisou] = useState(false);

    //Função de busca de livros na api da Open Library
    useEffect(() => {
        if (!consulta.termo) return;

        const controller = new AbortController();
        let ativa = true;

        async function carregar() {
            setCarregando(true);
            setErro("");
            setLivros([]);

            try {
                const resultado = await pesquisarLivros(consulta.termo, {
                    signal: controller.signal,
                });
                if (ativa) setLivros(resultado);
            } catch (falha) {
                if (!ativa || falha.name === "AbortError") return
                console.error(falha);
                setErro("Não foi possível buscar os livros. Verifique a conexão e tente novamente.");
            } finally {
                if (ativa) setCarregando(false);
            }
        }

        carregar()
        return () => {
            ativa = false;
            controller.abort();
        }
    }, [consulta]);

    function buscar(termo) {
        setConsulta((anterior) => ({
            termo,
            tentativa: anterior.tentatava + 1,
        }));
    }
    return (
        <section aria-labelledby="titulo-catalogo">
            <h1 id="titulo-catalogo">Catálogo da Open Library</h1>
            <FormularioBusca onBuscar={buscar} carregando={carregando} />
            {!consulta.termo && <p>Digite um título ou autor e envie a busca.</p>}
            {carregando && <p role="status">Consultando a API...</p>}
            {!carregando && erro && (
                <div role="alert">
                    <p>{erro}</p>
                    <button type="button" onClick={() => buscar(consulta.termo)}>
                        Tentar novamente
                    </button>
                </div>
            )}
            {consulta.termo && !carregando && !erro && (
                <>
                    <p role="status">Livros exibidos nesta busca: {livros.length} (limite: 12).</p>
                    {livros.length === 0 ? (
                        <p>Nenhum livro encontrado. Tente outro termo.</p>
                    ) : (
                        <div className="grade-livros">
                            {livros.map((livro) => <LivroCard key={livro.id} livro={livro} />)}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}