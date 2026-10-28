import MensajeError from '../atoms/MensajeError'
import Seleccion, { type OpcionSeleccion } from '../atoms/Seleccion'

interface CampoSeleccionProps {
  id: string
  etiqueta: string
  valor: string
  onCambio: (valor: string) => void
  opciones: OpcionSeleccion[]
  textoInicial: string
  error?: string
  deshabilitado?: boolean
}

function CampoSeleccion({ id, etiqueta, valor, onCambio, opciones, textoInicial, error, deshabilitado }: CampoSeleccionProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
      </label>
      <Seleccion id={id} valor={valor} onCambio={onCambio} opciones={opciones} textoInicial={textoInicial} invalido={!!error} deshabilitado={deshabilitado} />
      <MensajeError id={`${id}-error`} mensaje={error} />
    </div>
  )
}

export default CampoSeleccion
