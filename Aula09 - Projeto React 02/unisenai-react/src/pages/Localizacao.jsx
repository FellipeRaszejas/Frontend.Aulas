import MapaSenai from '../components/MapaSenai';

export default function Localizacao() {
  return (
    <section className="container page">
      <header className="page-header">
        <h1>Onde fica o SENAI</h1>
        <p>Escola SENAI Gaspar Ricardo Júnior · Sorocaba/SP</p>
      </header>
      <MapaSenai />
    </section>
  );
}