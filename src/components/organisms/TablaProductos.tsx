import type { Producto } from '../../types'
import { formatearPrecio } from '../../utils/validaciones'
import Boton from '../atoms/Boton'
import Etiqueta from '../atoms/Etiqueta'

interface TablaProductosProps {
  productos: Producto[]
  onEditar: (producto: Producto) => void
  onEliminar: (producto: Producto) => void
  onCambiarStock: (producto: Producto) => void
}

function TablaProductos({ productos, onEditar, onEliminar, onCambiarStock }: TablaProductosProps) {
  if (productos.length === 0) {
    return (
      <p className="text-center text-muted my-4" role="status">
        No hay productos que coincidan con la búsqueda.
      </p>
    )
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{formatearPrecio(p.precio)}</td>
              <td>
                <Etiqueta texto={p.stock ? 'Disponible' : 'Sin stock'} color={p.stock ? 'success' : 'danger'} />
              </td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <Boton pequeno onClick={() => onEditar(p)} aria-label={`Editar ${p.nombre}`}>
                    Editar
                  </Boton>
                  <Boton pequeno variante="outline-primary" onClick={() => onCambiarStock(p)} aria-label={`Cambiar stock de ${p.nombre}`}>
                    Cambiar stock
                  </Boton>
                  <Boton pequeno variante="outline-danger" onClick={() => onEliminar(p)} aria-label={`Eliminar ${p.nombre}`}>
                    Eliminar
                  </Boton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaProductos
