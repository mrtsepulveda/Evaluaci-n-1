import Entrada from '../atoms/Entrada'
import MensajeError from '../atoms/MensajeError'

interface CampoTextoProps {
  id: string
  etiqueta: string
  valor: string
  onCambio: (valor: string) => void
  error?: string
  tipo?: 'text' | 'password' | 'number' | 'date' | 'email'
  placeholder?: string
  deshabilitado?: boolean
}

function CampoTexto({ id, etiqueta, valor, onCambio, error, tipo = 'text', placeholder, deshabilitado }: CampoTextoProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
      </label>
      <Entrada id={id} tipo={tipo} valor={valor} onCambio={onCambio} placeholder={placeholder} invalido={!!error} deshabilitado={deshabilitado} />
      <MensajeError id={`${id}-error`} mensaje={error} />
    </div>
  )
}

export default CampoTexto
