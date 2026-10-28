import { Link } from 'react-router-dom'
import type { Producto } from '../../types'
import Boton from '../atoms/Boton'
import Etiqueta from '../atoms/Etiqueta'
import ImagenProducto from '../atoms/ImagenProducto'
import Precio from '../atoms/Precio'

interface TarjetaProductoProps {
  producto: Producto
  onAgregar: (producto: Producto) => void
}

function TarjetaProducto({ producto, onAgregar }: TarjetaProductoProps) {
  return (
    <div className="card h-100 shadow-sm text-center" data-testid="tarjeta-producto">
      <div className="card-body d-flex flex-column">
        <ImagenProducto src={producto.imagen} alt={producto.nombre} />
        <h3 className="h6 mt-3 titulo-producto">{producto.nombre}</h3>
        <p className="small text-muted mb-1">{producto.categoria}</p>
        <Precio precio={producto.precio} enOferta={producto.enOferta} precioOferta={producto.precioOferta} />
        {!producto.stock && (
          <p className="mb-2">
            <Etiqueta texto="Sin stock" color="danger" />
          </p>
        )}
        <div className="mt-auto d-grid gap-2">
          <Link to={`/productos/${producto.id}`} className="btn btn-outline-primary btn-sm">
            Ver detalle
          </Link>
          {producto.stock ? (
            <Boton pequeno onClick={() => onAgregar(producto)}>
              Agregar
            </Boton>
          ) : (
            <Boton pequeno variante="secondary" disabled>
              No disponible
            </Boton>
          )}
        </div>
      </div>
    </div>
  )
}

export default TarjetaProducto
