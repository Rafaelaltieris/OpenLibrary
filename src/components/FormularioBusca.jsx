export default function FormularioBusca({ onBuscar, carregando }){
    function enviar(event) {
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        const termo = String(dados.get("termo") ?? "").trim();
        if (termo) onBuscar(termo);
    }

    return ( 
        <form onSubmit={enviar} aria-label="Buscar na Open Library">
            <label htmlFor="termo-api"> Título ou Autor </label>
            <input id="termo-api" name="termo" type="search" required 
                placeholder="Ex: Machado de Assis"/>
            <button type="submit" disabled={carregando}>
                {carregando ? "Buscando..." : "Buscar na API"}
            </button>
        </form>
    )
}