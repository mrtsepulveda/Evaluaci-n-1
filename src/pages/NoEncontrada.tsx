import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <div className="text-center my-5">
      <h2>Página no encontrada</h2>
      <p className="text-muted">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-warning text-white">
        Ir al inicio
      </Link>
    </div>
  )
}

export default NoEncontrada
