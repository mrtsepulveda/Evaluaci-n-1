import { formatearPrecio } from '../../utils/validaciones'

interface PrecioProps {
  precio: number
  enOferta?: boolean
  precioOferta?: number
}

function Precio({ precio, enOferta = false, precioOferta }: PrecioProps) {
  if (enOferta && precioOferta !== undefined) {
    return (
      <p className="mb-2">
        <del className="text-muted me-2">{formatearPrecio(precio)}</del>
        <strong className="text-danger">{formatearPrecio(precioOferta)}</strong>
      </p>
    )
  }
  return (
    <p className="mb-2">
      <strong>{formatearPrecio(precio)}</strong>
    </p>
  )
}

export default Precio
