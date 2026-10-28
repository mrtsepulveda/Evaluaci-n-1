interface EntradaProps {
  id: string
  tipo?: 'text' | 'password' | 'number' | 'date' | 'email'
  valor: string
  onCambio: (valor: string) => void
  placeholder?: string
  invalido?: boolean
  deshabilitado?: boolean
}

function Entrada({ id, tipo = 'text', valor, onCambio, placeholder, invalido = false, deshabilitado = false }: EntradaProps) {
  return (
    <input
      id={id}
      name={id}
      type={tipo}
      value={valor}
      placeholder={placeholder}
      disabled={deshabilitado}
      className={`form-control ${invalido ? 'is-invalid' : ''}`}
      aria-invalid={invalido}
      aria-describedby={invalido ? `${id}-error` : undefined}
      onChange={(e) => onCambio(e.target.value)}
    />
  )
}

export default Entrada
