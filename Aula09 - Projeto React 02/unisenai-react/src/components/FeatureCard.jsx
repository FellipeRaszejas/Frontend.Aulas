export default function FeatureCard({ icone, titulo, texto }) {
  return (
    <div className="feature">
      <span className="icone">{icone}</span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}