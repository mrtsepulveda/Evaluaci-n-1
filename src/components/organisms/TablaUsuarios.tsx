import type { Usuario } from '../../types'
import Boton from '../atoms/Boton'

interface TablaUsuariosProps {
  usuarios: Usuario[]
  onEditar: (usuario: Usuario) => void
  onEliminar: (usuario: Usuario) => void
}

function TablaUsuarios({ usuarios, onEditar, onEliminar }: TablaUsuariosProps) {
  if (usuarios.length === 0) {
    return (
      <p className="text-center text-muted my-4" role="status">
        No hay usuarios registrados.
      </p>
    )
  }
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <div className="d-flex flex-wrap gap-1">
                  <Boton pequeno onClick={() => onEditar(u)} aria-label={`Editar ${u.nombre}`}>
                    Editar
                  </Boton>
                  <Boton pequeno variante="outline-danger" onClick={() => onEliminar(u)} aria-label={`Eliminar ${u.nombre}`}>
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

export default TablaUsuarios
