export default function Campo({
  label,
  name,
  value,
  onChange,
  erro,
  type = 'text',
  opcoes,
}) {
  return (
    <div className={`campo ${erro ? 'invalido' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {opcoes ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          <option value="">Selecione...</option>
          {opcoes.map((opcao) => (
            <option key={opcao} value={opcao}>{opcao}</option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={onChange} />
      )}
      {erro && <span className="erro-msg">{erro}</span>}
    </div>
  );
}