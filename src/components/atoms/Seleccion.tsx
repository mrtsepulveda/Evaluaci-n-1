export interface OpcionSeleccion {
  valor: string
  texto: string
}

interface SeleccionProps {
  id: string
  valor: string
  onCambio: (valor: string) => void
  opciones: OpcionSeleccion[]
  textoInicial: string
  invalido?: boolean
  deshabilitado?: boolean
}

function Seleccion({ id, valor, onCambio, opciones, textoInicial, invalido = false, deshabilitado = false }: SeleccionProps) {
  return (
    <select
      id={id}
      name={id}
      value={valor}
      disabled={deshabilitado}
      className={`form-select ${invalido ? 'is-invalid' : ''}`}
      aria-invalid={invalido}
      aria-describedby={invalido ? `${id}-error` : undefined}
      onChange={(e) => onCambio(e.target.value)}
    >
      <option value="">{textoInicial}</option>
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  )
}

export default Seleccion
