interface AreaTextoProps {
  id: string
  valor: string
  onCambio: (valor: string) => void
  filas?: number
  invalido?: boolean
}

function AreaTexto({ id, valor, onCambio, filas = 4, invalido = false }: AreaTextoProps) {
  return (
    <textarea
      id={id}
      name={id}
      rows={filas}
      value={valor}
      className={`form-control ${invalido ? 'is-invalid' : ''}`}
      aria-invalid={invalido}
      aria-describedby={invalido ? `${id}-error` : undefined}
      onChange={(e) => onCambio(e.target.value)}
    />
  )
}

export default AreaTexto
