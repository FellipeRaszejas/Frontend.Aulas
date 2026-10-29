import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início' },
  { to: '/projetos', label: 'Projetos' },
  { to: '/localizacao', label: 'Localização' },
];

export default function Navbar({ marca }) {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">{marca}</NavLink>
      <nav className="nav-links">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>
            {link.label}
          </NavLink>
        ))}
        <NavLink to="/acesso" className="btn btn-outline">Entrar</NavLink>
      </nav>
    </header>
  );
}