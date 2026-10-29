import ProjectCard from './ProjectCard';

export default function ProjectList({ projetos }) {
  if (projetos.length === 0) {
    return <p className="status">Nenhum projeto encontrado.</p>;
  }

  return (
    <div className="grid">
      {projetos.map((projeto) => (
        <ProjectCard key={projeto.id} projeto={projeto} />
      ))}
    </div>
  );
}