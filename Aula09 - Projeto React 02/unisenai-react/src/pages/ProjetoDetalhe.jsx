import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buscarProjeto } from '../services/api';

export default function ProjetoDetalhe() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);

    buscarProjeto(id)
      .then((dados) => ativo && setProjeto(dados))
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setLoading(false));

    return () => { ativo = false; };
  }, [id]); // refaz a busca quando o id da URL muda

  if (loading) return <p className="status">Carregando projeto...</p>;
  if (erro) return <p className="status erro">{erro}</p>;

  return (
    <section className="container page">
      <Link to="/projetos" className="voltar">← Voltar aos projetos</Link>
      <span className="badge">{projeto.categoria}</span>
      <h1>{projeto.nome}</h1>
      <img className="detalhe-img" src={projeto.imagem} alt={projeto.nome} />
      <p>{projeto.descricao}</p>
    </section>
  );
}