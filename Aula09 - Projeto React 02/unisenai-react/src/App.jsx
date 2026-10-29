import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projetos from './pages/Projetos';
import ProjetoDetalhe from './pages/ProjetoDetalhe';
import Localizacao from './pages/Localizacao';
import Acesso from './pages/Acesso';

export default function App() {
  return (
    <>
      <Navbar marca="UniSenai" />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
          <Route path="/localizacao" element={<Localizacao />} />
          <Route path="/acesso" element={<Acesso />} />
          <Route
            path="*"
            element={<p className="status">Página não encontrada. <Link to="/">Voltar ao início</Link></p>}
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}