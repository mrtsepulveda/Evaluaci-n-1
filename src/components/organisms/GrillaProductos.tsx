import type { Producto } from '../../types'
import TarjetaProducto from '../molecules/TarjetaProducto'

interface GrillaProductosProps {
  productos: Producto[]
  onAgregar: (producto: Producto) => void
}

function GrillaProductos({ productos, onAgregar }: GrillaProductosProps) {
  if (productos.length === 0) {
    return (
      <p className="text-center text-muted my-5" role="status">
        No se encontraron productos con los filtros seleccionados.
      </p>
    )
  }
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <TarjetaProducto producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  )
}

export default GrillaProductos
