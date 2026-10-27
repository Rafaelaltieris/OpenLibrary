export async function pesquisarLivros(termo, { signal } = {}) {
    const parametros = new URLSearchParams({
        q: termo,
        limit: "12",
        fields: "key,title,author_name,first_publish_year, cover_i",
    });

    const resposta = await fetch(
        "https://openlibrary.org/search.json?" + parametros.toString(),
        { signal }
    );

    if (!resposta.ok) throw new Error("Falha HTTP:" + resposta.status);

    const dados = await resposta.json();
    if (!Array.isArray(dados.docs)) {
        throw new Error("A API retornou um formato inesperado.");
    }

    return dados.docs
        .filter((item) => typeof item.key === "string")
        .map((item) => ({
            id: item.key,
            titulo: item.title || "Título não encontrado.",
            autor: Array.isArray(item.author_name) && item.author_name.length > 0
                ? item.author_name.join(", ") : "Autor não informado",
            ano: item.first_publish_year ?? "Não informado.",
            capa: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg?default=false` : null,
        }));
}