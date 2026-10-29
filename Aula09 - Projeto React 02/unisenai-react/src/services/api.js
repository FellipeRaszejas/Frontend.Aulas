const BASE_URL = 'https://jsonplaceholder.typicode.com';

const CATEGORIAS = [
  'Sustentabilidade',
  'Tecnologia Social',
  'Educação',
  'Saúde',
  'Indústria 4.0',
  'Inclusão Digital',
];

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

// Transforma o formato da API no formato usado pelo portal
function mapearProjeto(post) {
  return {
    id: post.id,
    nome: capitalizar(post.title.split(' ').slice(0, 4).join(' ')),
    descricao: post.body.replace(/\s+/g, ' '),
    categoria: CATEGORIAS[post.id % CATEGORIAS.length],
    imagem: `https://picsum.photos/seed/senai-${post.id}/600/340`,
  };
}

export async function buscarProjetos(limite = 9) {
  const res = await fetch(`${BASE_URL}/posts?_limit=${limite}`);
  if (!res.ok) throw new Error(`Erro ${res.status} ao buscar projetos`);
  const posts = await res.json();
  return posts.map(mapearProjeto);
}

export async function buscarProjeto(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Projeto não encontrado');
  return mapearProjeto(await res.json());
}