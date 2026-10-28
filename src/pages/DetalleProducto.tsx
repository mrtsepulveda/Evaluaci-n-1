import { Link, useParams } from 'react-router-dom'
import Boton from '../components/atoms/Boton'
import Etiqueta from '../components/atoms/Etiqueta'
import ImagenProducto from '../components/atoms/ImagenProducto'
import Precio from '../components/atoms/Precio'
import { obtenerProductoPorId } from '../data/productosDB'
import type { Producto } from '../types'

interface DetalleProductoProps {
  onAgregar: (producto: Producto) => void
}

function DetalleProducto({ onAgregar }: DetalleProductoProps) {
  const { id } = useParams()
  const producto = id ? obtenerProductoPorId(id) : undefined

  if (!producto) {
    return (
      <div className="text-center my-5">
        <h2>Producto no encontrado</h2>
        <p className="text-muted">El producto que buscas no existe o fue eliminado.</p>
        <Link to="/catalogo" className="btn btn-warning text-white">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: 900 }}>
      <div className="card-body p-4">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <ImagenProducto src={producto.imagen} alt={producto.nombre} alto={240} />
          </div>
          <div className="col-12 col-md-7">
            <p className="text-muted mb-1">Código: {producto.id}</p>
            <h2 className="titulo-producto">{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>
              Categoría: <strong>{producto.categoria}</strong>
            </p>
            <Precio precio={producto.precio} enOferta={producto.enOferta} precioOferta={producto.precioOferta} />
            <p>
              <Etiqueta texto={producto.stock ? 'Disponible' : 'Sin stock'} color={producto.stock ? 'success' : 'danger'} />
            </p>
            <div className="d-flex flex-wrap gap-2">
              {producto.stock && <Boton onClick={() => onAgregar(producto)}>Agregar al carrito</Boton>}
              <Link to="/catalogo" className="btn btn-outline-secondary">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleProducto
