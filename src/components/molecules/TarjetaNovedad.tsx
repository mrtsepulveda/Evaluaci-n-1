import { Link } from 'react-router-dom'
import type { Novedad } from '../../types'

interface TarjetaNovedadProps {
  novedad: Novedad
}

function TarjetaNovedad({ novedad }: TarjetaNovedadProps) {
  return (
    <article className="card h-100 shadow-sm">
      <img src={novedad.imagen} alt={novedad.alt} className="card-img-top" style={{ height: 220, objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h3 className="h5 titulo-producto">{novedad.titulo}</h3>
        <p className="text-muted flex-grow-1">{novedad.resumen}</p>
        <Link to={`/novedades/${novedad.id}`} className="btn btn-warning text-white fw-bold">
          Leer publicación
        </Link>
      </div>
    </article>
  )
}

export default TarjetaNovedad
