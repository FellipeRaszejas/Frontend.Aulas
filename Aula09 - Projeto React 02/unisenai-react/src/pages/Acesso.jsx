import { useState } from 'react';
import Campo from '../components/Campo';

const CURSOS = [
  'Análise e Desenvolvimento de Sistemas',
  'Mecatrônica',
  'Engenharia de Produção',
];

const INICIAL = {
  nome: '',
  email: '',
  ra: '',
  curso: '',
  turma: '',
  senha: '',
  confirmarSenha: '',
};

export default function Acesso() {
  const [modo, setModo] = useState('login'); // 'login' | 'cadastro'
  const [form, setForm] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState('');

  const cadastro = modo === 'cadastro';

  function trocarModo(novoModo) {
    setModo(novoModo);
    setForm(INICIAL);
    setErros({});
    setMensagem('');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const novos = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) novos.email = 'E-mail inválido';
    if (form.senha.length < 6) novos.senha = 'Mínimo de 6 caracteres';

    if (cadastro) {
      if (!form.nome.trim()) novos.nome = 'Informe o nome';
      if (!/^\d{6,}$/.test(form.ra)) novos.ra = 'RA deve ter ao menos 6 dígitos';
      if (!form.curso) novos.curso = 'Selecione o curso';
      if (!form.turma.trim()) novos.turma = 'Informe a turma';
      if (form.confirmarSenha !== form.senha) novos.confirmarSenha = 'As senhas não coincidem';
    }
    return novos;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagem('');
      return;
    }

    setMensagem(
      cadastro
        ? `Cadastro de ${form.nome} realizado (simulação)!`
        : `Login de ${form.email} realizado (simulação)!`
    );
  }

  return (
    <section className="container page">
      <div className="auth-page">
        <div className="auth-card">
          <div className="tabs" role="tablist">
            <button
              type="button"
              className={`tab ${!cadastro ? 'active' : ''}`}
              onClick={() => trocarModo('login')}
            >
              Entrar
            </button>
            <button
              type="button"
              className={`tab ${cadastro ? 'active' : ''}`}
              onClick={() => trocarModo('cadastro')}
            >
              Cadastrar
            </button>
          </div>

          <h2>{cadastro ? 'Criar conta' : 'Acessar o portal'}</h2>

          <form className="form" onSubmit={handleSubmit} noValidate>
            {cadastro && (
              <>
                <Campo label="Nome completo" name="nome" value={form.nome} onChange={handleChange} erro={erros.nome} />
                <div className="linha">
                  <Campo label="RA" name="ra" value={form.ra} onChange={handleChange} erro={erros.ra} />
                  <Campo label="Turma" name="turma" value={form.turma} onChange={handleChange} erro={erros.turma} />
                </div>
                <Campo label="Curso" name="curso" value={form.curso} onChange={handleChange} erro={erros.curso} opcoes={CURSOS} />
              </>
            )}

            <Campo label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} erro={erros.email} />
            <Campo label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} erro={erros.senha} />

            {cadastro && (
              <Campo
                label="Confirmar senha"
                name="confirmarSenha"
                type="password"
                value={form.confirmarSenha}
                onChange={handleChange}
                erro={erros.confirmarSenha}
              />
            )}

            <button type="submit" className="btn btn-primary btn-block">
              {cadastro ? 'Cadastrar' : 'Entrar'}
            </button>
          </form>

          {mensagem && <p className="status sucesso">{mensagem}</p>}
          <p className="nota">Página visual: nenhum dado é enviado a nenhum servidor.</p>
        </div>
      </div>
    </section>
  );
}