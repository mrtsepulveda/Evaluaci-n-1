import { Link, useParams } from 'react-router-dom'
import { novedades } from '../data/novedadesDatos'

function NovedadDetalle() {
  const { id } = useParams()
  const novedad = novedades.find((n) => n.id === id)

  if (!novedad) {
    return (
      <div className="text-center my-5">
        <h2>Publicación no encontrada</h2>
        <Link to="/novedades" className="btn btn-warning text-white mt-3">
          Volver a Novedades
        </Link>
      </div>
    )
  }

  return (
    <article className="card shadow-sm mx-auto" style={{ maxWidth: 900 }}>
      <div className="card-body p-4">
        <h2 className="titulo-producto text-center">{novedad.titulo}</h2>
        <img src={novedad.imagen} alt={novedad.alt} className="img-fluid rounded w-100 my-3" style={{ maxHeight: 380, objectFit: 'cover' }} />
        {novedad.parrafos.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <h3 className="h5 titulo-producto">{novedad.subtitulo}</h3>
        <ul>
          {novedad.lista.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link to="/novedades" className="btn btn-warning text-white fw-bold">
            Volver a Novedades
          </Link>
          <Link to="/catalogo" className="btn btn-outline-secondary fw-bold">
            Ver catálogo
          </Link>
        </div>
      </div>
    </article>
  )
}

export default NovedadDetalle
