export default function LivroCard({ livro }) {
    return (
        <article className="livro-card">
            {livro.capa ? (
                <img
                    className="livro-capa"
                    src={livro.capa}
                    alt={`Capa de ${livro.titulo}`}
                    loading="lazy"
                    onError={(event) =>{
                        event.currentTarget.hidden = true;
                    }}/>
            ) : (
                <p>Capa não disponível</p>
            )}
            <h2>{livro.titulo}</h2>
            <p>Ator: {livro.autor}</p>
            <p>Ano de publicação: {livro.ano}</p>
        </article>
    )
}