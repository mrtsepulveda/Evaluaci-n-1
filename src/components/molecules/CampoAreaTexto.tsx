import AreaTexto from '../atoms/AreaTexto'
import MensajeError from '../atoms/MensajeError'

interface CampoAreaTextoProps {
  id: string
  etiqueta: string
  valor: string
  onCambio: (valor: string) => void
  error?: string
  filas?: number
}

function CampoAreaTexto({ id, etiqueta, valor, onCambio, error, filas }: CampoAreaTextoProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
      </label>
      <AreaTexto id={id} valor={valor} onCambio={onCambio} filas={filas} invalido={!!error} />
      <MensajeError id={`${id}-error`} mensaje={error} />
    </div>
  )
}

export default CampoAreaTexto
