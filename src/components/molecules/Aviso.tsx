interface AvisoProps {
  mensaje: string
  tipo?: 'success' | 'danger' | 'info' | 'warning'
  onCerrar: () => void
}

function Aviso({ mensaje, tipo = 'success', onCerrar }: AvisoProps) {
  return (
    <div className={`alert alert-${tipo} alert-dismissible`} role="status">
      {mensaje}
      <button type="button" className="btn-close" aria-label="Cerrar aviso" onClick={onCerrar}></button>
    </div>
  )
}

export default Aviso
