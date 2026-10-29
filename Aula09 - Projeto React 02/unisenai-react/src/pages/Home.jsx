import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const recursos = [
  {
    id: 1,
    icone: '🎓',
    titulo: 'Alunos em ação',
    texto: 'Projetos criados por estudantes para resolver problemas reais da comunidade.',
  },
  {
    id: 2,
    icone: '🤝',
    titulo: 'Parceria com a comunidade',
    texto: 'Cada projeto nasce da escuta e da colaboração entre a escola e a sociedade.',
  },
  {
    id: 3,
    icone: '🚀',
    titulo: 'Inovação aplicada',
    texto: 'Tecnologia, sustentabilidade e educação colocadas em prática no dia a dia.',
  },
];

export default function Home() {
  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: 'url(/senai.jpg)' }}
      >
        <div className="container hero-content">
          <span className="eyebrow">SENAI Sorocaba apresenta</span>
          <h1>
            Projetos de <span>Extensão</span> Universitária
          </h1>
          <p>Conectamos a faculdade à comunidade através de projetos que transformam.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/projetos">Ver projetos →</Link>
            <Link className="btn btn-outline" to="/localizacao">Como chegar</Link>
          </div>
        </div>
      </section>

      <section className="container page">
        <h2 className="section-title">Sobre o portal</h2>
        <p className="section-sub">Entenda como nossa plataforma funciona e os benefícios que ela oferece.</p>
        <div className="grid-3">
          {recursos.map((r) => (
            <FeatureCard key={r.id} icone={r.icone} titulo={r.titulo} texto={r.texto} />
          ))}
        </div>
      </section>
    </>
  );
}