import { useEffect, useState } from 'react';
import { buscarProjetos } from '../services/api';

export default function useProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true; // evita atualizar estado após desmontar o componente

    setLoading(true);
    buscarProjetos()
      .then((dados) => ativo && setProjetos(dados))
      .catch((e) => ativo && setErro(e.message))
      .finally(() => ativo && setLoading(false));

    return () => { ativo = false; };
  }, []);

  return { projetos, loading, erro };
}