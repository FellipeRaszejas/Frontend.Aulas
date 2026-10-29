import { useState } from 'react';
import useProjetos from '../hooks/useProjetos';
import ProjectList from '../components/ProjectList';

export default function Projetos() {
  const { projetos, loading, erro } = useProjetos();
  const [busca, setBusca] = useState('');
  const [mostrar, setMostrar] = useState(6);

  // Estado derivado: calculado a cada render, sem precisar de outro useState
  const termo = busca.toLowerCase();
  const filtrados = projetos
    .filter((p) => p.nome.toLowerCase().includes(termo) || p.categoria.toLowerCase().includes(termo))
    .slice(0, mostrar);

  return (
    <section className="container page">
      <header className="page-header">
        <h1>Projetos</h1>
        <p>Conheça alguns dos projetos desenvolvidos pelos alunos da faculdade em parceria com a comunidade.</p>
      </header>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Pesquisar por um projeto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <label>
          Mostrar:{' '}
          <select value={mostrar} onChange={(e) => setMostrar(Number(e.target.value))}>
            {[3, 6, 9].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="status">Carregando projetos da API...</p>}
      {erro && <p className="status erro">{erro}</p>}
      {!loading && !erro && <ProjectList projetos={filtrados} />}
    </section>
  );
}