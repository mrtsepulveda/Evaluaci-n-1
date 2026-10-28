import type { ItemCarrito } from '../../types'
import { formatearPrecio } from '../../utils/validaciones'
import Boton from '../atoms/Boton'

interface FilaCarritoProps {
  item: ItemCarrito
  onQuitar: (id: string) => void
}

export function precioFinal(item: ItemCarrito): number {
  const unitario = item.producto.enOferta && item.producto.precioOferta !== undefined ? item.producto.precioOferta : item.producto.precio
  return unitario * item.cantidad
}

function FilaCarrito({ item, onQuitar }: FilaCarritoProps) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center gap-2 flex-wrap">
      <span>
        {item.producto.nombre} <span className="text-muted">x{item.cantidad}</span>
      </span>
      <span className="d-flex align-items-center gap-2">
        <strong>{formatearPrecio(precioFinal(item))}</strong>
        <Boton pequeno variante="outline-danger" onClick={() => onQuitar(item.producto.id)} aria-label={`Quitar ${item.producto.nombre}`}>
          Quitar
        </Boton>
      </span>
    </li>
  )
}

export default FilaCarrito
