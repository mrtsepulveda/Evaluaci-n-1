interface MensajeErrorProps {
  id: string
  mensaje?: string
}

function MensajeError({ id, mensaje }: MensajeErrorProps) {
  if (!mensaje) return null
  return (
    <div id={id} className="invalid-feedback d-block" role="alert">
      {mensaje}
    </div>
  )
}

export default MensajeError
