import { Link } from 'react-router-dom'

function Admin() {
  return (
    <section className="text-center py-4">
      <h2>Bienvenido al panel de gestión</h2>
      <p className="text-muted">Desde aquí puedes administrar el catálogo de la ferretería y las cuentas de usuario.</p>
      <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
        <Link to="/admin/productos" className="btn btn-warning text-white btn-lg">
          Mantenedor de productos
        </Link>
        <Link to="/admin/usuarios" className="btn btn-outline-secondary btn-lg">
          Mantenedor de usuarios
        </Link>
      </div>
    </section>
  )
}

export default Admin
