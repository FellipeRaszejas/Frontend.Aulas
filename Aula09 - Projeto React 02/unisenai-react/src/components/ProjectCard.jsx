import { Link } from 'react-router-dom';

export default function ProjectCard({ projeto }) {
  const { id, nome, descricao, categoria, imagem } = projeto;

  return (
    <article className="card">
      <img src={imagem} alt={nome} />
      <div className="card-body">
        <span className="badge">{categoria}</span>
        <h3>{nome}</h3>
        <p>{descricao.slice(0, 90)}...</p>
        <Link className="btn btn-primary btn-block" to={`/projetos/${id}`}>
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}